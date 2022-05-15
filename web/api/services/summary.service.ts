import { Summary } from '../entity/summary.entity'

export class SummaryService {

    static async get() {
        return await Summary.findAll()
    }
}