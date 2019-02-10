const express = require("express");
const router = express.Router();

const logsApi = require("../lib/api/logs");

router.get("/", (req, res) => {
  logsApi.logRequest(req);
  res.render("about", {
    active: { about: true }
  });
});

module.exports = router;