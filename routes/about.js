const express = require("express");
const router = express.Router();

const logsController = require("../controllers/logsController");

router.get("/", (req, res) => {
  logsController.logRequest(req);
  res.render("about", {
    active: { about: true }
  });
});

module.exports = router;