const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

/* Setup templating */

var hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {
    json: data => JSON.stringify(data),
    analyticsId: () => process.env.DEV_WALES_ANALYTICS_ID,
    preferredContact: (data, options) => {
      let link;
      let label = "";
      switch (data.preferredContact) {
        case "email": {
          link = "mailto:" + data.emailAddress;
          label = "Contact via email";
          break;
        }
        default:
          link = "#";
          label = "";
          break;
      }
      return options.fn({ link, label });
    },
    arrayToListString: data => {
      if (!data || data.length === 0) return "-";
      let string = "";
      data.forEach((item, i) => {
        if (i === 0) {
          string += item;
        } else if (i === data.length - 1) {
          string += ` & ${item}`;
        } else {
          string += `, ${item}`;
        }
      });
      return string;
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

/* Routing */

const appRouter = require("./routes/index");

app.use("/", appRouter);
app.use("/static", express.static("public"));

/* Start server */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
