import { sequelize } from './src/db'
import app from "./src/server"

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is started on ${app.get('port')}!`)
})

sequelize.authenticate()
    .then(async _ => {
        console.log('[OK]DB is connected')
    })
    .catch(_ => {
        console.log('[ERROR]DB is\'not connected!')
    })


export default app
