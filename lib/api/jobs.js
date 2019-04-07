const db = require("../db");
const { createCache, isCacheValid } = require("../cache");
const moment = require("moment");

const cache = createCache();

function fetchJobs() {
  let data = [];
  return new Promise((resolve, reject) => {
    db("Jobs")
      .select({
        view: "Grid view",
        sort: [{ field: "created_date", direction: "desc" }, { field: "title", direction: "asc" }]
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            data.push({
              type: record.get("type"),
              title: record.get("title"),
              description: record.get("description"),
              link: record.get("link"),
              companyName: record.get("company_name"),
              location: record.get("location"),
              // TODO: Move date formatting to client side
              createdDate: moment(record.get("created_date")).format("dddd, MMMM Do YYYY, h:mm:ss a"),
              timeSince: moment(record.get("created_date")).fromNow()
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            return reject(err);
          }
          resolve(data);
        }
      );
  });
}

function getJobs(callback) {
  if (isCacheValid(cache)) {
    console.log("Returning jobs from cache");
    callback(cache.data);
    return;
  }
  console.log("Refreshing jobs cache");
  fetchJobs()
    .then(data => {
      cache.data = data;
      cache.lastUpdated = Date.now();
      callback(data);
    })
    .catch(error => {
      console.log("Something went wrong fetching jobs");
      console.log(error);
    });
}

function addJob(data, callback) {
  db("Jobs").create(
    {
      type: data.type,
      title: data.title,
      description: data.description,
      link: data.link,
      company_name: data.companyName,
      location: data.location
    },
    (error, record) => {
      if (error) {
        console.log(error);
        callback(error, null);
        return;
      }
      const id = record.get("id");
      callback(null, id);
    }
  );
}

module.exports = {
  getJobs,
  addJob
};
