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


export function getAPI($axios: NuxtAxiosInstance, state: any) {
    const linksAPI = new LinksAPI($axios, state)
    const summaryAPI = new SummaryAPI($axios, state)
    const instructionsApi = new InstructionsAPI($axios, state)
    const booksApi = new BooksApi($axios, state)
    const API: API = {
        authValidate: authValidate($axios),
        summary: summaryAPI,
        links: linksAPI,
        instructions: instructionsApi,
        books: booksApi
    }
    return API;
}