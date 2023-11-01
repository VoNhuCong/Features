// import all the things we need  
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')


module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
        }
        console.log("profile: " + newUser.email)
        console.log("refreshToken: " + refreshToken)

        try {
          //find the user in our database 
          let user = await User.findOne({ googleId: profile.id })

          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }

        // https://www.googleapis.com/oauth2/v3/userinfo?access_token={access_token}

        // const { OAuth2Client } = require('google-auth-library');
        // const client = new OAuth2Client();
        // async function verify() {
        //   const ticket = await client.verifyIdToken({
        //     idToken: accessToken,
        //     audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        //     // Or, if multiple clients access the backend:
        //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        //   });
        //   const payload = ticket.getPayload();
        //   const userid = payload['sub'];
        //   // If request specified a G Suite domain:
        //   // const domain = payload['hd'];
        //   console.log(ticket);
        // }
        // verify().catch(console.error);

      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}
