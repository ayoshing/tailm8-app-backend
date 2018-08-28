const User = require('../models/User');

exports.test = (req, res) => {
  res.send('Testing');
}

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      let userMap = users.map(user => {
        return {
          name: user.name,
          email: user.email,
          accountType: user.accountType,
          date: user.date
        }
      })

      res.json(userMap)
    })
    .catch(err => console.log(err));
}

exports.createUser = (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
}

exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json({
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      date: user.date
    }))
    .catch(err => console.log(err));
}

// Updates and returns updated user data
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(user => res.json({
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      date: user.date
    }))
    .catch(err => console.log(err));
}

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if(err) return next(err);
    res.send('Successfully Deleted User')
  })
}
