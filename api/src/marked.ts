import { marked } from "marked";
import hljs from "highlight.js"

const formula = {
    name: "formula",
    level: "inline",
    start(src: string) {
        return src.match(/\$\$\n.*?\s{0,}\$\$/)?.index;
    },
    tokenizer(src: string, _tokens: any) {
        const rule = /\$\$\n.*?\s{0,}\$\$/;
        const match = rule.exec(src);
        if (match && match[0]) {
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
        return undefined
    },
    renderer(token: any) {
        return token.raw;
    },
};
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code: string, lang: string) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-",
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
});
marked.use({ extensions: [formula] });


export default marked

