<template>
  <div>
    <Header @changeLanguage="setLanguage"></Header>
    <Welcome :text="about" :titles="titles" :links="links" />
    <Summary id="summary" :summary="summary" />
    <div class="gallery-box">
      <KnoweledgeView id="knowledge" />
      <BookView id="reads" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import Welcome, { ILink } from "./components/Welcome.vue";
import Header from "./components/Header.vue";
import Summary from "./components/Summary.vue";
import KnoweledgeView from "./components/Knowledge.vue";
import BookView from "./components/BooksView.vue";
import { i18n } from "./i18n";

@Options({
  components: {
    Header,
    Welcome,
    Summary,
    KnoweledgeView,
    BookView,
  },
})
export default class App extends Vue {
  about: string = "";
  titles: string[] = [];
  links: ILink[] = [];
  summary: unknown = [];
  isShowLanguage: boolean = false;

  parse(data: any) {
    this.about = data.about;
    this.titles = data.titles;
    this.links = data.links;
    this.summary = data.summary;
  }

  created() {
    axios
      .get("summary.en.json")
      .then((res) => {
        this.parse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setLanguage(locale: typeof i18n.global.locale) {
    i18n.global.locale = locale;
    axios
      .get(`summary.${locale}.json`)
      .then((res) => {
        this.parse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");

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
  width: 6px;
}

body::-webkit-scrollbar-thumb {
  background-color: #454545;
  border-radius: 20px;
}
</style>


