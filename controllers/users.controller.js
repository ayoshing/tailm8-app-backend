const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Route '/api/users'

exports.createUser = (req, res) => {
  let error = {};
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let accountType = req.body.accountType;

  User.findOne({ email }).then(user => {
    if (user) {
      error = "Email already exists";
      return res.status(400).json(error);
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
      newUser.password = hash;
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    });
  });
};

exports.logInUser = (req, res) => {
  let error = {};
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      error = "User not found";
      return res.status(404).json(error);
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
        error = "Incorrect password";
        return res.status(400).json(error);
      }
    });
  });
};

// exports.getAllUsers = (req, res) => {
//   User.find()
//     .then(users => {
//       let userMap = users.map(user => {
//         return {
//           name: user.name,
//           email: user.email,
//           accountType: user.accountType,
//           date: user.date
//         }
//       })
//
//       res.json(userMap)
//     })
//     .catch(err => console.log(err));
// }

// exports.getUser = (req, res) => {
//   User.findById(req.params.id)
//     .then(user => res.json({
//       name: user.name,
//       email: user.email,
//       accountType: user.accountType,
//       date: user.date
//     }))
//     .catch(err => console.log(err));
// }

// // Updates and returns updated user data
// exports.updateUser = (req, res) => {
//   User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//     .then(user => res.json({
//       name: user.name,
//       email: user.email,
//       accountType: user.accountType,
//       date: user.date
//     }))
//     .catch(err => console.log(err));
// }
//
// exports.deleteUser = (req, res) => {
//   User.findByIdAndRemove(req.params.id, (err) => {
//     if(err) return next(err);
//     res.send('Successfully Deleted User')
//   })
// }

// Private route to retrieve current user
// exports.getCurrentUser = (req, res) => {
//   User.findOne(req.user).then(user => res.json(user))
// }
