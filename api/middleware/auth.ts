import express from "express"


export function auth() {
    return function (req: express.Request, res: express.Response, next: Function) {
        const key = req.headers.authorization?.split(" ")[1]
        if (key === process.env["ADMIN_KEY"]) {
            next()
        } else {
            res.status(401).json({ result: 'Key is not correct' })
        }
    }
}


