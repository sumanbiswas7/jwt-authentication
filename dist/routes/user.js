"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { users } = require("../db");
const { validateEmail, validatePassword } = require("../validator/validator");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(users);
});
router.post("/signup", (req, res) => {
    const { email, password } = req.body;
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password, 5, true);
    if (emailErr)
        return res.status(400).send(emailErr);
    if (passwordErr)
        return res.status(400).send(passwordErr);
    res.send("valid password and email");
});
module.exports = router;
