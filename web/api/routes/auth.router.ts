import { Router } from 'express'

const router = Router()


router.post('/validate', async (req, res) => {
    try {
        const { key } = req.body
        if (key === process.env["ADMIN_KEY"]) {
            res.json({ result: 'ok' })
        } else {
            res.status(401).json({ result: 'error' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

export default router

