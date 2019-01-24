const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

/* Setup templating */

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

/* Routing */

const router = require("./routes/index");

app.use("/static", express.static("public"));
app.use("/", router);

/* Start server */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
