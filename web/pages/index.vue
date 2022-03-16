<template>
  <div>
    <Header @changeLanguage="setLanguage"></Header>
    <Welcome :text="about" :titles="titles" :links="links"></Welcome>
    <Summary id="summary" :summary="summary"></Summary>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "../components/Header.vue";
import Welcome from "../components/Welcome.vue";
import Summary from "../components/Summary.vue";

export default Vue.extend({
  name: "test",
  data() {
    return {
      summary: {},
      links: [],
      about: {},
      titles: [],
    };
  },
  head() {
    return {
      title: "Дмитрий Попов",
      meta: [
        {
          name: "description",
          content: "My custom description",
        },
      ],
    };
  },
  components: {
    Header,
    Welcome,
    Summary,
  },
  methods: {
    setLanguage(_locale: string) {},
  },
  async asyncData({ $axios }) {
    const res = await $axios.get("http://localhost:3000/summary.en.json"); //TODO: rewrite to ./summary.{{locale}}.json
    return {
      about: res.data.about,
      titles: res.data.titles,
      links: res.data.links,
      summary: res.data.summary,
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