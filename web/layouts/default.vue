<template>
  <div>
    <nuxt />
    <div class="footer">
      <div class="footer-content">
        <h1>Dmitri <span class="nickname">"zloi"</span> Popov</h1>
        <p>
          Created by <a href="https://zloi.space/">zl0i</a> and
          <a href="https://github.com/gossy4691">GoSSy4691</a> /
          <br />
          Powered by <a href="https://nuxtjs.org/">Nuxt v2</a> /
          <br />
          Run on <a href="https://k3s.io/">k3s</a>
        </p>
        <p>
          Copyright © 2021 - {{ new Date().getFullYear() }} /
          <a href="https://gitlab.com/zl0i/zloi-space">Source</a>
        </p>
      </div>
      <button class="button-to-up" @click="goToTop">
        <img alt="goTop" src="~/static/img/button-to-up.svg" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  name: "LayoutDefault",
  middleware: "logs",
})
export default class Default extends Vue {
  goToTop() {
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
.footer {
  margin-top: 120px;
  height: 200px;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-size: 17px;
  text-align: center;
}

.footer-content a {
  color: white;
}

.footer-content * {
  margin: 10px 0;
}

.footer-content p br {
  display: none;
}

.nickname {
  font-family: "Taviraj";
  font-size: 32px;
}

.button-to-up {
  position: absolute;
  right: 36px;
  bottom: 20px;
  background: none;
  cursor: pointer;
  border: none;
}

@media (max-device-width: 736px) {
  .footer-content {
    font-size: 14px;
  }
  .footer h1 {
    font-size: 25px;
  }
  .nickname {
    font-size: 26px;
  }
  .button-to-up {
    display: none;
  }
  .footer-content p br {
    display: block;
  }
}
</style>