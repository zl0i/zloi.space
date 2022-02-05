<template>
  <div class="screen">
    <div class="header">
      <nav>
        <a href="">
          <h1>_zloi_</h1>
        </a>
        <div class="header-right">
          <a href="#summary">Summary</a>
          <a href="#knowledge">Knowledge</a>
          <a href="#reads">Read</a>
        </div>
      </nav>
    </div>
    <div class="input">
      <span class="auto-input"></span>
    </div>
    <main class="text-box">
      <p>{{ text }}</p>
      <ul>
        <li v-for="item in links" :key="item.link">
          <a :href="item.link"> <img :src="item.image" /></a>
        </li>
      </ul>
    </main>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import Typed from "typed.js";

export interface ILink {
  image: string;
  link: string;
}

@Options({
  props: {
    text: String,
    titles: Array,
    links: Array,
  },
})
export default class Welcome extends Vue {
  text: string;
  titles: string[] = [];
  links: ILink[] = [];

  private typed: Typed;

  @Watch("titles")
  onTitlesChanged() {
    this.typed = new Typed(".auto-input", {
      strings: this.titles,
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

.header nav {
  text-align: right;
}
.header-right {
  flex: 1;
  font-size: 24px;
  letter-spacing: 1px;
}
@media (max-device-width: 736px) {
  .header-right {
    display: none;
  }
  .header nav a h1 {
    margin-bottom: 0;
  }
}
img {
  pointer-events: none;
}

.header-right a {
  margin-left: 40px;
  color: #ffffff;
}

.header-right a:hover {
  color: #94aadd;
}

.screen {
  min-height: 100vh;
  padding: 0 8.5%;
}

@media (max-device-width: 736px) {
  .screen {
    min-height: initial;
    margin-bottom: 50px;
  }
}

nav {
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px 0 10px;
}

nav a {
  text-decoration: none;
}

nav a h1 {
  font-family: "Permanent Marker";
  color: #fff;
  font-size: 40px;
}

.text-box {
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 26px;
  text-align: justify;
}

.text-box p {
  font-size: 17px;
  max-width: 630px;
}
.text-box ul {
  padding: 0px;
}

.text-box ul li {
  display: inline-block;
  list-style: none;
  margin-right: 20px;
}

@media (max-device-width: 736px) {
  .text-box ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .text-box ul li {
    margin: 0;
  }
}

.text-box ul li img {
  width: 32px;
  height: 32px;
}

.input {
  height: 300px;
  display: flex;
  align-items: flex-end;
}

.input span {
  font-size: 65px;
  font-weight: bold;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

@media (max-device-width: 736px) {
  .input {
    height: 160px;
  }
  .input span {
    font-size: 22px;
  }
}
</style>