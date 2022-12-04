import { Context } from "@nuxt/types";

export abstract class BaseAPI {
    protected context: Context;

    constructor(context: Context) {
        this.context = context
    }
}