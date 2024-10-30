import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Usuario from '../models/user.model.js';

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    // console.log("profile: ", profile);
    try {
        let user = await Usuario.findOne({ googleId: profile.id });

        if (!user) {
            user = new Usuario({
                googleId: profile.id,
                name: profile.name.givenName,
                lastname: profile.name.familyName,
                // name: profile.displayName,
                email: profile.emails[0].value,
                // imagen: profile.photos[0].value,
                // rol: 'user'
            });
            await user.save();
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Usuario.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});
