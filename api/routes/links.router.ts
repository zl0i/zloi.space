import { Router } from 'express'
import { UploadedFile } from 'express-fileupload'
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
    res.setHeader('Content-Type', `image/${data.type}`)
    res.end(data.blob)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.post('/:name', async (req, res) => {
  try {
    const file = req.files?.['icon'] as UploadedFile
    const data = await LinksService.createLink(req.params.name, req.body.link, file.data, file.name)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})


router.delete('/:name', async (req, res) => {
  try {
    const data = await LinksService.deleteLink(req.params.name)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

export default router

