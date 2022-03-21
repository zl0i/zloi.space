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
import Vue from "vue";
import Header from "../components/Header.vue";
import Welcome from "../components/Welcome.vue";
import Summary from "../components/Summary.vue";
import KnoweledgeView from "../components/Knowledge.vue";
import BooksView from "../components/BooksView.vue";

export default Vue.extend({
  data() {
    return {
      summary: {},
      links: [],
      about: "",
      titles: [],
      instructions: [],
      books: [],
    };
  },
  head() {
    return {
      title: "Дмитрий Попов",
    };
  },
  components: {
    Header,
    Welcome,
    Summary,
    KnoweledgeView,
    BooksView,
  },
  methods: {
    async setLanguage(locale: string) {
      this.$i18n.setLocale(locale);
      this.$axios.get(`/summary.${locale}.json`).then((res: any) => {
        this.about = res.data.about;
        this.titles = res.data.titles;
        this.links = res.data.links;
        this.summary = res.data.summary;
      });
    },
  },
  async asyncData({ $axios, i18n }) {
    const responce = await Promise.all([
      $axios.get(
        `http://localhost:3000/summary.${i18n.getLocaleCookie() ?? "en"}.json`
      ),
      $axios.get("http://localhost:3000/api/knowledgebase"),
      $axios.get("http://localhost:3000/api/reads"),
    ]);
    return {
      about: responce[0].data.about,
      titles: responce[0].data.titles,
      links: responce[0].data.links,
      summary: responce[0].data.summary,
      instructions: responce[1].data,
      books: responce[2].data,
    };
  },
});
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