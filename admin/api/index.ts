import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { authValidate } from './base.api'
import { BooksApi } from './books.api'
import { InstructionsAPI } from './instructions.api'
import { LinksAPI } from './links.api'
import { SummaryAPI } from './summary.api'


export interface API {
    authValidate: (key: string) => Promise<boolean>,
    links: LinksAPI,
    summary: SummaryAPI,
    instructions: InstructionsAPI,
    books: BooksApi
}

export function getAPI($axios: NuxtAxiosInstance, adminKey: string) {
    const linksAPI = new LinksAPI($axios, adminKey)
    const summaryAPI = new SummaryAPI($axios, adminKey)
    const instructionsApi = new InstructionsAPI($axios, adminKey)
    const booksApi = new BooksApi($axios, adminKey)

    const API: API = {
        authValidate: authValidate($axios),
        summary: summaryAPI,
        links: linksAPI,
        instructions: instructionsApi,
        books: booksApi
    }
    return API;
}