const express = require("express");
const passport = require("passport");
const router = express.Router();
const { pool } = require("../dbConfig");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
const initializePassport = require("../passportConfig");

initializePassport(passport);
router.get("/register", checkAuthenticated, (req, res) => {
    res.render("register.ejs");
});

router.get("/login", checkAuthenticated, (req, res) => {
    // flash sets a messages variable. passport sets the error message
    console.log(req.session.flash.error);
    res.render("login.ejs");
});

router.get("/dashboard", checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.render("dashboard", { user: req.user.name });
  });
router.get("/logout", (req, res) => {
    req.logout();
    res.render("index", { message: "You have logged out successfully" });
  });

router.post("/register", async (req, res) => {
    let { name, email, password, password2 } = req.body;
  
    let errors = [];
  
    console.log({
      name,
      email,
      password,
      password2
    });
  
    if (!name || !email || !password || !password2) {
      errors.push({ message: "Please enter all fields" });
    }
  
    if (password.length < 6) {
      errors.push({ message: "Password must be a least 6 characters long" });
    }
  
    if (password !== password2) {
      errors.push({ message: "Passwords do not match" });
    }
  
    if (errors.length > 0) {
      res.render("register", { errors, name, email, password, password2 });
    } else {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      // Validation passed
      pool.query(
        `SELECT * FROM nodeuser
          WHERE email = $1`,
        [email],
        (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            return res.render("register", {
              message: "Email already registered"
            });
          } else {
            pool.query(
              `INSERT INTO nodeuser (name, email, pass)
                  VALUES ($1, $2, $3)
                  RETURNING id, pass`,
              [name, email, hashedPassword],
              (err, results) => {
                if (err) {
                  throw err;
                }
                console.log(results.rows);
                req.flash("success_msg", "You are now registered. Please log in");
                res.redirect("/users/login");
              }
            );
          }
        }
      );
    }
  });
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/users/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true
    })
  );
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/users/dashboard");
    }
    next();
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/users/login");
  }

  module.exports = router;