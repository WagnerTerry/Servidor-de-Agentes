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
    // it('should get a list of agents', async () => {

    //     // Fazer uma solicitação GET para a rota /agents
    //     const response = await request(app).get(`${baseURL}/agents`);

    //     // Verificar o status da resposta
    //     expect(response.status).toBe(200);

    //     // Verificar o corpo da resposta
    //     expect(Array.isArray(response.body)).toBe(true)
    //     expect(response.body.length).toBeGreaterThan(0);
    // });

    // it('should return agent details for a valid agentId', async () => {

    //     // Faça uma solicitação GET para o endpoint com o ID do agente criado
    //     const response = await request(app).get(`${baseURL}/agents/agentId}`);


    //     // Verifique o status da resposta
    //     if (response.status == 404) {
    //         return expect(response.status).toBe(404);

    //     } else {
    //         return expect(response.status).toBe(200);

    //     }

    // });

    // it('should return 404 for an invalid agentId', async () => {
    //     // Faça uma solicitação GET para o endpoint com um ID de agente inválido
    //     const response = await request(app).get(`${baseURL}/agents/1209s-1342`);

    //     // Verifique o status da resposta
    //     expect(response.status).toBe(404);
    //     console.log("reso", response.body)

    //     // Verifique se a resposta contém a mensagem adequada para um ID de agente inválido
    //     expect(response.body).toEqual({ message: 'Invalid agent id' });
    // });

    // it('should return 500 for internal server error', async () => {
    //     // Force um erro interno simulando uma exceção no banco de dados
    //     jest.spyOn(Agent, 'findOne').mockImplementationOnce(() => {
    //         throw new Error('Simulated internal server error');
    //     });

    //     // Faça uma solicitação GET para o endpoint
    //     const response = await request(app).get(`${baseURL}/agents/agentId`);

    //     // Verifique o status da resposta
    //     expect(response.status).toBe(500);
    // });
});