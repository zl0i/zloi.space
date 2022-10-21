import { BaseAPI } from "./base.api";

export class BooksApi extends BaseAPI {
    async get() {
        const { data } = await this.$axios.get("/books");
        return data
    }

    async add(link: string) {
        const { data } = await this.$axios.post(
            "/books",
            {
                link
            },
            {
                headers: {
                    Authorization: `Bearer ${this.state.adminKey}`,
                },
            }
        );
        return data
    }

    async update(id: number, status: string) {
        const { data } = await this.$axios.patch(
            `/books/${id}`,
            {
                status
            },
            {
                headers: {
                    Authorization: `Bearer ${this.state.adminKey}`,
                },
            }
        );
        return data
    }

    async delete(id: number) {
        const { data } = await this.$axios.delete(
            `/books/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${this.state.adminKey}`,
                },
            }
        );
        return data
    }
}