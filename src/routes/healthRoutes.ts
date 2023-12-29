import express, { Router, Request, Response } from 'express'

const router: Router = express.Router()

router.get('/healthy', (req: Request, res: Response) => {
    res.send("API ok")
})

export default router;