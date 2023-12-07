const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator');

const usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 20],
        message: 'Name should be between 3 and 50 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Name should contain alpha-numeric characters only'
    })
];
const passwordValidator = [
    validate({
        validator: 'isLength',
        arguments: [5, 100],
        message: 'Password should be between 3 and 50 characters'
    }),
];

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        unique: true,
        required: true,
        validate: usernameValidator
    },
    Password: {
        type: String,
        required: true,
        maxLength: 100,
        validate: passwordValidator
    },
},{collection : 'users'});

userSchema.methods.validPassword = function (password) {
    return password === this.Password;
};


const User = mongoose.model('User', userSchema);

module.exports = User;