import { Router } from 'express'
import { InstructionsService } from '../services/instruction.service'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const inst = await InstructionsService.get()
    res.json(inst)
  } catch (error) {
    res.status(500).end("internal error")
  }
})

export default router

