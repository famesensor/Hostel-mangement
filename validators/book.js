const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateBookInput = (data) => {
    let errors = {};

    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.datein = !isEmpty(data.datein) ? data.datein : '';
    data.dateout = !isEmpty(data.dateout) ? data.dateout : '';
    data.checkin = !isEmpty(data.checkin) ? data.checkin : '';
    data.checkout = !isEmpty(data.checkout) ? data.checkout : '';

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
    if (Validator.isEmpty(data.phone)) {
        errors.phone = `Phone field is required`;
    }
    if (Validator.isEmpty(data.datein)) {
        errors.datein = `Datein field is required`;
    }
    if (Validator.isEmpty(data.dateout)) {
        errors.dateout = `Dateout field is required`;
    }
    if (Validator.isEmpty(data.checkin)) {
        errors.checkin = `checkin field is required`;
    }
    if (Validator.isEmpty(data.checkout)) {
        errors.checkout = `checkout field is required`;
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}