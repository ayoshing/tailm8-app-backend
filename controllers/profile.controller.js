const passport = require("passport");
const Profile = require("../models/Profile");
const User = require("../models/User");

// Public Route: 'api/profile/users'
exports.getProfiles = (req, res) => {
  let errors = {};
  Profile.find()
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
};

// Public Route: 'api/profile/users/:user_id'
exports.getProfile = (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.params.user_id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
};

// Public Route: 'api/profile/:username'
exports.getUserName = (req, res) => {
  let errors = {};
  Profile.findOne({ userName: req.params.username })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
};

// Private Route: '/api/profile'
exports.getCurrentProfile = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is not profile for this user";
        return res.status(404), json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
};

// Private Route: '/api/profile'
exports.createOrUpdateProfile = (req, res) => {
  let profileFields = {};
  profileFields.social = {};
  profileFields.user = req.user.id;

  //TODO: refactor out list of social media
  Object.entries(req.body).forEach(([key, value]) => {
    if (
      value &&
      key !== "twitter" &&
      key !== "facebook" &&
      key !== "instagram"
    ) {
      profileFields[key] = req.body[key];
    } else if (key === "twitter" || key === "facebook" || key === "instagram") {
      profileFields.social[key] = req.body[key];
    }
  });

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileField },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      new Profile(profileFields).save().then(profile => res.json(profile));
    }
  });
};

exports.deleteUserAndProfile = (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ delete: "successful" })
    );
  });
};
