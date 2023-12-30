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
        const response = await request(app).get(`/agents/9f90d407-4944-4029-b24c-05088c17f112}`);

        // Verifique o status da resposta
        expect(response.status).toBe(200);

        // Verifique se a resposta é um objeto que contém os detalhes do agente
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: 'TestAgent',
            login: 'testagent',
            password: 'password123',
            domain: 'example.com',
        }));
    });

});