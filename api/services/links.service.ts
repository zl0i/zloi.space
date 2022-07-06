import { Links } from '../entity/links.entity'

export class LinksService {

    static async getLinks() {
        const links = await Links.find({ select: ['id', 'name', 'link', 'blob'] })
        for(const link of links) {
            link.blob = link.blob.toString()
        }
        return links
    }

    static async getImageLink(name: string) {
        try {
            const link = await Links.findOne({ where: { name } })
            if (!link) {
                return {
                    type: "*",
                    blob: ""
                }
            }
            return {
                type: '*',
                blob: Buffer.from(link.blob).toString()
            }
        } catch (error) {
            throw new Error('domain error')
        }

    }

    static async createLink(name: string, link: string, blob: string) {
        try {
            await Links.upsert({ name, link, blob }, { conflictPaths: ['name'] })
            return { status: 'ok' }
        } catch (error) {
            console.log(error)
            throw new Error('domain error')
        }
    }

    static async deleteLink(name: string) {
        try {
            await Links.delete({ name })
            return { status: 'ok' }
        } catch (error) {
            throw new Error('domain error')
        }
    }
}