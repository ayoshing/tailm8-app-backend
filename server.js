const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// MongoDB connection
const mongoDB = process.env.MONGODB_URI || require('./config/keys').mongoURI;

mongoose.connect(mongoDB, { useNewUrlParser: true });

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const users = require('./routes/api/users.route');
const profile = require('./routes/api/profile.route');

app.get('/', (req, res) => res.json({msg: "Working"}));
app.use('/api/users', users);
app.use('/api/profile', profile);

// Server
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on port ${port}`));
