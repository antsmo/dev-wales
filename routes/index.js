const express = require("express");
const router = express.Router();

/* Routers */

const aboutRouter = require("./about");
const companiesRouter = require("./companies");
const eventsRouter = require("./events");
const homeRouter = require("./home");
const jobsRouter = require("./jobs");
const newsletterRouter = require("./newsletter");
const speakersRouter = require("./speakers");
const meetupsRouter = require("./meetups");
const usersRouter = require("./users");
const venuesRouter = require("./venues");

/* Routes */

router.use("/", homeRouter);
router.use("/about", aboutRouter);
router.use("/companies", companiesRouter);
router.use("/events", eventsRouter);
router.use("/jobs", jobsRouter);
router.use("/newsletter", newsletterRouter);
router.use("/speakers", speakersRouter);
router.use("/meetups", meetupsRouter);
router.use("/users", usersRouter);
router.use("/venues", venuesRouter);

module.exports = router;
