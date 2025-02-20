import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5002/google/callback",
    passReqToCallback: true
}, 

function(request, accessToken, refreshToken, profile, done) {
    const user = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.picture
    };
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
