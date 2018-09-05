const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  userName: {
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
  },
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      status: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model("Profile", ProfileSchema);
