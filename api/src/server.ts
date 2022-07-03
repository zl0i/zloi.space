import express from "express"
import fileUpload from "express-fileupload"
import morgan from 'morgan';
import summaryRouter from "../routes/summary.router"
import intructionsRouter from "../routes/instructions.router"
import booksRouter from "../routes/books.router"
import authRouter from "../routes/auth.router"

const app = express()
app.set('port', 3000)

app.get('/health-check', (_req, res) => {
    res.end()
})

app.use(morgan(':date[iso] :remote-addr :method :url :status :response-time ms'));

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', "*")
    next()
})

app.use(express.json());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use('/auth', authRouter)
app.use('/summary', summaryRouter)
app.use('/instructions', intructionsRouter)
app.use('/books', booksRouter)

export default app