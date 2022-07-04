import { Router, Request, Response } from "express";
const { users } = require("../db")
const { validateEmail, validatePassword } = require("../validator/validator")
const router = Router()

router.get("/", (req: Request, res: Response) => {
    res.status(200).send(users)
})
router.post("/signup", (req: Request, res: Response) => {
    const { email, password } = req.body

    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password, 5, true)
    if (emailErr) return res.status(400).send(emailErr)
    if (passwordErr) return res.status(400).send(passwordErr)

    res.send("valid password and email")
})

module.exports = router