"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { users } = require("../db");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.status(200).send(users);
});
router.post("/signup", (req, res) => {
});
module.exports = router;
