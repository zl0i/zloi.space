import express, { Router } from 'express'
import { auth } from '../middleware/auth'
import { LinksService } from '../services/links.service'

const router = Router()

router.get('/', async (_req, res) => {
    try {
        const data = await LinksService.get()
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

router.get('/image/:name', async (req, res) => {
    try {
        const data = await LinksService.getImage(req.params.name)
        res.setHeader('Content-Type', `image/png`)
        res.end(data.blob)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

router.post('/', [auth()], async (req: express.Request, res: express.Response) => {
    try {
        const { name, blob, link } = req.body
        const data = await LinksService.create(name, link, blob)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

router.patch('/:id', [auth()], async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { name, blob, link } = req.body
        const data = await LinksService.update(Number(id), name, link, blob)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

router.delete('/:id', [auth()], async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const data = await LinksService.delete(Number(id))
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

export default router

