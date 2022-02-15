<template>
  <div class="instruction">
    <div class="image" @click.stop.prevent="this.$emit('open', name, html)">
      <div class="content" v-html="markedText(text)"></div>
    </div>
    <p class="name">{{ name }}</p>
  </div>
</template>


<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { marked } from "marked";
import hljs from "highlight.js/lib/common";

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

@Options({
  props: {
    name: String,
    text: String,
  },
})
export default class Instruction extends Vue {
  name: string;
  text: string;
  html: string;

  markedText(text: string) {
    this.html = marked(text);
    return this.html;
  }
}
</script>

<style scoped>
.instruction {
  width: 170px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  position: relative;
}

.image {
  align-self: flex-start;
  background: white;
  width: 100%;
  height: 250px;
  cursor: pointer;
  padding: 5px;
  overflow: hidden;
  user-select: none;
}

.content {
  width: calc(100% * 6.6);
  height: fit-content;
  margin-left: 0;
  background: white;
  color: #1a1a1a;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow: auto;
  padding: 20px;
  border-radius: 5px;
  transform: scale(0.15);
  transform-origin: left top;
}

.content * {
  pointer-events: none;
  user-select: none;
}

.name {
  margin-top: 10px;
  margin-bottom: 0;
  align-self: flex-end;
  text-align: center;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
}

.read-div {
  position: absolute;
  bottom: 78px;
  user-select: none;
  display: flex;
  width: 100%;
  background: linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #535353 90%);
  align-items: center;
  padding-bottom: 10px;
}

.read-div img {
  width: 30px;
  height: 30px;
  margin: 0 0 0 7px;
}

.read-div p {
  margin: 0 0 0 10px;
  text-align: center;
  font-size: 14px;
}

.book-name {
  margin-top: 7px;
  margin-bottom: 0;
  text-align: center;
  width: 100%;
  user-select: none;
}
</style>

<style>
strong {
  font-size: 16px;
  line-height: 26px;
  font-weight: 700;
}

pre {
  padding: 10px;
  display: flex;
  background-color: #f0f0f0;
  border-radius: 5px;
  max-width: max-content;
  overflow-x: auto;
}

code {
  padding: 10px;
  display: contents;
  background-color: #f0f0f0;
  border-radius: 5px;
  word-wrap: break-word;
  max-width: max-content;
  height: auto;
  overflow-x: auto;
}

.formula {
  font-family: "Cambria";
  font-style: italic;
  text-align: center;
  margin-bottom: 20px;
}
</style>