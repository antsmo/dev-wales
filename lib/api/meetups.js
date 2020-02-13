const db = require("../db");
const { createCache, isCacheValid } = require("../cache");

const cache = createCache();

function processMeetupRecord(record) {
  const logoArray = record.get("logo");
  return {
    name: record.get("name"),
    meetupUrl: record.get("meetup_url"),
    twitterUrl: record.get("twitter_url"),
    eventbriteUrl: record.get("eventbrite_url"),
    youtubeUrl: record.get("youtube_url"),
    slackUrl: record.get("slack_url"),
    websiteUrl: record.get("website_url"),
    logoUrl: logoArray && logoArray.length > 0 ? logoArray[0].url : null
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
