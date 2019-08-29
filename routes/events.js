const express = require("express");
const router = express.Router();

const eventsApi = require("../lib/api/events");
const logsApi = require("../lib/api/logs");

router.get("/", (req, res) => {
  logsApi.logRequest(req);
  eventsApi.getEvents(events => {
    res.render("events", {
      active: { events: true },
      events
    });
  });
});

module.exports = router;
