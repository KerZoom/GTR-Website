const passport = require('passport');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const {Schema} = require("mongoose");
const mongoose = require("mongoose");

const renderLogin = (req, res) => {
    res.render('login', { title: 'Login' });
};
const renderRegistration = (req, res) => {
    res.render('register', { title: 'Register' });
};

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ Username: username });
        if (existingUser) {
            return res.render('register', { title: 'Register', error: 'Username is already taken' });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create a new user
            const newUser = new User({Username: username, Password: hashedPassword},{collection : 'users'});

            console.log(newUser)
            console.log('Before save operation');
            await newUser.save();
            console.log('After save operation');

            // Redirect to a success page or login page
            res.redirect('/');
        }
    } catch (error) {
        // Handle errors (render an error page or redirect to the registration form)
        console.error(error);
        res.render('register', { title: 'Register', error: 'An error occurred during registration' });
    }
};

const authenticateUser = passport.authenticate('local', {
    successRedirect: '/cars',
    failureRedirect: '/',
});

const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};

module.exports = {
    renderLogin,
    renderRegistration,
    registerUser,
    authenticateUser,
    logout,
};
