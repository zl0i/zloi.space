import { Instructions } from "../entity/instructions.entity";


export class InstructionsService {

    static async get() {
        const data = await Instructions.findAll() ?? []
        return data.sort((a, b) => a.name.localeCompare(b.name))
    }
}