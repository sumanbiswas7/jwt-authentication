"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
app.get("/", (req, res) => {
    res.send("express server is running");
});
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
