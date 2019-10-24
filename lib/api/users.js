const db = require('../db');
const { createCache, isCacheValid } = require('../cache');

const cache = createCache();

function processUserRecord(record) {
  return {
    name: record.get('name'),
    username: record.get('username'),
    email: record.get('email'),
    company: record.get('company'),
    jobTitle: record.get('job_title'),
    interests: splitStringToArray(record.get('interests')),
    languages: splitStringToArray(record.get('languages')),
    githubUrl: record.get('github_url'),
    twitterUrl: record.get('twitter_url'),
    websiteUrl: record.get('website_url'),
    isSpeaker: record.get('is_speaker'),
    speakerTopics: record.get('speaker_topics'),
    avatarUrl: processAvatar(record.get('avatar_url'))
  };
}

function splitStringToArray(string) {
  if (!string || string === '') {
    return [];
  }
  return string.split(',');
}

function processAvatar(avatar) {
  if (!avatar) {
    return '/static/avatar-placeholder.svg';
  }
  return avatar[0].url;
}

function getUsers(callback) {
  if (isCacheValid(cache)) {
    console.log('Returning users from cache');
    return callback(cache.data);
  }
  console.log('Refreshing users cache');
  let data = [];
  db('Users')
    .select({ view: 'Grid view' })
    .eachPage(
      function page(records, fetchNextPage) {
        data = records.map(processUserRecord);
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.log('Error fetching data from Airtable');
          console.log(err);
          return callback([]);
        }
        cache.data = data;
        cache.lastUpdated = Date.now();
        callback(data);
      }
    );
}

module.exports = {
  getUsers
};
