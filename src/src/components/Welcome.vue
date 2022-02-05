<template>
  <div class="screen">   
    <div class="input">
      <span class="auto-input"></span>
    </div>
    <main class="text-box">
      <p>{{ text }}</p>
      <ul>
        <li v-for="item in links" :key="item.link">
          <a class="SNLink" :href="item.link"> <img :src="item.image" /></a>
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

img {
  pointer-events: none;
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

.SNLink {
  display: block;
  height: 40px;
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
  font-size: 65px;
  font-weight: bold;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

@media (max-device-width: 736px) {
  .input {
    height: 160px;
    font-size: 22px;
  }
}
</style>