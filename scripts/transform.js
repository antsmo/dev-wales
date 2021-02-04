const fs = require("fs");
const data = require("../data/speakers.json");

const newData = data.map(item => ({
  name: item.name,
  topics: item.topics,
  links: [
    { name: "Email", link: item.email_address },
    { name: "Twitter", link: item.twitter_url }
  ].filter((item) => item.link !== "")
}));

fs.writeFileSync('./data/newSpeakers.json', JSON.stringify(newData, null, 2), 'utf-8');
