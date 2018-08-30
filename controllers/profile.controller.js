const passport = require("passport");
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.test = (req, res) => {
  res.send("profile route test");
};

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
        {
          user: req.user.id
        },
        {
          $set: profileFields
        },
        {
          new: true
        }
      ).then(profile => res.json(profile));
    } else {
      new Profile(profileFields).save().then(profile => res.json(profile));
    }
  });
};
