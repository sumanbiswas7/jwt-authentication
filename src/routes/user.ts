import { Router, Request, Response } from "express";
const { users } = require("../db")
const router = Router()

router.get("/", (req: Request, res: Response) => {
    res.status(200).send(users)
})
router.post("/signup", (req: Request, res: Response) => { 
    
})

module.exports = router