"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userRoutes = require("./routes/user");
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.get("/", (req, res) => {
    res.send("express server is running");
});
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
