const express = require("express");
const router = express.Router();

const groupsApi = require("../lib/api/groups");
const logsApi = require("../lib/api/logs");

router.get("/", (req, res) => {
  logsApi.logRequest(req);
  groupsApi.getGroups(groups => {
    res.render("groups", {
      active: { groups: true },
      groups
    });
  });
});

module.exports = router;
