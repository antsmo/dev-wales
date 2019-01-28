const express = require("express");
const router = express.Router();

const companiesController = require("../controllers/companiesController");
const jobsController = require("../controllers/jobsController");

/* Routes */

router.get("/", (req, res) => res.redirect("/companies"));

router.get("/about", (req, res) => {
  res.render("about", {
    active: { about: true }
  });
});

router.get("/companies", (req, res) => {
  companiesController.getCompanies(companies => {
    const locations = getUniqueLocations(companies);
    res.render("companies", {
      active: { companies: true },
      companies,
      locations
    });
  });
});

router.get("/companies/:id", (req, res) => {
  const companyId = req.params.id;
  companiesController.getCompanies(companies => {
    jobsController.getJobs(jobs => {
      const company = companies.find(company => company.id === companyId);
      const matchedJobs = jobs.filter(job => job.companyId === company.id);
      console.log(matchedJobs);
      res.render("company-profile", {
        company,
        matchedJobs
      });
    });
  });
});

router.get("/jobs", (req, res) => {
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
