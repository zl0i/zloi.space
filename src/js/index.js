const app = Vue.createApp({
  data() {
    return {
      knowledge: [],
      isOpenDialog: false,
      titleDialog: "",
      textDialog: "",
      books: [],
    };
  },
  methods: {
    marked(text) {
      return marked.marked(text);
    },
    openDialog(item) {
      this.textDialog = this.marked(item.data);
      this.titleDialog = item.name;
      document.body.style["overflow-y"] = "hidden";
      this.isOpenDialog = true;
    },
    closeDialog() {
      document.body.style["overflow-y"] = "auto";
      this.isOpenDialog = false;
    },
    sortByName(a, b) {
      return a.name.localeCompare(b.name);
    },
  },
  computed: {
    sortKnowledge() {
      return this.knowledge.sort(this.sortByName);
    },
    sortBooks() {
      const read = this.books.filter((item) => item.read);
      const unread = this.books.filter((item) => !item.read);
      return [...read.sort(this.sortByName), ...unread.sort(this.sortByName)];
    },
  },
  created() {
    axios
      .get("https://api.github.com/repos/zl0i/KnowledgeBase/contents")
      .then((res, err) => {
        for (const file of res.data) {
          if (file.name.includes(".md")) {
            axios
              .get(file.download_url)
              .then((res2, err) => {
                this.knowledge.push({
                  id: file.sha,
                  name: file.name,
                  data: res2.data,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(window.location.href + "/reads.json")
      .then((res, _err) => {
        for (const book of res.data) {
          axios
            .get(book.link)
            .then((res2, err) => {
              this.books.push({
                id: res2.data.id,
                name: res2.data.volumeInfo.title,
                image:
                  res2.data.volumeInfo?.imageLinks?.thumbnail ??
                  "images/default-image-book.png",
                read: book.read,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const formula = {
      name: "formula",
      level: "inline",
      start(src) {
        return src.match(/\$\$\n.*?\s{0,}\$\$/)?.index;
      },
      tokenizer(src, tokens) {
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
      renderer(token) {
        return token.raw;
      },
    };

    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
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
  },
});
const vm = app.mount("#app");

new Typed(".auto-input", {
  strings: [
    "My name is Dima",
    "I write code in JS and C++",
    "I'm backend developer",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
});
