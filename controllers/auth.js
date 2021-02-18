const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../models');
const router = express.Router();
const { createUserToken } = require('../middleware/auth');
const passport = require('passport');
const jwt = require('jsonwebtoken');


// URL prefix - /api

// Signup - POST /api/signup
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash
    }))
    .then(createdUser => res.status(201).json({ 
      token: createUserToken(req, createdUser),
      user: createdUser
    }))
    .catch(err => {
      console.log(`🚨 Error in the Post signup:`, err);
      res.status(401).json({ error: err.message })
    });
  });

// Login - POST /api/login
router.post('/login', (req, res) => {
  // if login details are correct (req.body vs database information)
  db.User.findOne({ email: req.body.email })
    .then(user => {
      // create and send a token via createUserToken
      res.status(201).json({
        token: createUserToken(req, user),
        user: user
      });
    }).catch(err =>{
    // send an error 
      console.log(`🚨 Error in the POST login route`, err);
      res.status(401).json({
        error: err.message
      });
    })
});

// Get /api/private - Test Route for Authorization lock
router.get('/private', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.status(200).json({
    message: 'Thou has been granted permission to access this message'
  }).catch(err => {

  })
})

// PUT - /api/user
router.put(
  '/user',
  passport.authenticate('jwt', { session: false}),
  (req, res) => {
    // ------------------- This is the Hard Way ----------------
    // //get the token from the rq headers
    // let token = req.headers.authorization.split(' ')[1]
    // // decode the token to get those sweet payload details
    // let decoded = jwt.verify(token, process.env.JWT_SECRET);
    // //update a user based on the id from token and update info from body
    db.User.findByIdAndUpdate(req.user._id, { name: req.body.name })
      .then(user => {
        res.status(201).json(user);
      })
  }
)
module.exports = router;