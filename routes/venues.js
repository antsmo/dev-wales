const express = require("express");
const router = express.Router();

const venuesApi = require("../lib/api/venues");

router.get("/", (req, res) => {
  venuesApi.getVenues(venues => {
    res.render("venues", {
      active: { venues: true },
      venues
    });
  });
});

module.exports = router;
