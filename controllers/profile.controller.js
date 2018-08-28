const mongoose = require('mongoose');
const Profile = require('../models/Profile');

exports.test = (req, res) => {
  res.send('profile path works')
}
