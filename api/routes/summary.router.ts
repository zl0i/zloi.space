import express, { Router } from 'express'
import { auth } from '../middleware/auth'
import { SummaryService } from '../services/summary.service'

const router = Router()


router.get('/', async (req, res) => {
  try {
    const { language } = req.query as any
    const data = await SummaryService.get(language)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.post('/', [auth()], async (req: express.Request, res: express.Response) => {
  try {
    const { lang, summary } = req.body as any
    const data = await SummaryService.update(lang, summary)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.get('/langs', async (_req, res) => {
  try {
    const data = await SummaryService.getLangs()
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.get('/about', async (req, res) => {
  try {
    const { language } = req.query
    const data = await SummaryService.getAbout(language as string)
    res.json(data)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.post('/about', [auth()], async (req: express.Request, res: express.Response) => {
  try {
    const { lang, titles, about } = req.body
    console.log(req.body)
    const status = await SummaryService.updateAbout(lang, titles, about)
    res.json({ status })
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

export default router

