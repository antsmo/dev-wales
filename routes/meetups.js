const express = require("express");
const router = express.Router();

const meetupsApi = require("../lib/api/meetups");
const logsApi = require("../lib/api/logs");

router.get("/", (req, res) => {
  logsApi.logRequest(req);
  meetupsApi.getMeetups(meetups => {
    res.render("meetups", {
      active: { meetups: true },
      meetups
    });
  });
});

module.exports = router;
