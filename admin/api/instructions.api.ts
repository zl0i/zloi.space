import { BaseAPI } from "./base.api";

export class InstructionsAPI extends BaseAPI {
    async updateAll() {
        const { data } = await this.$axios.post(
            `/instructions`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${this.adminKey}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return data
    }
}