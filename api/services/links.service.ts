import { Links } from '../entity/links.entity'

export class LinksService {

    static async getLinks() {
        const links = await Links.find({ select: ['id', 'name', 'link'] })
        return links
    }

    static async getImageLink(name: string) {
        try {
            const link = await Links.findOne({ where: { name } })
            return {
                type: link?.type,
                blob: Buffer.from(link?.icon as string, 'base64')
            }
        } catch (error) {
            throw new Error('domain error')
        }

    }

    static async createLink(name: string, link: string, data: Buffer, iconname: string) {
        try {
            const type: string = iconname.split('.').pop() as string
            await Links.upsert({ name, link, type, icon: data.toString('base64') }, { conflictPaths: ['name'] })
            return { status: 'ok' }
        } catch (error) {
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