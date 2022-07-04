"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT = require("jsonwebtoken");
const { users } = require("../db");
const { validateEmail, validatePassword } = require("../helpers/validator");
const checkAuth = require("../helpers/checkAuth");
const router = (0, express_1.Router)();
router.get("/", checkAuth, (req, res) => {
    res.status(200).send(users);
});
// SIGN-UP
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password, 5, true);
    if (emailErr)
        return res.status(400).send(emailErr);
    if (passwordErr)
        return res.status(400).send(passwordErr);
    const userExists = users.find((user) => user.email === email);
    if (userExists)
        return res.status(400).send({ error: "invalid email", message: `user with email - ${email} already exists` });
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        console.log(hashedPassword);
        const user = { email, password: hashedPassword };
        users.push(user);
        const token = yield JWT.sign({ email }, "SECRET");
        res.status(201).send({ message: "user added sucessfully", token });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: "db err", message: "can't connect to the database" });
    }
}));
// LOG-IN
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = users.find((user) => user.email == email);
    if (!user)
        return res.status(400).send({ error: "invalid user", message: `user ${email} not found` });
    try {
        const matchPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!matchPassword)
            return res.status(400).send({ error: "invalid user", message: `invalid user credentials` });
        const token = JWT.sign({ email }, "SECRET");
        return res.status(200).send({ message: "login sucessfull", token });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({ error: "can't login", message: "can't perform login" });
    }
}));
module.exports = router;
