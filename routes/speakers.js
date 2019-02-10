const express = require("express");
const router = express.Router();

const speakersController = require("../controllers/speakersController");
const logsController = require("../controllers/logsController");

router.get("/", (req, res) => {
  logsController.logRequest(req);
  speakersController.getSpeakers(speakers => {
    res.render("speakers", {
      active: { speakers: true },
      speakers
    });
  });
});

router.get("/add", (req, res) => {
  logsController.logRequest(req);
  res.redirect("https://goo.gl/forms/W99i7kPozmW4LLEF2");
});

module.exports = router;
