import express, { Router } from 'express'
import { SummaryService } from '../services/summary.service'
import { keycloak } from '../src/keycloak'

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

router.post('/', keycloak.protect(), async (req: express.Request, res: express.Response) => {
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

router.post('/about', keycloak.protect(), async (req: express.Request, res: express.Response) => {
  try {
    const { lang, titles, about } = req.body
    const status = await SummaryService.updateAbout(lang, titles, about)
    res.json({ status })
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.get('/pdf', async (req: express.Request, res: express.Response) => {
  try {
    const { language } = req.query as any
    const stream = await SummaryService.getPDF(language)
    stream.on('data', chunk => {
      res.write(chunk)
    })
    stream.on('end', () => {
      res.end()
    })
    stream.on('error', err => {
      console.log(err)
      res.status(500).end()
    })
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

export default router

