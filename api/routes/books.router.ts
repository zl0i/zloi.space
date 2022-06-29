import { Router } from 'express'
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

export default router

