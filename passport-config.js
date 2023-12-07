const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./app_api/models/userSchema');

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ Username: username });
            const isPasswordValid = await user.validPassword(password);

            if (user && isPasswordValid) {
                console.log('Authentication successful:', user);
                return done(null, user);
            }
            return done(null, false, { message: 'Invalid credentials' });
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;