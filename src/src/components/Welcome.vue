<template>
  <div class="first-screen">
    <div class="header">
      <nav>
        <a href="">
          <h1>_zloi_</h1>
        </a>
        <div class="header-right">
          <a href="#summary-id">Summary</a>
          <a href="#knowledge-id">Knowledge</a>
          <a href="#reads-id">Read</a>
        </div>
      </nav>
    </div>
    <div class="input-div">
      <span class="auto-input"></span>
    </div>
    <main class="text-box">
      <p>{{ text }}</p>
      <ul>
        <li>
          <a href="https://gitlab.com/zl0i/"
            ><img src="../assets/gitlab.png"
          /></a>
        </li>
        <li>
          <a href="https://github.com/zl0i"
            ><img src="../assets/github.png"
          /></a>
        </li>
        <li>
          <a href="mailto: pdmitri07@gmail.com"
            ><img src="../assets/gmail.png"
          /></a>
        </li>
        <li>
          <a href="https://vk.com/dev_zloi"><img src="../assets/vk.png" /></a>
        </li>
        <li>
          <a href="https://t.me/zzloi"><img src="../assets/telegram.png" /></a>
        </li>
        <li>
          <a href="https://habr.com/ru/users/zl0i"
            ><img src="../assets/habr.png"
          /></a>
        </li>
      </ul>
    </main>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Typed from "typed.js";

@Options({
  props: {
    text: String,
    titles: Array,
  },
})
export default class Welcome extends Vue {
  text!: string;
  titles!: string[];

  mounted() {
    var options = {
      strings: [
        "My name is Dima",
        "I write code in JS and C++",
        "I'm backend developer",
      ],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    };
    new Typed(".auto-input", options);
  }
}
</script>

<style scoped>
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

.first-screen {
  min-height: 100vh;
  padding: 0 8.5%;
}

@media (max-device-width: 736px) {
  .first-screen {
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

.input-div {
  height: 300px;
  display: flex;
  align-items: flex-end;
}

.input-div span {
  font-size: 65px;
  font-weight: bold;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

@media (max-device-width: 736px) {
  .input-div {
    height: 160px;
  }
  .input-div span {
    font-size: 22px;
  }
}
</style>