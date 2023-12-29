import express, {Application} from 'express'
import agentRoutes from './routes/agentRoutes'
import health from './routes/healthRoutes'

const app: Application = express();
const PORT: number = 3002;

app.use(express.json())

app.use('/v1', agentRoutes)
app.use('/v1', health)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})