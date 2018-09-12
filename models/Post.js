const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "Profile"
  },
  content: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String
  },
  userName: {
    type: String,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      userName: {
        type: String,
        required: true
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      userName: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);
