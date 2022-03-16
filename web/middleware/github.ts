import { ServerMiddleware } from '@nuxt/types'

const serverMiddleware: ServerMiddleware = function (req, _res, next) {
    console.log(req.url)
    next()
}

export default serverMiddleware

