const express = require("express");
const router = express.Router();

const companiesController = require("../controllers/companiesController");
const jobsController = require("../controllers/jobsController");
const logsController = require("../controllers/logsController");

router.get("/", (req, res) => {
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

router.get("/:slug", (req, res) => {
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

router.get("/add", (req, res) => {
  logsController.logRequest(req);
  res.redirect("https://goo.gl/forms/4VviJZS8j6RArnsF2");
});

module.exports = router;

/* Utils */

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
