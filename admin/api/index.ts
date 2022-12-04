import { Context } from '@nuxt/types'
import { BooksApi } from './books.api'
import { InstructionsAPI } from './instructions.api'
import { LinksAPI } from './links.api'
import { SummaryAPI } from './summary.api'


export interface API {
    links: LinksAPI,
    summary: SummaryAPI,
    instructions: InstructionsAPI,
    books: BooksApi
}


export function getAPI(context: Context) {
    const linksAPI = new LinksAPI(context)
    const summaryAPI = new SummaryAPI(context)
    const instructionsApi = new InstructionsAPI(context)
    const booksApi = new BooksApi(context)
    const API: API = {
        summary: summaryAPI,
        links: linksAPI,
        instructions: instructionsApi,
        books: booksApi
    }
    return API;
}