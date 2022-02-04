<template>
  <div>
    <Welcome :text="about" :titles="titles" :links="links" />
    <Summary :summary="summary"/>
    <div class="gallery-box">
      <KnoweledgeView />
      <BookView />
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

  parse(data: any) {
    this.about = data.about;
    this.titles.push(...data.titles);
    this.links.push(...data.links);
    this.summary = data.summary
    console.log(this.titles);
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
  width: 6px;
}

body::-webkit-scrollbar-thumb {
  background-color: #454545;
  border-radius: 20px;
}

.gallery-box {
  min-height: 100vh;
}
</style>
