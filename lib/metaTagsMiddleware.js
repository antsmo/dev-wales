const metaTagsLookup = {
  "home": {
    title: "Home",
    description: "This is a test, please ignore.",
    keywords: "Dev, Wales, Developers, Tech, Startups"
  },
  "companies": {
    title: "Companies",
    description: "A list of tech companies based in Wales.",
    keywords: "Companies, Wales, Tech, Startups, Software"
  },
  "company-profile": (options) => ({
    title: options.company.name,
    description: options.company.description,
    keywords: ""
  })
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