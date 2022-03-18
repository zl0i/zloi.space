export default {
    locales: ["en", "ru"],
    defaultLocale: "en",
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: "locale",
        // redirectOn: "root",
        // alwaysRedirect: true,
    },
    skipSettingLocaleOnNavigate: true,
    vueI18n: {
        fallbackLocale: "ru",
        messages: {
            en: {
                headers: {
                    summary: "Summary",
                    knoweledge: "Knoweledge",
                    reads: "Reads",
                },
                summary: {
                    title: "Summary",
                    education: "Education",
                    courses: "Сourses",
                    experience: "Experience",
                    skills: "Skills",
                    tech_stack: "Tech stack",
                    achievements: "Achievements",
                },
                books: {
                    read: "Read",
                    reading: "While reading",
                },
            },
            ru: {
                headers: {
                    summary: "Резюме",
                    knoweledge: "База знаний",
                    reads: "Книги",
                },
                summary: {
                    title: "Резюме",
                    education: "Образование",
                    courses: "Курсы",
                    experience: "Опыт работы",
                    skills: "Скиллы",
                    tech_stack: "Технический стeк",
                    achievements: "Достижения",
                },
                books: {
                    read: "Прочитано",
                    reading: "В процессе",
                },
            },
        },
    },
}