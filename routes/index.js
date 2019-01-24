const express = require("express");
const router = express.Router();

const companiesController = require("../controllers/companiesController");
const jobsController = require("../controllers/jobsController");

/* Routes */

router.get("/", (req, res) => res.redirect("/companies"));

router.get("/companies", (req, res) => {
  companiesController.getCompanies(companies => {
    res.render("companies", {
      active: { companies: true },
      companies,
      companiesString: JSON.stringify(companies),
      locations: getUniqueLocations(companies)
    });
  });
});

router.get("/jobs", (req, res) => {
  jobsController.getJobs(jobs => {
    companiesController.getCompanies(companies => {
      jobs = hydrateCompaniesInJobs(companies, jobs);
      res.render("jobs", {
        active: { jobs: true },
        jobs,
        jobsString: JSON.stringify(jobs)
      });
    });
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    active: { about: true }
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
