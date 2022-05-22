import express from "express"
import summaryRouter from "../routes/summary.router"
import intructionsRouter from "../routes/instructions.router"
import booksRouter from "../routes/books.router"
import morgan from "morgan"
import cors from "cors"

const app = express()
app.set('port', 3000)
app.use(morgan(':date[iso] :remote-addr :method :url :status :response-time ms'));

app.use(cors())
app.use('/summary', summaryRouter)
app.use('/intructions', intructionsRouter)
app.use('/books', booksRouter)

export default app