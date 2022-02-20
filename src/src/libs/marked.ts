import { marked as Marked } from "marked";


const formula = {
    name: "formula",
    level: "inline",
    start(src: string) {
        return src.match(/\$\$\n.*?\s{0,}\$\$/)?.index;
    },
    tokenizer(src: string, _tokens: any) {
        const rule = /\$\$\n.*?\s{0,}\$\$/;
        const match = rule.exec(src);
        if (match) {
            const token = {
                type: "formula",
                raw: src.replace(
                    rule,
                    `<div class="formula">${match[0].replace(/\$/gm, "")}</div>`
                ),
                tokens: [],
            };
            return token;
        }
    },
    renderer(token: any) {
        return token.raw;
    },
};
Marked.setOptions({
    renderer: new Marked.Renderer(),
    langPrefix: "hljs language-",
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
});
Marked.use({ extensions: [formula] });

const loaded = import(
    /* webpackChunkName: "highlight.js" */ /* webpackPrefetch: -1 */ "highlight.js/lib/common"
).then((lib) => {
    const hljs = lib.default;
    Marked.setOptions({
        ...Marked.options,
        highlight: function (code: string, lang: string) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
    });
    return Marked
});

export default {
    marked: Marked,
    loaded
}

