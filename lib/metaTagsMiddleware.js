const metaTagsLookup = {
  "about": {
    title: "About",
    description: "",
    keywords: ""
  },
  "add-job": {
    title: "Add a job",
    description: "",
    keywords: ""
  },
  "companies": {
    title: "Companies",
    description: "A list of tech companies based in Wales.",
    keywords: "Companies, Wales, Tech, Startups, Software"
  },
  "company-profile": (options) => ({
    title: options.company.name,
    description: options.company.description,
    keywords: `${options.company.name}, Company, Wales, Developers`
  }),
  "events": {
    title: "Events",
    description: "",
    keywords: ""
  },
  "home": {
    title: "Home",
    description: "This is a test, please ignore.",
    keywords: "Dev, Wales, Developers, Tech, Startups"
  },
  "jobs": {
    title: "Jobs",
    description: "Upgrade your career and find the best developer jobs in Wales.",
    keywords: ""
  },
  "meetups": {
    title: "Meetups",
    description: "",
    keywords: ""
  },
  "newsletter-success": {
    title: "Newsletter Success",
    description: "",
    keywords: ""
  },
  "newsletter": {
    title: "Newsletter",
    description: "",
    keywords: ""
  },
  "speakers": {
    title: "Speakers",
    description: "",
    keywords: ""
  },
  "user-profile": {
    title: "User Profile",
    description: "",
    keywords: ""
  },
  "venues": {
    title: "Venues",
    description: "",
    keywords: ""
  }
}

module.exports = function (req, res, next) {
  const _render = res.render;
  res.render = function (view, options, fn) {
    const metaTags = metaTagsLookup[view];
    
    if (typeof metaTags === 'function') {
      res.locals.metaTags = metaTags(options);
    } else {
      res.locals.metaTags = metaTags;
    }

    _render.call(this, view, options, fn);
  }
  next();
};