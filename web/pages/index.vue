<template>
  <div>
    <Header @changeLanguage="setLanguage"></Header>
    <Welcome :text="about" :titles="titles" :links="links"></Welcome>
    <Summary id="summary" :summary="summary"></Summary>
    <KnoweledgeView
      id="knowledge"
      :instructions="instructions"
    ></KnoweledgeView>
    <BooksView id="reads" :books="books"></BooksView>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace, State } from "nuxt-property-decorator";
import { MetaInfo } from "vue-meta";

@Component({
  head(this: Index): MetaInfo {
    return {
      title: "Дмитрий Попов",
    };
  },
  async asyncData({ $axios, i18n, store }) {
    const responce = await Promise.all([
      $axios.get(
        `http://localhost:3000/summary.${i18n.getLocaleCookie() ?? "en"}.json`
      ),
      $axios.get("http://localhost:3000/api/knowledgebase"),
      $axios.get("http://localhost:3000/api/reads"),
    ]);
    store.commit("instructions/of", responce[1].data);
    return {
      about: responce[0].data.about,
      titles: responce[0].data.titles,
      links: responce[0].data.links,
      summary: responce[0].data.summary,
      instructions: responce[1].data,
      books: responce[2].data,
    };
  },
})
export default class Index extends Vue {
  summary: any = {};
  links: any = [];
  about: string = "";
  titles: string[] = [];
  instructions: any = [];
  books: any = [];

  async setLanguage(locale: string) {
    this.$i18n.setLocale(locale);
    this.$axios.get(`/summary.${locale}.json`).then((res: any) => {
      this.about = res.data.about;
      this.titles = res.data.titles;
      this.links = res.data.links;
      this.summary = res.data.summary;
    });
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
