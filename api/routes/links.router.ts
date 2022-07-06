import express, { Router } from 'express'
import { auth } from '../middleware/auth'
import { LinksService } from '../services/links.service'

const router = Router()

router.get('/', async (_req, res) => {
    try {
        const data = await LinksService.getLinks()
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

router.get('/image/:name', async (req, res) => {
    try {
        const data = await LinksService.getImageLink(req.params.name)
        res.setHeader('Content-Type', `image/png`)
        res.end(data.blob)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

router.post('/:name', [auth()], async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params
        const { blob, link } = req.body
        const data = await LinksService.createLink(name as string, link, blob)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})


router.delete('/:name', [auth()], async (req: express.Request, res: express.Response) => {
    try {
        const { name } = req.params
        const data = await LinksService.deleteLink(name as string)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).end("internal error")
    }
})

export default router

