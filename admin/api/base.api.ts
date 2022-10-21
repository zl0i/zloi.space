import { NuxtAxiosInstance } from "@nuxtjs/axios";

export abstract class BaseAPI {
    protected $axios: NuxtAxiosInstance;
    protected state: any

    constructor(axios: NuxtAxiosInstance, state: any) {
        this.$axios = axios
        this.state = state
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