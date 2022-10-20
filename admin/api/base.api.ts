import { NuxtAxiosInstance } from "@nuxtjs/axios";

export abstract class BaseAPI {
    protected $axios: NuxtAxiosInstance;
    protected adminKey: string

    constructor(axios: NuxtAxiosInstance, adminKey: string) {
        this.$axios = axios
        this.adminKey = adminKey
    }
}

export function authValidate($axios: NuxtAxiosInstance) {
    return async function (key: string) {
        const { status } = await $axios.post(
            "/auth/validate",
            {},
            {
                headers: {
                    Authorization: `Bearer ${key}`,
                },
            }
        );
        return status == 200
    }
}