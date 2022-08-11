import { AppDataSource } from "./src/db"
import app from "./src/server"

AppDataSource.initialize()
    .then(() => {
        console.log('[OK] DB is connected');
    })
    .catch((err) => {
        console.error('[ERROR] DB isn\'t connected');
        console.error(err.message);
        process.exit(1);
    })

app.listen(3000, () => {
    console.log(`[OK] Server is started om ${app.get('port')} port!`)
})

