const db = require("../db");
const { createCache, isCacheValid } = require("../cache");

const venuesCache = createCache();

function processVenueRecord(record) {
  return {
    name: record.get("name"),
    address: record.get("address"),
    website: record.get("website"),
    capacity: record.get("capacity"),
    cost: record.get("cost"),
    facilities: record.get("facilities"),
    contactEmail: record.get("contact_email")
  }
}

function getVenues(callback) {
  if (isCacheValid(venuesCache)) {
    console.log("Returning venues from cache");
    return callback(venuesCache.data);
  }
  console.log("Refreshing venues cache");
  let data = [];
  db("Venues")
    .select({
      view: "Grid view",
      sort: [{ field: "name", direction: "asc" }]
    })
    .eachPage(
      function page(records, fetchNextPage) {
        data = records.map(processVenueRecord);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.log("Error fetching venues from Airtable");
          console.log(err);
          return callback([]);
        }
        venuesCache.data = data;
        venuesCache.lastUpdated = Date.now();
        callback(data);
      }
    );
}

module.exports = {
  getVenues
};
