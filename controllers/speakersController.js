const db = require("../db");
const { createCache, isCacheValid } = require("../utils/cache");

const cache = createCache();

function processSpeakerRecord(record) {
  return {
    name: record.get("name"),
    bio: record.get("bio")
  };
}

function getSpeakers(callback) {
  if (isCacheValid(cache)) {
    console.log("Returning speakers from cache");
    return callback(cache.data);
  }
  console.log("Refreshing speakers cache");
  let data = [];
  db("Speakers")
    .select({
      view: "Grid view",
      sort: [{ field: "name", direction: "asc" }]
    })
    .eachPage(
      function page(records, fetchNextPage) {
        data = records.map(processSpeakerRecord);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.log("Error fetching data from Airtable");
          console.log(err);
          return callback([]);
        }
        callback(data);
      }
    );
}

module.exports = {
  getSpeakers
};
