import { Instructions } from "../entity/instructions.entity";


export class InstructionsService {

    static async get() {
        return await Instructions.findAll()
    }
}