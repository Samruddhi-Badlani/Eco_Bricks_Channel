const express = require('express')
const router = express.Router()
const passport = require('passport')
const pool = require('../db')
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('express-flash')
const initializePassport = require('../passportConfig')

initializePassport(passport)
router.get('/register', checkAuthenticated, (req, res) => {
  res.render('register.ejs')
})

router.get('/ecobricks', (req, res) => {
  res.render('ecobricks.ejs')
})

router.get('/login', checkAuthenticated, (req, res) => {
  // flash sets a messages variable. passport sets the error message
  console.log(req.session.flash.error)
  res.render('login.ejs')
})

router.get('/dashboard', checkNotAuthenticated, async (req, res) => {
  console.log(req.isAuthenticated())
  const data = await pool.query(
    `SELECT * FROM form where userid = ${req.user.id}`
  )
  const data2 = await pool.query(
    `SELECT * FROM queryform where userid = ${req.user.id}`
  )
  const contactlist = await pool.query(
    `SELECT * FROM users where job_role = 'company' `
  )
  var personlist = await pool.query(
    `SELECT * FROM users where job_role = 'individual' `
  )
  if (req.user.job_role == 'individual') {
    personlist.rows.length = 0
    console.log('User is a individual')
  }
  if (req.user.job_role == 'company') {
    contactlist.rows.length = 0
    console.log('User is a company')
  }
  res.render('dashboard', {
    user: req.user,
    my_null_value: req.user.xyz,
    contactlist: contactlist.rows,
    personlist: personlist.rows,
    notificationNumber: data.rows.length + data2.rows.length,
  })
})
router.get('/logout', (req, res) => {
  req.logout()
  res.render('index')
})

