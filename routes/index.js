const express = require("express");
const router = express.Router();

/* Controllers */

const companiesController = require('../lib/api/companies');
const eventsController = require('../lib/api/events');
const groupsController = require('../lib/api/groups');
const jobsController = require('../lib/api/jobs');
const speakersController = require('../lib/api/speakers');
const usersController = require('../lib/api/users');
const venuesController = require('../lib/api/venues');

/* Routers */

const aboutRouter = require("./about");
const companiesRouter = require("./companies");
const eventsRouter = require("./events");
const homeRouter = require("./home");
const jobsRouter = require("./jobs");
const newsletterRouter = require("./newsletter");
const speakersRouter = require("./speakers");
const groupsRouter = require("./groups");
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
router.use("/groups", groupsRouter);
router.use("/users", usersRouter);
router.use("/venues", venuesRouter);

router.get("/invalidate", (req, res) => {
  companiesController.invalidateCache();
  eventsController.invalidateCache();
  groupsController.invalidateCache();
  jobsController.invalidateCache();
  speakersController.invalidateCache();
  usersController.invalidateCache();
  venuesController.invalidateCache();
  res.redirect('/');
});

module.exports = router;
