const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.test = (req, res) => {
  res.send('profile route test');
}

exports.createProfile = (req, res) => {
  console.log(req.user);
}
