const db = require('../db');

function logRequest(req) {
  return; // disable logging
  if (process.env.NODE_ENV === 'production') {
    const route = req.url;
    const ipList = req.headers['x-forwarded-for'].split(',');
    const ip = ipList[ipList.length - 1];
    console.log(`Logging request - ${route}`);
    createLog({
      route,
      ip
    });
  }
}

function createLog(config) {
  db('Logs').create(
    {
      route: config.route,
      ip_address: config.ip
    },
    function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.getId());
    }
  );
}

module.exports = {
  logRequest
};
