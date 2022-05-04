import { ServerMiddleware } from '@nuxt/types'
import { getBooks } from "~/src/db"



const serverMiddleware: ServerMiddleware = async function (req, res, next) {
    if (req.url == '/') {
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify(await getBooks()))
    }
    next()
}

export default serverMiddleware