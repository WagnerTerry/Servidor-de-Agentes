import express, { Router, Request, Response } from 'express'
import Agent from '../models/Agent';

const validator = require('validator');
const { v4: uuidv4 } = require('uuid')


const router: Router = express.Router();

router.get('/agents', async (req: Request, res: Response) => {
    try {
        const agent = await Agent.find()
        await Agent.create(agent)

        res.status(200).json(agent)
    } catch (error) {
        res.status(500).json({ error: error })

    }
})

router.post('/agents', async (req: Request, res: Response) => {
    try {
        const { name, login, medias, password } = req.body;

        if (!name || !login || !password || validator.isEmpty(name) || validator.isEmpty(login) || validator.isEmpty(password)) {
            return res.status(400).json({ error: 'Dados inválidos. Certifique-se de que name, login e password não sejam nulos ou vazios.' })
        }

        const id = uuidv4()

        const newAgent = new Agent({
            name,
            login,
            medias,
            id,
            domain: "google.com"
        })

        await newAgent.save();

        res.status(201).json({
            name,
            login,
            medias,
            id,
            domain: "google.com"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar agente.' });
    }
})

export default router