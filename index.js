

// app.js
const dotenv = require ('dotenv')
const expressSession = require('express-session');
const express = require('express');
const mongoose = require('mongoose');
const databaseConfig = require('./config/database_config');
const passportSetup = require('./routes/loginwithsocialaccount')
const authRoutes = require ('./routes/auth');
const allUsersRoutes = require('./routes/allusers')
const complaintRoutes = require('./routes/complaint');
const noticeRoutes = require('./routes/notice')
const deleteRoutes = require('./routes/deleteUser')
const hostelDetailsRoutes = require('./routes/hostelDetails')
const profileRoutes = require('./routes/profile')
const SearchRoute = require('./routes/search')
const paymentRoutes = require('./routes/paymentPage')
const cors = require("cors");
const passport = require("passport");
const loginwithsocial = require("./routes/loginwithsocialaccount");
const cookieSession = require("cookie-session");
const passportStrategy = require("./routes/loginwithsocialaccount");
const app = express();
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(databaseConfig.url, databaseConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// app.use(
// 	cookieSession({
// 	  name: 'session',
// 	  keys: ['hostelmanagament'],
// 	  maxAge: 24 * 60 * 60 * 100,
// 	})
//   );

app.use(
	expressSession({
	  secret: 'your-secret-key', // Replace with a secret key for session encryption
	  resave: false,
	  saveUninitialized: false,
	  cookie: {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	  },
	})
  );
app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


// Middleware
// app.use(cors());
app.use(express.json());

// Routes
app.use('/',authRoutes);
app.use('/',allUsersRoutes);
app.use('/',complaintRoutes);
app.use('/',hostelDetailsRoutes);
app.use('/',noticeRoutes);
app.use('/',deleteRoutes);
app.use('/',profileRoutes);
app.use('/',paymentRoutes);
app.use("/", loginwithsocial);
app.use("/", SearchRoute);

app.get('/', (req,res)=> {
  res.send('Root Page');
})

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
