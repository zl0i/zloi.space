import express, { Router } from 'express'
import { auth } from '../middleware/auth'
import { BooksService } from '../services/books.service'

const router = Router()


router.get('/', async (_req, res) => {
  try {
    const books = await BooksService.get()
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.post('/', [auth()], async (req: express.Request, res: express.Response) => {
  try {
    const { link } = req.body
    const books = await BooksService.create(link)
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.patch('/:id', [auth()], async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const books = await BooksService.update(Number(id), status)
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

router.delete('/:id', [auth()], async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const books = await BooksService.delete(Number(id))
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).end("internal error")
  }
})

export default router

