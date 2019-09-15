function json(data) {
  return JSON.stringify(data);
}

function analyticsId() {
  return process.env.DEV_WALES_ANALYTICS_ID;
}

function segmentId() {
  return process.env.SEGMENT_WRITE_KEY;
}

function ifEquals(arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
}

function preferredContact(data, options) {
  let link;
  let label = "";
  switch (data.preferredContact) {
    case "email": {
      link = "mailto:" + data.emailAddress;
      label = "Contact via email";
      break;
    }
    case "twitter": {
      link = data.twitterUrl;
      label = "Contact on Twitter"
      break;
    }
    default:
      link = "#";
      label = "";
      break;
  }
  return options.fn({ link, label, name: data.name });
}

function arrayToListString(data) {
  if (!data || data.length === 0) return "-";
  let string = "";
  data.forEach((item, i) => {
    if (i === 0) {
      string += item;
    } else if (i === data.length - 1) {
      string += ` and ${item}`;
    } else {
      string += `, ${item}`;
    }
  });
  return string;
}

module.exports = {
  json,
  analyticsId,
  segmentId,
  preferredContact,
  arrayToListString,
  ifEquals
};
