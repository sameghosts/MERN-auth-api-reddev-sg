const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../models');
const router = express.Router();
const { createUserToken } = require('../middleware/auth');


// URL prefix - /api

// Signup - POST /api/signup
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash
    }))
    .then(createdUser => res.json({ 
      token: createUserToken(req, createdUser),
      user: createdUser
    }))
    .catch(err => {
      console.log(`🚨 Error in the Post signup:`, err);
      res.json({ error: err.message })
    });
  });

// Login - POST /api/login
router.post('/login', (req, res) => {
  // if login details are correct (req.body vs database information)
  db.User.findOne({ email: req.body.email })
    .then(user => {
      // create and send a token via createUserToken
      res.json({
        token: createUserToken(req, user),
        user: user
      });
    }).catch(err =>{
    // send an error 
      console.log(`🚨 Error in the POST login route`, err);
      res.json({
        error: err.message
      });
    })
});

module.exports = router;