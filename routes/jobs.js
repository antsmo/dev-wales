const express = require("express");
const router = express.Router();

const jobsApi = require("../lib/api/jobs");
const companiesApi = require("../lib/api/companies");
const logsApi = require("../lib/api/logs");
const alerting = require("../lib/alerting");

router.get("/", (req, res) => {
  logsApi.logRequest(req);
  jobsApi.getJobs(jobs => {
    res.render("jobs", {
      active: { jobs: true },
      jobs
    });
  });
});

router.get("/add", (req, res) => {
  companiesApi.getCompanies(companies => {
    res.render("add-job", { companies });
  });
});

router.post("/add", (req, res) => {
  const { type, title, description, companyName, location, link } = req.body;
  jobsApi.addJob(
    {
      type,
      title,
      description,
      companyName,
      location,
      link
    },
    (error, recordId) => {
      if (error) {
        alerting.send(`Someone tried to add a job - ${error}`)
      } else {
        alerting.send(`New job added - (${recordId}) ${title}`)
      }

      companiesApi.getCompanies(companies => {
        res.render("add-job", {
          companies,
          error: error ? true : false,
          success: !error ? true : false
        });
      });
    }
  );
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
