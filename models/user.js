const mongoose = require('mongoose');
const options = {
  timestamps: true
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }

}, options)

module.exports = mongoose.model('User', userSchema);