const express = require("express");
const router = express.Router();

const newsletterApi = require("../lib/api/newsletter");

router.get("/", (req, res) => {
  res.render("newsletter");
})

router.post("/subscribe", (req, res) => {
  const { email } = req.body;
  newsletterApi.addSubscriber(email, recordId => {
    if (!recordId) {
      return res.render("newsletter", {
        errorMessage: "Please enter a valid email address"
      });
    }
    res.render("newsletter-success");
  });
});

module.exports = router;