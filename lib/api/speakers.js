const db = require("../db");
const { createCache, isCacheValid } = require("../cache");

const cache = createCache();

function processSpeakerRecord(record) {
  return {
    name: record.get("name"),
    topics: record.get("topics"),
    preferredContact: record.get("preferred_contact"),
    emailAddress: record.get("email_address"),
    twitterUrl: record.get("twitter_url")
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
        cache.data = data;
        cache.lastUpdated = Date.now();
        callback(data);
      }
    );
}

function invalidateCache() {
  cache.lastUpdated = null
}

module.exports = {
  getSpeakers,
  invalidateCache
};
