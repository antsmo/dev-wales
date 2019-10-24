const db = require('../db');
const { createCache, isCacheValid } = require('../cache');

const cache = createCache();

function processEventRecord(record) {
  return {
    name: record.get('name'),
    host: record.get('host'),
    location: record.get('location'),
    date: record.get('date'),
    link: record.get('link')
  };
}

function getEvents(callback) {
  if (isCacheValid(cache)) {
    console.log('Returning events from cache');
    return callback(cache.data);
  }
  console.log('Refreshing events cache');
  let data = [];
  db('Events')
    .select({
      view: 'Grid view',
      sort: [{ field: 'date', direction: 'asc' }]
    })
    .eachPage(
      function page(records, fetchNextPage) {
        data = records.map(processEventRecord);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.log('Error fetching event data from Airtable');
          console.log(err);
          return callback([]);
        }
        cache.data = data;
        cache.lastUpdated = Date.now();
        callback(data);
      }
    );
}

module.exports = {
  getEvents
};
