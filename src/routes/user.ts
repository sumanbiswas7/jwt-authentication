import { Router, Request, Response } from "express";
import { User } from "../db"
import bcrypt from "bcrypt"
const JWT = require("jsonwebtoken")
const { users } = require("../db")
const { validateEmail, validatePassword } = require("../helpers/validator")
const checkAuth = require("../helpers/checkAuth")
const router = Router()


router.get("/", checkAuth, (req: Request, res: Response) => {
    res.status(200).send(users)
})

// SIGN-UP
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
        const token = await JWT.sign({ email }, "SECRET")
        res.status(201).send({ message: "user added sucessfully", token })

    } catch (error) {
        console.log(error)
        res.status(400).send({ error: "db err", message: "can't connect to the database" })
    }
})

// LOG-IN
router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find((user: User) => user.email == email)
    if (!user) return res.status(400).send({ error: "invalid user", message: `user ${email} not found` })

    try {
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) return res.status(400).send({ error: "invalid user", message: `invalid user credentials` })

        const token = JWT.sign({ email }, "SECRET")
        return res.status(200).send({ message: "login sucessfull", token })

    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: "can't login", message: "can't perform login" })
    }
})




module.exports = router
