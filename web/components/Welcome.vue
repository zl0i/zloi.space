<template>
  <div class="screen">
    <div class="input">
      <span class="auto-input"></span>
    </div>
    <main class="text-box">
      <p>{{ text }}</p>
      <ul>
        <li v-for="item in links" :key="item.link">
          <a class="contacts" :href="item.link"> <img :src="item.image" :alt="item.name" /></a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Watch,
  namespace,
} from "nuxt-property-decorator";
import Typed from "typed.js";
import {
  namespace as summaryStoreNamespace,
  SummaryState,
} from "../store/summary";

const SummaryStore = namespace(summaryStoreNamespace);

export interface ILink {
  image: string;
  link: string;
}

@Component
export default class Welcome extends Vue {
  private typed: Typed;

  @SummaryStore.State("titles") titles: SummaryState["titles"];
  @SummaryStore.State("about") text: SummaryState["about"];
  @SummaryStore.State("links") links: SummaryState["links"];

  mounted() {
    this.startTitles(this.titles);
  }

  @Watch("titles")
  onTitlesChanged() {
    if (this.typed) this.typed.destroy();
    this.startTitles(this.titles);
  }

  startTitles(strings: string[]) {
    this.typed = new Typed(".auto-input", {
      strings: strings,
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

.contacts {
  display: block;
  width: 32px;
  height: 32px;
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
