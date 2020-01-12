const axios = require('axios');

function send(data) {
  axios({
    method: 'post',
    url: 'https://v1.nocodeapi.com/myguysi/telegram/zhDizPLRndgiwMFE', 
    data
  }).then(function (response) {
    // Success
  }).catch(function (error) {
    console.log(error);
  })
}

module.exports = {
  send
}