const passport = require('passport')
const express = require ('express')
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User = require('../model/admin');

passport.use(
	new GoogleStrategy(
	  {
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		callbackURL: 'http://localhost:4000/auth/google/callback',
		scope: ['profile', 'email'],
	  },
	  async (accessToken, refreshToken, profile, cb) => {
		try {
		  // Check if the user already exists based on the Google ID
		  const existingUser = await User.findOne({ googleId: profile.id });
  
		  if (existingUser) {
			// If the user exists, update the profile details if needed
			existingUser.displayName = profile.displayName;
			// Update other fields as needed
			await existingUser.save();
		
			// Link the Google account with the existing user account
			return cb(null, existingUser);
		}
		
  
		  // If the user does not exist, create a new user
		  const newUser = new User({
			googleId: profile.id,
			displayName: profile.displayName,
			// Add other necessary fields from the Google profile
		  });
  
		  await newUser.save();
		  return cb(null, newUser);
		} catch (error) {
		  return cb(error, null);
		}
	  }
	)
  );
  
  passport.serializeUser((user, done) => {
	done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
	try {
	  const user = await User.findById(id);
	  done(null, user);
	} catch (error) {
	  done(error, null);
	}
  });
  
  router.get('/login/success', (req, res) => {
	if (req.user) {
	  res.status(200).json({
		error: false,
		message: 'Successfully Logged In',
		user: req.user,
	  });
	} else {
	  res.status(403).json({ error: true, message: 'Not Authorized' });
	}
  });
  
  router.get('/login/failed', (req, res) => {
	res.status(401).json({
	  error: true,
	  message: 'Log in failure',
	});
  });
  
  router.get('/google', passport.authenticate('google', ['profile', 'email']));
  
  router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
	  successRedirect: 'http://localhost:3000/LandingPage',
	  failureRedirect: '/login/failed',
	})
  );
  
  router.get('/logout', (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
  });
  
  module.exports = router;