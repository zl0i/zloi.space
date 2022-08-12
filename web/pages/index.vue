<template>
  <div>
    <Header @changeLanguage="setLanguage"></Header>
    <Welcome></Welcome>
    <Summary id="summary"></Summary>
    <KnoweledgeView id="knowledge"></KnoweledgeView>
    <BooksView id="reads"></BooksView>
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
          Copyright © 2021 - 2022 /
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
import { Component, Vue } from "nuxt-property-decorator";
import { MetaInfo } from "vue-meta";
import Header from "~/components/Header.vue";
import Welcome from "~/components/Welcome.vue";

@Component({
  head(this: Index): MetaInfo {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      title: "Дмитрий Попов",
    };
  },
  components: {
    Header,
    Welcome,
    Summary: () => import("~/components/Summary.vue"),
    KnoweledgeView: () => import("~/components/KnoweledgeView.vue"),
    BooksView: () => import("~/components/BooksView.vue"),
  },
  async asyncData({ i18n, store }) {
    await store.dispatch("summary/requestSummary", i18n.getLocaleCookie());
    await store.dispatch("instructions/requestInstructions");
    await store.dispatch("books/requestBooks");
  },
})
export default class Index extends Vue {
  async setLanguage(locale: string) {
    this.$i18n.setLocale(locale);
  }
  goToTop() {
    window.scrollTo(0, 0);
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
