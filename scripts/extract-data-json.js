const fs = require("fs");
var argv = require('minimist')(process.argv.slice(2));

const name = argv.n;
const index = argv.i;

const dataDir = `${__dirname}/../data`;

const json = fs.readFileSync(`${dataDir}/${name}.json`);
const data = JSON.parse(json);

data.forEach(item => {
  const filename = String(item[index]).toLowerCase().replace(/ /g, "-");
  item.slug = filename;
  fs.writeFileSync(`${dataDir}/${name}/${filename}.json`, JSON.stringify(item, null, 2));
});