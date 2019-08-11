const express = require("express");
const router = express.Router();

const meetupsApi = require("../lib/api/meetups");
const companiesApi = require("../lib/api/companies");
const speakersApi = require("../lib/api/speakers");

router.get("/", (req, res) => {
  companiesApi.getCompanies(companies => {
    speakersApi.getSpeakers(speakers => {
      meetupsApi.getMeetups(meetups => {
        res.render("home", {
          companies: randomSubsetFromArray(companies, 3),
          speakers: randomSubsetFromArray(speakers, 3),
          meetups: randomSubsetFromArray(meetups, 3)
        });
      });
    });
  });
});

function randomSubsetFromArray(array, count = 1) {
  let items = [];
  while (items.length < count) {
    const item = array[Math.floor(Math.random() * array.length)];
    if (items.indexOf(item) === -1) {
      items.push(item);
    }
  }
  return items;
}

module.exports = router;
