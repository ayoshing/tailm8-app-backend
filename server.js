const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users.route");
const profile = require("./routes/api/profile.route");
const posts = require("./routes/api/posts.route");
const likes = require("./routes/api/likes.route");
const comments = require("./routes/api/comments.route");
// const friends = require("./routes/api/friends.route");
const friendship = require("./routes/api/friendship.route");

// MongoDB connection
const mongoDB = process.env.MONGODB_URI || require("./config/keys").mongoURI;

mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport auth middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// CORS middleware (enable all CORS requests)
app.use(cors());

// Routes
app.use("/api/users", users);
app.use("/api/profile", profile, friendship);
app.use("/api/posts", posts, likes, comments);

// Server
const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`CORS-enabled server is running on port ${port}`)
);
