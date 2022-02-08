<template>
  <div>
    <div class="header">
      <nav>
        <a href="#">
          <h1>_zloi_</h1>
        </a>
        <div class="header-links">
          <a href="#summary">{{ $t("headers.summary") }}</a>
          <a href="#knowledge">{{ $t("headers.knoweledge") }}</a>
          <a href="#reads">{{ $t("headers.reads") }}</a>
          <div class="language">
            <span>Translate</span>
            <img alt="arrow" src="./assets/arrow-down.svg" />
            <div class="language-popup">
              <span @click="setLanguage('ru')">Русский</span>
              <span @click="setLanguage('en')">English</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
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
import Summary from "./components/Summary.vue";
import KnoweledgeView from "./components/Knowledge.vue";
import BookView from "./components/BooksView.vue";
import { i18n} from "./i18n";

@Options({
  components: {
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
    this.links.push(...data.links);
    this.summary = data.summary;
  }

  created() {
    axios
      .get("summary.ru.json")
      .then((res) => {
        this.parse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setLanguage(locale: typeof i18n.global.locale) {
    i18n.global.locale = locale
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

<style scoped>
.gallery-box {
  min-height: 100vh;
}
.header {
  padding: 0 8.5%;
}

.header nav {
  text-align: right;
}

.header-links {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 1;
  font-size: 24px;
  letter-spacing: 1px;
}
@media (max-device-width: 736px) {
  .header-links {
    display: none;
  }
  .header nav a h1 {
    margin-bottom: 0;
  }
}

.header-links > * {
  margin-left: 40px;
  color: #ffffff;
}

.header-links a:hover, span:hover {
  color: #94aadd;
}

.header-links * {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.language {
  width: fit-content;
  margin-left: 40px;
}

.language-popup {
  display: none;
  position: absolute;
  background: #1C1E2A;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.75);
  border-radius: 2px;
  margin-top: 10px;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
  padding: 0.6rem 1.5rem 0.6rem 1.25rem;
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
</style>
