const express = require("express");
const router = express.Router();

const speakersApi = require("../lib/api/speakers");
const logsApi = require("../lib/api/logs");

router.get("/", (req, res) => {
  logsApi.logRequest(req);
  speakersApi.getSpeakers(speakers => {
    res.render("speakers", {
      active: { speakers: true },
      speakers
    });
  });
});

router.get("/add", (req, res) => {
  logsApi.logRequest(req);
  res.redirect("https://goo.gl/forms/W99i7kPozmW4LLEF2");
});

module.exports = router;
