const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Public Route: 'api/users'
exports.createUser = (req, res) => {
  let errors = {};
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let accountType = req.body.accountType;

  User.findOne({ email }).then(user => {
    if (user) {
      errors.email = "Email Already Exists";
      return res.status(400).json(errors);
    }
  });

  let newUser = new User({
    name,
    email,
    password,
    accountType
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
};

// Public Route: 'api/users/login'
exports.logInUser = (req, res) => {
  let errors = {};
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User Not Found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(checkPassword => {
      if (checkPassword) {
        let payload = {
          id: user.id,
          name: user.name,
          accountType: user.accountType
        };

        jwt.sign(payload, keys.secretOrKey, (err, token) => {
          res.json({
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
};

// Private Route: 'api/users/current'
exports.getCurrentUser = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    accountType: req.user.accountType
  });
};
