const express = require("express");
const router = express.Router();

const jobsController = require("../controllers/jobsController");
const companiesController = require("../controllers/companiesController");
const logsController = require("../controllers/logsController");

router.get("/", (req, res) => {
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

module.exports = router;

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
