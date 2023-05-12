const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
require("dotenv").config();
const User = require("./models/userModel");
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID,
      consumerSecret: process.env.TWITTER_CLIENT_SECERT,
      callbackURL: "http://localhost:5000/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, done) {
      User.findOne({ twitterId: profile.id }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          const newUser = new User({
            twitterId: profile.id,
            username: profile.username,
            displayName: profile.displayName,
          });
          newUser.save(function (err) {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        } else {
          return done(null, user);
        }
      });
    }
  )
);
