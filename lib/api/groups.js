const db = require("../db");
const { createCache, isCacheValid } = require("../cache");

const cache = createCache();

function processGroupRecord(record) {
  const logoArray = record.get("logo");
  return {
    name: record.get("name"),
    meetupUrl: record.get("meetup_url"),
    twitterUrl: record.get("twitter_url"),
    eventbriteUrl: record.get("eventbrite_url"),
    youtubeUrl: record.get("youtube_url"),
    slackUrl: record.get("slack_url"),
    discordUrl: record.get("discord_url"),
    websiteUrl: record.get("website_url"),
    logoUrl: logoArray && logoArray.length > 0 ? logoArray[0].url : null
  };
}

function getGroups(callback) {
  if (isCacheValid(cache)) {
    console.log("Returning groups from cache");
    return callback(cache.data);
  }
  console.log("Refreshing groups cache");
  let data = [];
  db("Groups")
    .select({
      view: "Grid view",
      sort: [{ field: "name", direction: "asc" }]
    })
    .eachPage(
      function page(records, fetchNextPage) {
        data = records.map(processGroupRecord);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.log("Error fetching groups from Airtable");
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
  getGroups,
  invalidateCache
};
