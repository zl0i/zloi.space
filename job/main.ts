import { initBooks } from "./src/books";
import { sequelize } from "./src/db";
import { updateInstructions } from "./src/instructions";
import { initSummary } from "./src/summary";

const INITDB = process.env["INIT_DB"]

sequelize.authenticate()
    .then(async _ => {
        console.log('[OK]DB is connected')
        try {
            await sequelize.sync({ alter: true })
            await updateInstructions()
            if (INITDB) {
                await initBooks()
                await initSummary()
            }
            console.log("[OK] Job finished")
            process.exit(0)
        } catch (error) {
            console.log(error)
        }
    })
    .catch(_ => {
        console.log('[ERROR]DB is\'not connected!')
    })

