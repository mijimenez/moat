const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("./passport");
const session = require("express-session");
const dbConnection = require("./models");
const MongoStore = require("connect-mongo")(session);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Sessions (setting up express-session - once logged in you stay logged in in Express)
app.use(
    session({
        secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false, //required
        saveUninitialized: false //required
    })
)
// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Define API routes here
const userRoutes = require("./routes/api/user-route");
app.use("/user", userRoutes);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.send("catch all route being hit");
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
