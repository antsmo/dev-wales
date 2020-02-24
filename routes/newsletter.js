const express = require("express");
const router = express.Router();

const newsletterApi = require("../lib/api/newsletter");

router.get("/", (req, res) => {
  res.redirect("https://mailchi.mp/devwales/signup");
});

module.exports = router;