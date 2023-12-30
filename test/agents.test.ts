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

describe('GET /agents', () => {
    it('should get a list of agents', async () => {
        // Criar alguns agentes para simular dados no banco de dados
        await Agent.create([
            { name: 'Agent1', login: 'agent1', password: 'password123', domain: 'google.com' },
            { name: 'Agent2', login: 'agent2', password: 'password456', domain: 'google.com' },
            // Adicione mais agentes conforme necessário
        ]);

        // Fazer uma solicitação GET para a rota /agents
        const response = await request(app).get(`${baseURL}/agents`);

        // Verificar o status da resposta
        expect(response.status).toBe(200);

        // Verificar o corpo da resposta
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });
});