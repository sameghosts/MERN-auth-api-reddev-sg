// dependencies 
require('dotenv').config();
const mongoose = require('mongoose');

// connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
// console log on open
mongoose.connection.once('open', () =>
  console.log(`🔗 Connected to MongoDB at ${mongoose.connection.host}:${mongoose.connection.port}`)
);

// console log on error
mongoose.connection.on('error', err => 

  console.error(`🤬 Database Error:\n${err}`)
);
//export 
module.exports.User = require('./user');