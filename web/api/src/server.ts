import express from "express"
import summaryRouter from "../routes/summary.router"
import intructionsRouter from "../routes/instructions.router"
import booksRouter from "../routes/books.router"
import authRouter from "../routes/auth.router"

const app = express()

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', "*")
    next()
})

app.use(express.json());
app.use('/auth', authRouter)
app.use('/summary', summaryRouter)
app.use('/intructions', intructionsRouter)
app.use('/books', booksRouter)

export default app