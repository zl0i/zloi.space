import { BaseAPI } from "./base.api";

export class InstructionsAPI extends BaseAPI {
    async updateAll() {
        const { data } = await this.context.$axios.post(`/instructions`);
        return data
    }
}