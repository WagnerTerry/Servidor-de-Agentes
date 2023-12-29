import express, { Router, Request, Response } from 'express'

const validator = require('validator');
const { v4: uuidv4 } = require('uuid')


const router: Router = express.Router();

router.get('/agents', (req: Request, res: Response) => {
    res.send("API ok agents")
})

router.post('/agents', (req: Request, res: Response) => {
    const { name, login, medias, password } = req.body;

    if (!name || !login || !password || validator.isEmpty(name) || validator.isEmpty(login) || validator.isEmpty(password)) {
        return res.status(400).json({ error: 'Dados inválidos. Certifique-se de que name, login e password não sejam nulos ou vazios.' })
    }

    const id = uuidv4()

    res.json({
        name,
        login,
        medias,
        id,
        domain: "google.com"
    })
})

export default router