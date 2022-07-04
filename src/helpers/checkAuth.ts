const JWT = require("jsonwebtoken")
import { Request, Response, NextFunction } from "express"

async function checkAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-auth-token")

    if (!token) return res.status(400).send({ error: "login", message: "please create an account or login if already have an account" })

    try {
        const user = await JWT.verify(token, "SECRET")
        if (user) {
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: "auth-error", message: "can't authenticate user" })
    }
}

module.exports = checkAuth 