router.post('/register', async (req, res) => {
  let {
    name,
    email,
    password,
    password2,
    role,
    companyname,
    registered,
    phone,
    city,
    state,
    country,
    address,
    cost,
    capacity,
  } = req.body
  console.log('working ')
  console.log(req.body)
  console.log(req.params)
  let errors = []

  console.log({
    name,
    email,
    password,
    password2,
    role,
    companyname,
    registered,
    phone,
    city,
    state,
    country,
    address,
    cost,
    capacity,
  })

  if (!name || !email || !password || !password2 || !role || !companyname) {
    errors.push({ message: 'Please enter all fields' })
  }

  if (password.length < 6) {
    errors.push({ message: 'Password must be a least 6 characters long' })
  }

  if (password !== password2) {
    errors.push({ message: 'Passwords do not match' })
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 })
  } else {
    hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    // Validation passed
    pool.query(
      `SELECT * FROM users
          WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err)
        }
        console.log(results.rows)

        if (results.rows.length > 0) {
          errors.push({ message: 'Email already registered' })
          console.log('already registered   ', errors)
          return res.render('register', { errors })
        } else {
          pool.query(
            `INSERT INTO users (name, email, password,job_role,company,registered,phone,city,state,country,address,cost,capacity)
                  VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
                  RETURNING id, password`,
            [
              name,
              email,
              hashedPassword,
              role,
              companyname,
              registered,
              phone,
              city,
              state,
              country,
              address,
              cost,
              capacity,
            ],
            (err, results) => {
              if (err) {
                throw err
              }
              console.log(results.rows)

              req.flash('success_msg', 'You are now registered. Please log in')
              res.redirect('/users/login')
            }
          )
        }
      }
    )
  }
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/dashboard')
  }
  next()
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/users/login')
}

router.post('/profile', checkNotAuthenticated, (req, res) => {
  console.log(req.isAuthenticated())
  console.log(req.body.myUserName)
  console.log(req.body.myUserEmail)
  console.log(req.body.myUserCity)
  console.log(req.body.myUserState)
  console.log(req.body.myUserCountry)
  console.log(req.body.myUserAddress)
  console.log(req.body.myUserJobRole)

  myUser = {
    id: req.body.myUserId,
    name: req.body.myUserName,
    email: req.body.myUserEmail,
    phone: req.body.myUserPhone,
    city: req.body.myUserCity,
    state: req.body.myUserState,
    country: req.body.myUserCountry,
    address: req.body.myUserAddress,
    jobRole: req.body.myUserJobRole,
    cost: req.body.myUserCost,
    capacity: req.body.myUserCapacity,
  }

  res.render('profile', { user: myUser })
})

router.post('/profileUpdate', checkNotAuthenticated, (req, res) => {
  console.log('I did fill form ', req.body.jobRole)
  myUser = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    address: req.body.address,
    jobRole: req.body.jobRole,
    cost: req.body.cost,
    capacity: req.body.capacity,
  }
  pool.query(
    'UPDATE users SET name=$1,email=$3,phone=$4,city=$5,state=$6,country=$7,address=$8,job_role=$9,cost=$10,capacity=$11 WHERE id=$2',
    [
      myUser.name,
      myUser.id,
      myUser.email,
      myUser.phone,
      myUser.city,
      myUser.state,
      myUser.country,
      myUser.address,
      myUser.jobRole,
      myUser.cost,
      myUser.capacity,
    ],
    (err, results) => {
      if (err) {
        throw err
      }
      res.redirect('/users/dashboard')
    }
  )
})

router.get('/contactlist', checkNotAuthenticated, (req, res) => {
  pool.query(`SELECT * FROM users`, (err, results) => {
    if (err) {
      console.log(err)
    }
    // console.log(results.rows);
    res.render('contactlist', { data: results.rows })
  })
})

router.get('/feedback', checkNotAuthenticated, (req, res) => {
  // pool.query(`SELECT * FROM feedbacks`, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   // console.log(results.rows);
  //   res.render("feedback", { data: results.rows });
  // });
  console.log('Feed back router called')
  res.render('feedback')
})

router.post('/feedback', checkNotAuthenticated, (req, res) => {
  let { name, email, comment } = req.body
  pool.query(
    `INSERT INTO feedbacks (name, email, comment)
          VALUES ($1, $2, $3)`,
    [name, email, comment],
    (err, results) => {
      if (err) {
        throw err
      }
      console.log(results.rows)
      req.flash('admin: ', 'Thanks for giving feedback! We value our customer')
      res.redirect('/users/dashboard')
    }
  )
})

router.get('/buyform', checkNotAuthenticated, (req, res) => {
  console.log('buy form router called')
  res.render('buyform', { id: req.query.id })
})
router.post('/buyform', checkNotAuthenticated, (req, res) => {
  let { userid, fname, lname, email, mob, ques1, ques2 } = req.body
  let user_id = parseInt(userid, 10)
  pool.query(
    `INSERT INTO form (userid, fname, lname, email, mob, ques1, ques2)
          VALUES ($1, $2, $3, $4,$5,$6,$7)`,
    [user_id, fname, lname, email, mob, ques1, ques2],
    (err, results) => {
      if (err) {
        throw err
      }
      console.log(results.rows)

      req.flash(
        'success_msg',
        'Thanks for showing interest, Responsible person will get back to you'
      )
      res.redirect('/users/dashboard')
    }
  )
})

router.get('/sellform', checkNotAuthenticated, (req, res) => {
  console.log('sell form router called')
  res.render('sellform', { id: req.query.id })
})
router.post('/sellform', checkNotAuthenticated, (req, res) => {
  let { userid, fname, lname, email, mob, ques1, ques2 } = req.body
  let user_id = parseInt(userid, 10)
  pool.query(
    `INSERT INTO form (userid, fname, lname, email, mob, ques1, ques2)
          VALUES ($1, $2, $3, $4,$5,$6,$7)`,
    [user_id, fname, lname, email, mob, ques1, ques2],
    (err, results) => {
      if (err) {
        throw err
      }
      console.log(results.rows)

      req.flash(
        'success_msg',
        'Thanks for showing interest, Responsible person will get back to you'
      )
      res.redirect('/users/dashboard')
    }
  )
})

router.get('/notification', checkNotAuthenticated, async (req, res) => {
  console.log('notification form router called')
  const myQueries = await pool.query(
    `SELECT * FROM queryform where userid = ${req.user.id}`
  )
  const data = await pool.query(
    `SELECT * FROM form where userid = ${req.user.id}`
  )

  res.render('notification', {
    user: req.user,
    data: data.rows,
    queries: myQueries.rows,
  })
})

// its a delete request
router.post(
  '/notification_transaction',
  checkNotAuthenticated,
  async (req, res) => {
    console.log('notification post')
    const data = await pool.query(`DELETE FROM form WHERE id=${req.query.id}`)
    req.flash('success_msg', 'Thanks for notifying him')
    res.redirect('/users/dashboard')
  }
)
// its a delete query
router.post('/notification_query', checkNotAuthenticated, async (req, res) => {
  console.log('notification post')
  const data = await pool.query(
    `DELETE FROM queryform WHERE id=${req.query.id}`
  )
  req.flash('success_msg', 'Thanks for notifying him')
  res.redirect('/users/dashboard')
})

router.post('/search', checkNotAuthenticated, async (req, res) => {
  console.log('Search router called  ')
  const data = await pool.query(
    `SELECT * FROM form where userid = ${req.user.id}`
  )
  var contactlist = await pool.query(
    `SELECT * FROM users where job_role = 'company' `
  )
  var personlist = await pool.query(
    `SELECT * FROM users where job_role = 'individual' `
  )
  if (req.user.job_role == 'individual') {
    personlist.rows.length = 0
    contactlist = await pool.query(
      `SELECT * FROM users where job_role = 'company' and company ILIKE $1`,
      ['%' + req.body.searchByName + '%']
    )
    console.log('User is a individual Search company ', req.body.searchByName)
  }
  if (req.user.job_role == 'company') {
    contactlist.rows.length = 0
    console.log('User is a company Search person ', req.body.searchByName)
    personlist = await pool.query(
      `SELECT * FROM users where job_role = 'individual' and name ILIKE $1 `,
      ['%' + req.body.searchByName + '%']
    )
  }
  console.log(req.isAuthenticated())

  res.render('dashboard', {
    user: req.user,
    my_null_value: req.user.xyz,
    contactlist: contactlist.rows,
    personlist: personlist.rows,
    notificationNumber: data.rows.length,
  })
})
router.get('/queryform', checkNotAuthenticated, (req, res) => {
  console.log('query form router called')
  res.render('queryform', { id: req.query.id })
})
router.post('/queryform', checkNotAuthenticated, (req, res) => {
  let { userid, fname, lname, email, mob, ques1, ques2 } = req.body
  let user_id = parseInt(userid, 10)
  pool.query(
    `INSERT INTO queryform (userid, fname, lname, email, mob, ques1, ques2)
          VALUES ($1, $2, $3, $4,$5,$6,$7)`,
    [user_id, fname, lname, email, mob, ques1, ques2],
    (err, results) => {
      if (err) {
        throw err
      }
      console.log(results.rows)

      req.flash(
        'success_msg',
        'Your query has been submitted , Responsible person will get back to you'
      )
      res.redirect('/users/dashboard')
    }
  )
})
module.exports = router
