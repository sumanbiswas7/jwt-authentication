function validatePassword(pass: string, len: number, reqSpecialChar: boolean) {
    if (pass.length < len) return { error: "invalid password", message: `password length must be atleast ${len} character long` }

    if (reqSpecialChar) {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (!format.test(pass)) return { error: "invalid password", message: `password must have one special character` }
    }

    return false
}

function validateEmail(email: string) {
    const mailformat =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(mailformat)) return { error: "invalid email", message: `please provide a valid email` }

    return false
}

module.exports = { validatePassword, validateEmail }
