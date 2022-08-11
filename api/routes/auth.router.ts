import { Router } from 'express'
import { auth } from '../middleware/auth'

const router = Router()


router.post('/validate', auth(), async (_req, res) => {
    try {
        res.json({ result: 'ok' })
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

export default router

