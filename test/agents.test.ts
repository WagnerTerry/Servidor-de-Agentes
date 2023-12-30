import request from 'supertest';
import app from '../src/app'; // Substitua pelo caminho real do seu arquivo de configuração do Express
import Agent from '../src/models/Agent';
import mongoose from 'mongoose';


const baseURL = "/v1/public"
let server: any;

// Antes de todos os testes, conecte ao banco de dados e inicie o servidor
beforeAll(async () => {
    await mongoose.connect('mongodb://root:root@127.0.0.1:27017?directConnection=true&serverSelectionTimeoutMS=2000', {
        user: 'root',
        pass: 'root',
        appName: 'agents server'
    });

    // Inicie seu servidor Express aqui, se ainda não estiver iniciado
    if (process.env.NODE_ENV !== 'test') {
        server = app.listen(3002, () => {
            console.log('Server is running');
        });
    }
});

// Depois de todos os testes, desconecte do banco de dados e pare o servidor
afterAll(async () => {
    await mongoose.connection.close();

    // Encerre o servidor se estiver em execução
    if (server) {
        server.close();
    }
});

describe('testing agent routes', () => {
    it('should get a list of agents', async () => {

        // Fazer uma solicitação GET para a rota /agents
        const response = await request(app).get(`${baseURL}/agents`);

        // Verificar o status da resposta
        expect(response.status).toBe(200);

        // Verificar o corpo da resposta
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return agent details for a valid agentId', async () => {

        // Faça uma solicitação GET para o endpoint com o ID do agente criado
        const response = await request(app).get(`${baseURL}/agents/agentId}`);


        // Verifique o status da resposta
        if (response.status == 404) {
            return expect(response.status).toBe(404);

        } else {
            return expect(response.status).toBe(200);

        }

    });

    it('should return 404 for an invalid agentId', async () => {
        // Faça uma solicitação GET para o endpoint com um ID de agente inválido
        const response = await request(app).get(`${baseURL}/agents/1209s-1342`);

        // Verifique o status da resposta
        expect(response.status).toBe(404);
        console.log("reso", response.body)

        // Verifique se a resposta contém a mensagem adequada para um ID de agente inválido
        expect(response.body).toEqual({ message: 'Invalid agent id' });
    });

    it('should return 500 for internal server error', async () => {
        // Force um erro interno simulando uma exceção no banco de dados
        jest.spyOn(Agent, 'findOne').mockImplementationOnce(() => {
            throw new Error('Simulated internal server error');
        });

        // Faça uma solicitação GET para o endpoint
        const response = await request(app).get(`${baseURL}/agents/agentId`);

        // Verifique o status da resposta
        expect(response.status).toBe(500);
    });

    it('should create a new agent', async () => {
        const agentData = {
            name: 'Alex',
            login: 'alex',
            password: 'alexful',
        };

        const response = await request(app)
            .post(`${baseURL}/agents`)
            .send(agentData);

        if (response.status === 400) {
            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'A user with the same login already exists.',
            });
        } else {
            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                name: 'Alex',
                login: 'alex',
                id: expect.any(String),
                domain: 'google.com',
            });
        }
    });

    it('should return 400 for invalid data', async () => {
        const invalidAgentData = {
            name: '',
            login: '',
            password: '',
            medias: ['media1', 'media2'],
        };

        const response = await request(app)
            .post(`${baseURL}/agents`)
            .send(invalidAgentData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Invalid data. Make sure that name, login and password are not null or empty.',
        });
    });

    it('should update an existing agent', async () => {
        // Crie um agente no banco de dados para simular um agente existente
        const existingAgent = await Agent.create({
            name: 'ExistingAgent',
            login: 'existingagent',
            password: 'password123',
            medias: ['media1', 'media2'],
            domain: 'google.com',
        });

        const updatedAgentData = {
            name: 'UpdatedAgent',
            login: 'updatedagent',
            password: 'newpassword',
            medias: ['newmedia1', 'newmedia2'],
        };

        const response = await request(app)
            .put(`${baseURL}/agents/${existingAgent._id}`)
            .send(updatedAgentData);

        if (response.status === 404) {
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                error: 'Agent not found.',
            });
        } else {
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: existingAgent.id.toString(),
                name: 'UpdatedAgent',
                login: 'updatedagent',
                password: 'newpassword',
                medias: ['newmedia1', 'newmedia2'],
                domain: 'google.com',
            });
        }
    });

    it('should delete an existing agent', async () => {

        const response = await request(app)
            .delete(`${baseURL}/agents/12342}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual('Agent removed successfully!');

    });

    it('should delete an existing agent by login', async () => {

        const response = await request(app)
            .delete(`${baseURL}/agents`)
            .send({ login: 'existingagent' });

        if (response.status === 400) {
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: "Login not provided." })
        } else if (response.status === 404) {
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "Agent not found." })
        } else {
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'Agent deleted successfully.',

            });
        }
    });
});