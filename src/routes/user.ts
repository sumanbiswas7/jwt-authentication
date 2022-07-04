import { Router, Request, Response } from "express";
import { User } from "../db"
const { users } = require("../db")
const { validateEmail, validatePassword } = require("../helpers/validator")
import bcrypt from "bcrypt"
const router = Router()


router.get("/", (req: Request, res: Response) => {
    res.status(200).send(users)
})
router.post("/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body

    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password, 5, true)
    if (emailErr) return res.status(400).send(emailErr)
    if (passwordErr) return res.status(400).send(passwordErr)

    const userExists = users.find((user: User) => user.email === email)
    if (userExists) return res.status(400).send({ error: "invalid email", message: `user with email - ${email} already exists` })

    try {
        const hashedPassword = await bcrypt.hash(password, 5)
        console.log(hashedPassword)
        const user = { email, password: hashedPassword }
        users.push(user)
        res.status(201).send("user added sucessfully")

    } catch (error) {
        console.log(error)
        res.status(400).send({ error: "db err", message: "can't connect to the database" })
    }
})

module.exports = router
