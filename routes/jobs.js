const express = require("express");
const router = express.Router();

const jobsApi = require("../lib/api/jobs");
const companiesApi = require("../lib/api/companies");
const logsApi = require("../lib/api/logs");

router.get("/", (req, res) => {
  logsApi.logRequest(req);
  jobsApi.getJobs(jobs => {
    companiesApi.getCompanies(companies => {
      jobs = hydrateCompaniesInJobs(companies, jobs);
      res.render("jobs", {
        active: { jobs: true },
        jobs
      });
    });
  });
});

router.get("/add", (req, res) => {
  companiesApi.getCompanies(companies => {
    res.render("add-job", { companies });
  });
});

router.post("/add", (req, res) => {
  const { title, description, companyName, link } = req.body;
  console.log({
    title,
    description,
    companyName,
    link
  });
  res.send("Done");
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
