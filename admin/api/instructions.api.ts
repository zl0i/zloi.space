import { BaseAPI } from "./base.api";

export class InstructionsAPI extends BaseAPI {
    async updateAll() {
        const { data } = await this.context.$axios.post(
            `/instructions`,
            {},
            {
                headers: {
                    Authorization:  (<any>this.context.$auth.strategies['keycloak']).token.get(),
                    "Content-Type": "application/json",
                },
            }
        );
        return data
    }
}