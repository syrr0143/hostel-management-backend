

// app.js
const dotenv = require ('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const databaseConfig = require('./config/database_config');
const authRoutes = require ('./routes/auth');
const allUsersRoutes = require('./routes/allusers')
const complaintRoutes = require('./routes/complaint');
const noticeRoutes = require('./routes/notice')
const cors = require("cors");
const app = express();

// Connect to MongoDB
mongoose.connect(databaseConfig.url, databaseConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/',authRoutes);
app.use('/',allUsersRoutes);
app.use('/',complaintRoutes);
app.use('/',noticeRoutes);


app.get('/', (req,res)=> {
  res.send('Root Page');
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
