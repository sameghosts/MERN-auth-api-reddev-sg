// Require Passport
require('dotenv').config();
const passport = require('passport');
const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Construct the Strategy (jwt)
const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
const findUser = (jwt_payload, done) => {
  db.User.findById(jwt_payload.id)
    .then(user => done(null, user))
    .catch(done)
};
const strategy = new Strategy(options, findUser);

// "register" the strategy so passport uses it when we call 'passport.authenticate()' in our routes
passport.use(strategy);

// intialize passport
passport.initialize();

// write a function that creates a jwt token 
const createUserToken = (req, user) => {
  // check the password from the req.body against the user
  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  // if we didn't get a user or the password isn't valid, then throw an error
  if (!user || !validPassword) {
    const err = new Error('Invalid Credentials 👮')
    err.statusCode = 422;
    throw err
  } else {
    return jwt.sign( // otherwise create and sign a new token
      { id: user._id, user: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '2m' } // TODO: Extend for production
      );
  }
}

module.exports = {
  createUserToken
}