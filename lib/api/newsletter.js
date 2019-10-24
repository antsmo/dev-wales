const db = require('../db');

function addSubscriber(email, callback) {
  if (!validateEmail(email)) {
    return callback(null);
  }

  db('Newsletter').create(
    {
      email_address: email
    },
    function(error, record) {
      if (error) {
        return callback(null);
      }
      callback(record.getId());
    }
  );
}

module.exports = {
  addSubscriber
};

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
