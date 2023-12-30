import express, { Router, Request, Response } from 'express'
import Agent from '../models/Agent';

const validator = require('validator');
const router: Router = express.Router();

const { v4: uuidv4 } = require('uuid')

router.get('/agents', async (req: Request, res: Response) => {
    try {
        const agent = await Agent.find()
        await Agent.create(agent)

        return res.status(200).json(agent)
    } catch (error) {
        return res.status(500).json({ error: error })

    }
})

router.get('/agents/:agentId', async (req: Request, res: Response) => {
    const agentId = req.params.agentId
    try {
        const agent = await Agent.findOne({ id: agentId })

        if (!agent) {
            return res.status(404).json({ message: "Invalid agent id" })
        }

        await Agent.create(agent)
        return res.status(200).json(agent)
    } catch (error) {
        return res.status(500).json({ error: error })

    }
})

router.post('/agents', async (req: Request, res: Response) => {
    try {
        const { name, login, medias, password } = req.body;

        if (!name || !login || !password || validator.isEmpty(name) || validator.isEmpty(login) || validator.isEmpty(password)) {
            return res.status(400).json({ error: "Invalid data. Make sure that name, login and password are not null or empty." });
        }

        // Verificar se já existe um agente com o mesmo login
        const existingAgent = await Agent.findOne({ login });

        if (existingAgent) {
            return res.status(400).json({ error: "A user with the same login already exists." });
        }

        const id = uuidv4();

        const newAgent = new Agent({
            name,
            login,
            medias,
            id,
            domain: "google.com"
        });

        await newAgent.save();

        return res.status(201).json({
            name,
            login,
            medias,
            id,
            domain: "google.com"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating agent.' });
    }
});

router.put('/agents/:agentId', async (req: Request, res: Response) => {
    const agentId = req.params.agentId;

    try {
        const { name, login, medias, password } = req.body;

        // Verificar se o agente com o ID fornecido existe
        const existingAgent = await Agent.findOne({ id: agentId });

        if (!existingAgent) {
            return res.status(404).json({ error: 'Agent not found.' });
        }

        // Atualizar os campos desejados
        existingAgent.name = name;
        existingAgent.login = login;
        existingAgent.medias = medias;
        existingAgent.password = password;

        // Salvar as alterações no banco de dados
        await existingAgent.save();

        return res.status(200).json(existingAgent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating agent.' });
    }
});

router.delete('/agents/:agentId', async (req: Request, res: Response) => {
    const agentId = req.params.agentId
    try {
        await Agent.deleteOne({ id: agentId })


        return res.status(200).json('Agent removed successfully!')
    } catch (error) {
        return res.status(500).json({ error: error })

    }
})

router.delete('/agents', async (req: Request, res: Response) => {
    try {
        const { login } = req.body;

        // Validar se o login foi fornecido
        if (!login) {
            return res.status(400).json({ error: 'Login not provided.' });
        }

        // Buscar e excluir o agente com base no login
        const deletedAgent = await Agent.findOneAndDelete({ login });

        if (!deletedAgent) {
            return res.status(404).json({ error: 'Agent not found.' });
        }

        return res.status(200).json({ message: 'Agent deleted successfully.', deletedAgent });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error deleting agent.' });
    }
});

export default router