<template>
  <div class="list-element">
    <div class="element-img" @click.stop="openDialog(name, text)">
      <div class="element-inner" v-html="markedText(text)"></div>
    </div>
    <p class="element-name">{{ name }}</p>
  </div>
</template>


<script lang="ts">
import { Vue, Options } from "vue-class-component";
import { marked } from "marked";
import hljs from "highlight.js";

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


@Options({
  props: {
    name: String,
    text: String,
  },
})
export default class Instruction extends Vue {
  name: string;
  text: string;

  openDialog(name: string, text: string) {}

  markedText(text: string) {
    return marked(text);
  }
}
</script>

<style scoped>
.list-element {
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

.element-img {
  align-self: flex-start;
  background: white;
  width: 100%;
  height: 250px;
  cursor: pointer;
  padding: 5px;
  overflow: hidden;
  user-select: none;
}

.element-inner {
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

.element-inner * {
  pointer-events: none;
  user-select: none;
}

.element-name {
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