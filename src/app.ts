import express, { Application } from 'express'
import agentRoutes from './routes/agentRoutes'
import health from './routes/healthRoutes'
import mongoose from 'mongoose';


const app: Application = express();
const PORT: number = 3002;

app.use(express.json())

// Conecta ao MongoDB
mongoose.connect('mongodb://root:root@127.0.0.1:27017?directConnection=true&serverSelectionTimeoutMS=2000', {
    user: 'root',
    pass: 'root',
    appName: 'agents server'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB!');
});

app.use('/v1', health)
app.use('/v1/public', agentRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

export default app;