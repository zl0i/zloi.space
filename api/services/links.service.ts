import { Links } from '../entity/links.entity'

export class LinksService {

    static async get() {
        const links = await Links.find({ select: ['id', 'name', 'link', 'blob'] })
        for (const link of links) {
            link.blob = link.blob.toString()
        }
        return links
    }

    static async getImage(name: string) {
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

    static async create(name: string, url: string, blob: string) {
        try {
            const link = await Links.insert({ name, link: url, blob })
            return { status: 'ok', id: link.raw[0].id }
        } catch (error) {
            console.log(error)
            throw new Error('domain error')
        }
    }

    static async update(id: number, name: string, link: string, blob: string) {
        try {
            await Links.update({ id: id }, { name, link, blob })
            return { status: 'ok' }
        } catch (error) {
            console.log(error)
            throw new Error('domain error')
        }
    }

    static async delete(id: number) {
        try {
            await Links.delete({ id })
            return { status: 'ok' }
        } catch (error) {
            throw new Error('domain error')
        }
    }
}