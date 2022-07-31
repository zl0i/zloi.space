import express, { Router } from 'express'
import { auth } from '../middleware/auth'
import { InstructionsService } from '../services/instruction.service'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const inst = await InstructionsService.get()
    res.json(inst)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.post('/', [auth()], async (_req: express.Request, res: express.Response) => {
  try {
    const inst = await InstructionsService.update()
    res.json(inst)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})


export default router

