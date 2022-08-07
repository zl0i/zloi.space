import { Middleware } from '@nuxt/types'

const LogsMiddleware: Middleware = ({ req, res }) => {
    try {
        const anyReq: any = req
        console.log((new Date()).toISOString(),
            req?.method, req.url, res.statusCode,
            req.headers['user-agent'],
            anyReq.client._peername.address + ':' + anyReq.client._peername.port)
    } catch (error) {
        console.log(error)
    }
}

export default LogsMiddleware