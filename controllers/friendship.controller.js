const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");
const Profile = require("../models/Profile");

// Private Route: 'api/profile/friends'
exports.getFriendsList = (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      profile.getFriends((err, friends) => {
        if (err) throw err;
        res.json(friends);
      });
    })
    .catch(err => {
      console.log(err);
      errors.errors = "Unauthorized user";
      res.status(401).json(errors);
    });
};

// Private Route: 'api/profile/:profile_id/friends'
exports.getFriendsOfFriendsList = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(i => {});
};

// Private Route: 'api/profile/:profile_id/request-friend'
exports.sendFriendRequest = (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id }).then(i => {
    Profile.findOne({ _id: req.params.profile_id })
      .then(friend => {
        i.friendRequest(friend._id, (err, request) => {
          if (err) {
            err.errors = "A pending request already exists";

            res.status(422).json(err);
          } else {
            res.json(request);
          }
        });
      })
      .catch(err => {
        console.log(err);
        errors.errors = "Profile does not exist";
        res.status(404).json(errors);
      });
  });
};

// Private Route: 'api/profile/:profile_id/deny-friend'
exports.denyFriendRequest = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(i => {
    Profile.findOne({ _id: req.params.profile_id })
      .then(friend => {
        i.denyRequest(friend._id, (err, denied) => {
          if (err) {
            err.errors = "A pending request already exists";

            res.status(422).json(err);
          } else {
            res.json(request);
          }
        });
      })
      .catch(err => {
        console.log(err);
        errors.errors = "Profile does not exist";
        res.status(404).json(errors);
      });
  });
};

// Private Route: 'api/profile/:profile_id/accept-friend'
exports.acceptFriendRequest = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(i => {
    Profile.findOne({ _id: req.params.profile_id })
      .then(friend => {
        i.acceptRequest(friend._id, (err, friendship) => {
          if (err) {
            err.errors = "A pending request already exists";

            res.status(422).json(err);
          } else {
            res.json(request);
          }
        });
      })
      .catch(err => {
        console.log(err);
        errors.errors = "Profile does not exist";
        res.status(404).json(errors);
      });
  });
};

// Private Route: 'api/profile/profile_id/unfriend'
exports.removeFriend = (req, res) => {};
