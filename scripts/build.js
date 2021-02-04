const fs = require("fs");
const mustache = require("mustache");
const companies = require("../data/newCompanies.json");
const groups = require("../data/newGroups.json");

const data = {
  companies,
  groups
};

const inputDir = './test/';
const outputDir = './public/';
const files = fs.readdirSync(inputDir);

if (fs.existsSync(outputDir)) {
  fs.rmdirSync(outputDir, { recursive: true });
}

fs.mkdirSync(outputDir);

files.forEach((inputFileName) => {
  const inputFilePath = inputDir + inputFileName;
  const template = fs.readFileSync(inputFilePath, 'utf-8');
  const renderedContents = mustache.render(template, data);
  const outputFileName = inputFileName.replace('.mustache', '.html');
  const outputFilePath = outputDir + outputFileName;
  fs.writeFileSync(outputFilePath, renderedContents, 'utf-8');
});
