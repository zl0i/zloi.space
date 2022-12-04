import { BaseAPI } from "./base.api";


export class LinksAPI extends BaseAPI {
    async pull() {
        const { data } = await this.context.$axios.get("/links");
        return data
    }
    async push(name: string, link: string, blob: string) {
        const { data } = await this.context.$axios.post(
            `/links/`,
            {
                name: name,
                blob: blob,
                link: link,
            }
        );
        return data
    }
    async patch(id: number, name: string, link: string, blob: string) {
        const { data } = await this.context.$axios.patch(
            `/links/${id}`,
            {
                name: name,
                blob: blob,
                link: link,
            }
        );
        return data
    }
    async delete(id: number) {
        await this.context.$axios.delete(`/links/${id}`);
    }
}