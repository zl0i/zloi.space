import { AppDataSource } from "./src/db"
import objectStorage from './src/storage'
import app from "./src/server"

const DEPLOY_TIER = process.env['DEPLOY_TIER'] ?? 'dev'


async function run() {
    try {
        await AppDataSource.initialize()
        console.log('[OK] DB is connected');
        const exist = await objectStorage.bucketExists(`zloi-web-${DEPLOY_TIER}`)
        if (!exist) {
            await objectStorage.makeBucket(`zloi-web-${DEPLOY_TIER}`)
        }
        console.log('[OK] Object Storage is connected');
        //TODO: Check exist pdf summary
        app.listen(3000, () => {
            console.log(`[OK] Server is started om ${app.get('port')} port!`)
        })

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

run()


