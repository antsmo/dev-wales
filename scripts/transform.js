const fs = require("fs");
const groups = require("../data/groups.json");

const data = groups.map(item => ({
  name: item.name,
  logo: item.logo,
  organisers: item.organisers,
  meetupSlug: item.meetupSlug,
  links: [
    { name: "Website", link: item.website },
    { name: "Meetup", link: item.meetup },
    { name: "Twitter", link: item.twitter },
    { name: "Eventbrite", link: item.eventbrite },
    { name: "Youtube", link: item.youtube },
    { name: "Slack", link: item.slack },
    { name: "Discord", link: item.discord },
  ].filter((item) => item.link !== "")
}));

fs.writeFileSync('./data/newGroups.json', JSON.stringify(data, null, 2), 'utf-8');
