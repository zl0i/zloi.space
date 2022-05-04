import { ServerMiddleware } from '@nuxt/types'
import { getInstructions, updateInstructions } from "~/src/db"


const serverMiddleware: ServerMiddleware = async function (req, res, next) {
    if (req.url == '/') {
        res.setHeader("Content-Type", "application/json")
        return res.end(JSON.stringify(await getInstructions()))
    } else if (req.url == '/push') {
        await updateInstructions()
        return res.end()
    }
    next()
}


export default serverMiddleware

