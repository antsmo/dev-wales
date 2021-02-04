const fs = require("fs");
const mustache = require("mustache");
const companies = require("../data/companies.json");
const groups = require("../data/groups.json");
const speakers = require("../data/speakers.json");
const jobs = require("../data/jobs.json");

const data = {
  companies,
  groups,
  speakers,
  jobs
};

const inputDir = './templates/';
const outputDir = './public/';

if (fs.existsSync(outputDir)) {
  fs.rmdirSync(outputDir, { recursive: true });
}
fs.mkdirSync(outputDir);

const files = fs.readdirSync(inputDir);
files.forEach((inputFileName) => {
  const inputFilePath = inputDir + inputFileName;
  const template = fs.readFileSync(inputFilePath, 'utf-8');
  const renderedContents = mustache.render(template, data);
  const outputFileName = inputFileName.replace('.mustache', '.html');
  const outputFilePath = outputDir + outputFileName;
  fs.writeFileSync(outputFilePath, renderedContents, 'utf-8');
});
