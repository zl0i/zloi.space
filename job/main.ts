import { sequelize } from "./src/db";
import { updateInstructions } from "./src/instructions";

sequelize.authenticate()
    .then(async _ => {
        console.log('[OK]DB is connected')
        try {
            await sequelize.sync({ alter: true })
            await updateInstructions()
            console.log("[OK] Job finished")
            process.exit(0)
        } catch (error) {
            console.log(error)
        }
    })
    .catch(_ => {
        console.log('[ERROR]DB is\'not connected!')
    })

