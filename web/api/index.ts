import { sequelize } from './src/db'
import app from "./src/server"

app.listen(() => {
    console.log("[OK] Server is started!")
})

sequelize.authenticate()
    .then(async _ => {
        console.log('[OK]DB is connected')
    })
    .catch(_ => {
        console.log('[ERROR]DB is\'not connected!')
    })


export default app
