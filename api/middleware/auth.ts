import express from "express"


export function auth() {
    return function (req: express.Request, res: express.Response, next: Function) {
        const { key } = req.body
        if (key === process.env["ADMIN_KEY"]) {
            next()
        } else {
            res.status(401).json({ result: 'Key is not correct' })
        }
    }
}


