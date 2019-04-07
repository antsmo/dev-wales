const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

function send(message) {
  client.messages
    .create({
      body: message,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+447735382829"
    })
    .then(message => console.log("Sent Twilio message - ", message.sid))
    .catch(error => console.log(error))
    .done();
}

module.exports = {
  send
};
