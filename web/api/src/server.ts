import express from "express"
import summaryRouter from "../routes/summary.router"
import intructionsRouter from "../routes/instructions.router"
import booksRouter from "../routes/books.router"

const app = express()

app.use('/summary', summaryRouter)
app.use('/intructions', intructionsRouter)
app.use('/books', booksRouter)

export default app