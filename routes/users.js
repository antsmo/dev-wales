const express = require("express");
const router = express.Router();

const usersApi = require("../lib/api/users");
const logsApi = require("../lib/api/logs");

router.get("/:username", (req, res) => {
  const username = req.params.username.toLowerCase();
  logsApi.logRequest(req);
  usersApi.getUsers(users => {
    const user = users.find(user => user.username.toLowerCase() === username)
    res.render("user-profile", {
      user
    });
  });
});

module.exports = router;
