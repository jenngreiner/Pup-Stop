const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pupstop", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

// Use apiRoutes
app.use("/api", apiRoutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

// const path = require("path");
// const express = require("express");
// const session = require("express-session");
// const exphbs = require("express-handlebars");
// const routes = require("./controllers");
// const helpers = require("./utils/helpers");

// const sequelize = require("./config/connection");

// // Create a new sequelize store using the express-session package
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const app = express();
// const PORT = process.env.PORT || 3001;

// const hbs = exphbs.create({ helpers });

// // Configure and link a session object with the sequelize store
// const sess = {
//   secret: "Super secret secret",
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// // Add express-session and store as Express.js middleware
// app.use(session(sess));

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });
