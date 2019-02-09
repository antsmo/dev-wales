const express = require("express");
const router = express.Router();

const companiesController = require("../controllers/companiesController");
const jobsController = require("../controllers/jobsController");
const speakersController = require("../controllers/speakersController");
const logsController = require("../controllers/logsController");

/* Routes */

router.get("/", (req, res) => res.redirect("/companies"));
router.get("/companies/add", (req, res) => {
  logsController.logRequest(req);
  res.redirect("https://goo.gl/forms/4VviJZS8j6RArnsF2");
});
router.get("/speakers/add", (req, res) => {
  logsController.logRequest(req);
  res.redirect("https://goo.gl/forms/W99i7kPozmW4LLEF2")
});

router.get("/about", (req, res) => {
  logsController.logRequest(req);
  res.render("about", {
    active: { about: true }
  });
});

router.get("/companies", (req, res) => {
  logsController.logRequest(req);
  companiesController.getCompanies(companies => {
    const locations = getUniqueLocations(companies);
    res.render("companies", {
      active: { companies: true },
      companies,
      locations
    });
  });
});

router.get("/companies/:slug", (req, res) => {
  logsController.logRequest(req);
  const slug = req.params.slug;
  companiesController.getCompanies(companies => {
    const company = companies.find(company => {
      const companySlug = company.slug.replace("-", "");
      const comparisonSlug = slug.replace("-", "");
      return companySlug === comparisonSlug;
    });
    if (!company) {
      res.sendStatus(404);
      return;
    }
    jobsController.getJobs(jobs => {
      const matchedJobs = jobs.filter(job => job.companyId === company.id);
      res.render("company-profile", {
        company,
        matchedJobs
      });
    });
  });
});

router.get("/jobs", (req, res) => {
  logsController.logRequest(req);
  jobsController.getJobs(jobs => {
    companiesController.getCompanies(companies => {
      jobs = hydrateCompaniesInJobs(companies, jobs);
      res.render("jobs", {
        active: { jobs: true },
        jobs
      });
    });
  });
});

router.get("/speakers", (req, res) => {
  logsController.logRequest(req);
  speakersController.getSpeakers(speakers => {
    res.render("speakers", {
      active: { speakers: true },
      speakers
    });
  });
});

/* Utils */

function hydrateCompaniesInJobs(companies, jobs) {
  const hydratedJobs = jobs.map(function(job) {
    const company = companies.find(function(company) {
      return company.id === job.companyId;
    });
    return {
      ...job,
      company
    };
  });
  return hydratedJobs;
}

function getUniqueLocations(array) {
  const locations = array.reduce((locations, item) => {
    const location = item.location;
    if (!locations.has(location)) {
      locations.add(location);
    }
    return locations;
  }, new Set());
  const sortedLocations = [...locations].sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  return sortedLocations;
}

module.exports = router;
