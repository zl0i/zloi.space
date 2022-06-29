import { Instructions } from "../entity/instructions.entity";


export class InstructionsService {

    static async get() {
        const data = await Instructions.find({ select: ['id', 'name', "html"] }) ?? []
        return data.sort((a, b) => a.name.localeCompare(b.name))
    }
}