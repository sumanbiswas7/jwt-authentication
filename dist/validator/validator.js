"use strict";
function validatePassword(pass, len, reqSpecialChar) {
    if (pass.length < len)
        return `password length must be atleast ${len} character long`;
    if (reqSpecialChar) {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (!format.test(pass))
            return `password must have one special character`;
    }
    return false;
}
function validateEmail(email) {
    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(mailformat))
        return `please provide a valid email`;
    return false;
}
module.exports = { validatePassword, validateEmail };