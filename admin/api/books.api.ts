import { BaseAPI } from "./base.api";

export class BooksApi extends BaseAPI {
    async get() {
        const { data } = await this.context.$axios.get("/books");
        return data
    }

    async add(link: string) {
        const { data } = await this.context.$axios.post(
            "/books",
            {
                link
            },
            {
                headers: {
                    Authorization:  (<any>this.context.$auth.strategies['keycloak']).token.get(),
                },
            }
        );
        return data
    }

    async update(id: number, status: string) {
        const { data } = await this.context.$axios.patch(
            `/books/${id}`,
            {
                status
            },
            {
                headers: {
                    Authorization: (<any>this.context.$auth.strategies['keycloak']).token.get(), //TODO: Property 'token' does not exist on type 'Scheme<SchemeOptions>
                },
            }
        );
        return data
    }

    async delete(id: number) {
        const { data } = await this.context.$axios.delete(
            `/books/${id}`,
            {
                headers: {
                    Authorization:  (<any>this.context.$auth.strategies['keycloak']).token.get(),
                },
            }
        );
        return data
    }
}