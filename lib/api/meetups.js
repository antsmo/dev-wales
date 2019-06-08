const db = require("../db");
const { createCache, isCacheValid } = require("../cache");

const cache = createCache();

function processMeetupRecord(record) {
  return {
    name: record.get("name"),
    url: record.get("url")
  };
}

function getMeetups(callback) {
  if (isCacheValid(cache)) {
    console.log("Returning meetups from cache");
    return callback(cache.data);
  }
  console.log("Refreshing meetups cache");
  let data = [];
  db("Meetups")
    .select({
      view: "Grid view",
      sort: [{ field: "name", direction: "asc" }]
    })
    .eachPage(
      function page(records, fetchNextPage) {
        data = records.map(processMeetupRecord);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.log("Error fetching meetups from Airtable");
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
  getMeetups
};
