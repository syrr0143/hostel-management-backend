const passport = require('passport')
const express = require ('express')
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:"http://localhost:4000/auth/google/callback",
    scope:["profile","email"],
  },
  function(accessToken, refreshToken, profile, cb) {

    cb(null, profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //    cb(null, profile);
    // });
  }
));

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: 'http://localhost:3000/LandingPage',
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports= router;

