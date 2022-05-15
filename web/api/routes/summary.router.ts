import { Router } from 'express'
import { SummaryService } from '../services/summary.service'

const router = Router()


router.use('/', async (_req, res) => {
  try {
    const inst = await SummaryService.get()
    res.json(inst)
  } catch (error) {
    res.status(500).end("internal error")
  }
})

export default router

