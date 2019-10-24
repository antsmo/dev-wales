const db = require('../db');
const { createCache, isCacheValid } = require('../cache');

const cache = createCache();

function processCompanyRecord(record) {
  let logoUrl = '';
  const website = record.get('website_url');
  if (website && website !== '') {
    let url = website.replace(/^http(s?):\/\//i, '');
    url = url.replace(/^www./i, '');
    const domain = url.split('/')[0];
    logoUrl = `https://logo.clearbit.com/${encodeURIComponent(domain)}`;
  }
  let locations = record.get('location');
  locations = locations.split(',');
  locations = locations.map(str => str.trim());
  return {
    id: record.id,
    name: record.get('name'),
    description: record.get('description'),
    locations,
    websiteUrl: record.get('website_url'),
    twitterUrl: record.get('twitter'),
    emailAddress: record.get('email'),
    companyType: record.get('company_type'),
    careersUrl: record.get('careers_url'),
    slug: record.get('slug'),
    logoUrl,
    jobIds: record.get('Jobs')
  };
}

function fetchCompanies() {
  let data = [];
  return new Promise((resolve, reject) => {
    db('Companies')
      .select({
        view: 'Grid view',
        sort: [{ field: 'name', direction: 'asc' }]
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(record => {
            data.push(processCompanyRecord(record));
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
  });
}

function getCompanies(callback) {
  if (isCacheValid(cache)) {
    console.log('Returning companies from cache');
    return callback(cache.data);
  }
  console.log('Refreshing companies cache');
  fetchCompanies()
    .then(data => {
      cache.data = data;
      cache.lastUpdated = Date.now();
      callback(data);
    })
    .catch(error => {
      console.log('Something went wrong fetching companies');
      console.log(error);
    });
}

module.exports = {
  getCompanies
};
