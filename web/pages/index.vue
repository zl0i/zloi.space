<template>
  <div>
    <Header @changeLanguage="setLanguage"></Header>
    <Welcome></Welcome>
    <Summary id="summary"></Summary>
    <KnoweledgeView id="knowledge"></KnoweledgeView>
    <BooksView id="reads"></BooksView>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { MetaInfo } from "vue-meta";
import Header from "~/components/Header.vue";
import Welcome from "~/components/Welcome.vue";

@Component({
  head(this: Index): MetaInfo {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      title: "Дмитрий Попов",
    };
  },
  components: {
    Header,
    Welcome,
    Summary: () => import("~/components/Summary.vue"),
    KnoweledgeView: () => import("~/components/KnoweledgeView.vue"),
    BooksView: () => import("~/components/BooksView.vue"),
  },
  async asyncData({ i18n, store }) {
    await store.dispatch("summary/requestSummary", i18n.getLocaleCookie());
    await store.dispatch("instructions/requestInstructions");
    await store.dispatch("books/requestBooks");
  },
})
export default class Index extends Vue {
  async setLanguage(locale: string) {
    this.$i18n.setLocale(locale);
  }
}
</script>

<style>
body {
  background: #1c1e2a;
  opacity: 0.9;
  color: #ffffff;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overscroll-behavior: contain;
  overflow-x: hidden;
  margin: 0;
}

@media (max-device-width: 736px) {
  html,
  body {
    max-width: 100%;
    overflow-x: hidden;
  }
}

body::-webkit-scrollbar {
  display: none;
}
</style>
