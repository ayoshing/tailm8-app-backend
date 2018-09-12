const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Friendship management
const options = {
  personModelName: "Profile",
  friendshipModelName: "Friendship"
};
const FriendsOfFriends = require("friends-of-friends")(mongoose, options);

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  userName: {
    type: String
  },
  userNameLowerCase: {
    type: String
  },
  birthday: {
    type: Date
  },
  breed: {
    type: String
  },
  gender: {
    type: String
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  website: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    }
  }
});

ProfileSchema.plugin(FriendsOfFriends.plugin, options);

module.exports = mongoose.model(options.personModelName, ProfileSchema);
