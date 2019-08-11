const express = require("express");
const router = express.Router();

/* Routers */

const aboutRouter = require("./about");
const companiesRouter = require("./companies");
const jobsRouter = require("./jobs");
const speakersRouter = require("./speakers");
const meetupsRouter = require("./meetups");

/* Routes */

router.get("/", (req, res) => res.render("home"));

router.use("/about", aboutRouter);
router.use("/companies", companiesRouter);
router.use("/jobs", jobsRouter);
router.use("/speakers", speakersRouter);
router.use("/meetups", meetupsRouter);

module.exports = router;
