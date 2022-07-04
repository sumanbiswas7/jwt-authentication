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
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jsonwebtoken");
function checkAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(400).send({ error: "login", message: "please create an account or login if already have an account" });
        try {
            const user = yield JWT.verify(token, "SECRET");
            if (user) {
                next();
            }
        }
        catch (error) {
            console.log(error);
            return res.status(400).send({ error: "auth-error", message: "can't authenticate user" });
        }
    });
}
module.exports = checkAuth;
