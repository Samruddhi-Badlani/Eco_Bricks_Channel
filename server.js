const express = require("express");
const app = express();
const flash = require('express-flash')
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const bcrypt = require("bcrypt")
const initializePassport = require("./passportConfig");

initializePassport(passport);

const users = require("./routes/users");
const pool = require("./db");
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs");
app.use(
    session({
      // Key we want to keep secret which will encrypt all of our information
      secret: process.env.SESSION_SECRET,
      // Should we resave our session variables if nothing has changes which we dont
      resave: false,
      // Save empty value if there is no vaue which we do not want to do
      saveUninitialized: false
    })
  );
  // Funtion inside passport which initializes passport
  app.use(passport.initialize());
  app.use(express.static(__dirname + '/public'));
  // Store our variables to be persisted across the whole session. Works with app.use(Session) above
  app.use(passport.session());
  app.use(flash());

  

app.get("/", (req, res) => {
  res.render("index");
});

app.use('/users',users);
app.listen(3000, () => {
    console.log(`Server running on port `);
  });


