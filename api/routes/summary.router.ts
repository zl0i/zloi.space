import { Router } from 'express'
import { SummaryService } from '../services/summary.service'

const router = Router()


router.get('/', async (req, res) => {
  try {
    const { position, language } = req.query as any
    const data = await SummaryService.get(position, language)
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

router.post('/about', async (req, res) => {
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

