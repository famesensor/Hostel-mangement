const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput = (data) => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.birth = !isEmpty(data.birth) ? data.birth : '';

    if (Validator.isEmpty(data.username)) {
        errors.username = `Username field is required`;
    }
    if (!Validator.isLength(data.username, {min : 6 , max : 30})){
        errors.username = `Username must be between 6 and 30 characters`;
    }
    if (!Validator.isLength(data.fname, {min : 2 , max : 30})) {
        errors.fname = `FirstName must be between 2 and 30 characters`;
    }
    if (Validator.isEmpty(data.fname)) {
        errors.fname = `FirstName field is required`;
    }
    if (!Validator.isLength(data.lname, {min : 2 , max : 30})) {
        errors.lname = `LastName must be between 2 and 30 characters`;
    }
    if (Validator.isEmpty(data.lname)) {
        errors.lname = `LastName field is required`;
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = `Email field is required`;
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = `Email is invalid`;
    }
    if (Validator.isEmpty(data.birth)) {
        errors.birth = `Birthday field is required`;
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = `Password field is required`;
    }
    if (!Validator.isLength(data.password, {min : 6 , max : 30})) {
        errors.password = `Password must be between 6 and 30`;
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = `Confirm password field is erequired`;
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = `Passwords must match`;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}