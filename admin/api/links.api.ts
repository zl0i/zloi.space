import { BaseAPI } from "./base.api";


export class LinksAPI extends BaseAPI {
    async pull() {
        const { data } = await this.$axios.get("/links");
        return data
    }
    async push(name: string, link: string, blob: string) {
        const { data } = await this.$axios.post(
            `/links/`,
            {
                name: name,
                blob: blob,
                link: link,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.adminKey}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return data
    }
    async patch(id: number, name: string, link: string, blob: string) {
        const { data } = await this.$axios.patch(
            `/links/${id}`,
            {
                name: name,
                blob: blob,
                link: link,
            },
            {
                headers: {
                    Authorization: `Bearer ${this.adminKey}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return data
    }
    async delete(id: number) {
        await this.$axios.delete(`/links/${id}`, {
            headers: {
                Authorization: `Bearer ${this.adminKey}`,
            },
        });
    }
}