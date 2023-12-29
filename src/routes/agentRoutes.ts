import express, {Router, Request, Response} from 'express'
const {v4: uuidv4} = require('uuid')

const router: Router = express.Router();

router.get('/agents', (req: Request, res: Response) => {
    res.send("API ok agents")
})

router.post('/agents', (req: Request, res:Response) => {
    const {name, login, medias, password} = req.body;

    const id = uuidv4()

    res.json({
        name,
        login,
        medias,
        id,
        domain: "domain" 
    })
})

export default router