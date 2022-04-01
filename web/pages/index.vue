<template>
  <div>
    <Header @changeLanguage="setLanguage"></Header>
    <Welcome></Welcome>
    <Summary id="summary"></Summary>
    <KnoweledgeView
      id="knowledge"
      :instructions="instructions"
    ></KnoweledgeView>
    <BooksView id="reads" :books="books"></BooksView>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { MetaInfo } from "vue-meta";

@Component({
  head(this: Index): MetaInfo {
    return {
      title: "Дмитрий Попов",
    };
  },
  async asyncData({ $axios, i18n, store }) {
    const responce = await Promise.all([      
      $axios.get("/api/knowledgebase"),
      $axios.get("/api/reads"),
    ]);
    await store.dispatch("summary/requestSummary", 'en')
    store.commit("instructions/of", responce[0].data);
    return {      
      instructions: responce[0].data,
      books: responce[1].data,
    };
  },
})
export default class Index extends Vue {  
  instructions: any = [];
  books: any = [];

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
