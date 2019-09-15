const express = require("express");
const exphbs = require("express-handlebars");
const helpers = require("./lib/templateHelpers");
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* Setup templating */

var hbs = exphbs.create({
  defaultLayout: "main",
  helpers
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

/* Routing */

const appRouter = require("./routes/index");

app.use("/", appRouter);
app.use("/static", express.static("public"));
app.use(function (req, res, next) {
  res.status(404).render("404");
})

/* Start server */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
