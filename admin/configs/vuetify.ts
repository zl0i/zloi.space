import { Options } from "@nuxtjs/vuetify"
import colors from 'vuetify/lib/util/colors'

const options: Options = {
    theme: {
        themes: {
            light: {
                primary: colors.red.darken1, // #E53935
                secondary: colors.red.lighten4, // #FFCDD2
                accent: colors.indigo.base, // #3F51B5
            },
        },
    },
}

export default options