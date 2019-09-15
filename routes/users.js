const express = require("express");
const router = express.Router();

const usersApi = require("../lib/api/users");
const logsApi = require("../lib/api/logs");

router.get("/:username", (req, res) => {
  logsApi.logRequest(req);
  
  const username = req.params.username.toLowerCase();
  usersApi.getUsers(users => {
    const user = users.find(user => user.username.toLowerCase() === username)

    if (!user) {
      res.status(404).render("404");
      return;
    }

    res.render("user-profile", { user });
  });
});

module.exports = router;
