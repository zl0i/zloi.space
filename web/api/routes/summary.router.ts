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

export default router

