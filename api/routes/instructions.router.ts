import Crypto from 'crypto'
import express, { Router } from 'express'
import { auth } from '../middleware/auth'
import { InstructionsService } from '../services/instruction.service'


const GITHUB_SECRET_WEBHOOK = process.env['GITHUB_SECRET_WEBHOOK'] ?? ''

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

router.post('/github', async (req: express.Request, res: express.Response) => {
  try {
    const hmac = Crypto.createHmac('sha256', GITHUB_SECRET_WEBHOOK)
    hmac.update(JSON.stringify(req.body));
    const calculatedSignature = 'sha256=' + hmac.digest('hex');
    
    console.log(req.body)
    console.log(calculatedSignature, req.headers['x-hub-signature-256'])

    if (req.headers['x-hub-signature-256'] === calculatedSignature) {
      console.log('all good');
      await InstructionsService.update()
    } else {
      console.log('not good');
    }
    res.end()
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})


export default router

