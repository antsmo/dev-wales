const express = require("express");
const router = express.Router();

/* Routers */

const aboutRouter = require("./about");
const companiesRouter = require("./companies");
const jobsRouter = require("./jobs");
const speakersRouter = require("./speakers");

/* Routes */

router.get("/", (req, res) => res.redirect("/companies"));

router.use("/about", aboutRouter);
router.use("/companies", companiesRouter);
router.use("/jobs", jobsRouter);
router.use("/speakers", speakersRouter);

module.exports = router;
