<template>
  <div>
    <nuxt />
    <div class="footer-wrapper">
      <div class="footer">
        <h1>Dmitri <span class="taviraj">“zloi”</span> Popov</h1>
        <p>
          Created by <a href="https://zloi.space/">zl0i</a> and
          <a href="https://github.com/gossy4691">GoSSy4691</a> / Powered by
          <a href="https://nuxtjs.org/">Nuxt v2</a> / Run on
          <a href="https://k3s.io/">k3s</a>
        </p>
        <p>Copyright © 2021 - 2022 / Source</p>
      </div>
      <div class="button-to-up" @click="goToTop">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="39"
            height="39"
            rx="19.5"
            stroke="white"
            stroke-opacity="0.5"
          />
          <path
            d="M20 10L32.9904 25H7.00962L20 10Z"
            fill="white"
            fill-opacity="0.5"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LayoutDefault",
};
</script>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Footer extends Vue {
  goToTop() {
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
.footer-wrapper {
  height: 200px;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-size: 17px;
}

.footer a {
  color: white;
}

.footer * {
  margin: 10px 0;
}

.taviraj {
  font-family: "Taviraj";
  font-size: 32px;
}

.button-to-up {
  position: absolute;
  right: 36px;
  bottom: 20px;
}
</style>
