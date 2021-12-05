const app = Vue.createApp({
    data() {
        return {
            knowledge: [],
            isOpenDialog: false,
            titleDialog: '',
            textDialog: '',
            books: []
        }
    },
    methods: {
        marked(text) {
            return marked.marked(text)
        },
        openDialog(item) {
            this.textDialog = this.marked(item.data)
            this.titleDialog = item.name
            document.body.style['overflow-y'] = 'hidden'
            this.isOpenDialog = true
        },
        closeDialog() {
            document.body.style['overflow-y'] = 'auto'
            this.isOpenDialog = false
        }
    },
    created() {
        axios.get('https://api.github.com/repos/zl0i/KnowledgeBase/contents')
            .then((res, err) => {
                for (const file of res.data) {
                    if (file.name.includes('.md')) {
                        axios.get(file.download_url)
                            .then((res2, err) => {
                                this.knowledge.push({
                                    id: file.sha,
                                    name: file.name,
                                    data: res2.data
                                })
                            })
                            .catch(err => { console.log(err) })
                    }
                }
            })
            .catch(err => { console.log(err) })

        axios.get('https://zloi.space/reads.json')
            .then((res, _err) => {
                for (const book of res.data) {
                    axios.get(book.link)
                        .then((res2, err) => {
                            const obj = {
                                id: res2.data.id,
                                name: res2.data.volumeInfo.title,
                                image: res2.data.volumeInfo.imageLinks.thumbnail,
                                read: book.read
                            }
                            if (book.read) {
                                this.books.unshift(obj)
                            } else {
                                this.books.push(obj)
                            }
                        })
                        .catch(err => { console.log(err) })
                }
            })
            .catch(err => { console.log(err) })

        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            },
            pedantic: false,
            gfm: true,
            breaks: true,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
        });
    }
})
const vm = app.mount('#app')

new Typed(".auto-input", {
    strings: ["My name is Dima", "I write code in JS and C++", "I'm backend developer"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
})

const sliders = document.getElementsByClassName('list-summary');
for (let i = 0; i < sliders.length; i++) {
    let mouseDown, positionSlider, positionStart;
    sliders.item(i).addEventListener('mousedown', (e) => {
        mouseDown = true;
        positionSlider = sliders.item(i).scrollLeft;
        positionStart = e.clientX;
    });
    sliders.item(i).addEventListener('mouseup', () => mouseDown = false);
    sliders.item(i).addEventListener('mousemove', (e) => {
        if (mouseDown) sliders.item(i).scrollLeft = positionStart - e.clientX + positionSlider;
    });
}