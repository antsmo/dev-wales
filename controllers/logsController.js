const db = require("../db");

function createLog(config) {
  db("Logs").create({
    route: config.route,
    "ip_address": config.ip
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(record.getId());
  });
}

module.exports = {
  createLog
};
