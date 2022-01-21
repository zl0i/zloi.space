<template>
  <Welcome
    text="Hello. As written above, my name is Dima. I have been working
        professionally as a programmer since 2018. I have developed
        cross-platform mobile applications in Qt, but I discovered JS in 2020
        and fell in love with it. I love developing the backend part and
        everything that connected with it. I have experience in developing
        microservices, building CI/CD using GitLab and working with cloud
        providers (GCP)."
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Welcome from "./components/Welcome.vue";

@Options({
  components: {
    Welcome,
  },
})
export default class App extends Vue {
  title = [""];
}
</script>

<style>
* body {
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
</style>
