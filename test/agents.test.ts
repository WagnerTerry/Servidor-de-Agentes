import request from 'supertest';
import app from '../src/app'; // Substitua pelo caminho real do seu arquivo de configuração do Express
import Agent from '../src/models/Agent';

describe('GET /agents', () => {
    it('should get a list of agents', async () => {
        // Criar alguns agentes para simular dados no banco de dados
        await Agent.create([
            { name: 'Agent1', login: 'agent1', password: 'password123', domain: 'google.com' },
            { name: 'Agent2', login: 'agent2', password: 'password456', domain: 'google.com' },
            // Adicione mais agentes conforme necessário
        ]);

        // Fazer uma solicitação GET para a rota /agents
        const response = await request(app).get('/agents');

        // Verificar o status da resposta
        expect(response.status).toBe(200);

        // Verificar o corpo da resposta
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);

        // Verificar se os agentes têm as propriedades esperadas
        const agentProperties = ['name', 'login', 'password', 'domain'];
        response.body.forEach((agent: Record<string, any>) => {
            agentProperties.forEach(prop => {
                expect(agent).toHaveProperty(prop);
            });
        });
    });
});