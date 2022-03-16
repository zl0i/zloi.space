<template>
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
          <img alt="arrow" src="../static/arrow-down.svg" />
          <div class="language-background">
            <div class="language-popup">
              <span @click="changeLanguage('ru')">Русский</span>
              <span @click="changeLanguage('en')">English</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Emit, Component } from "vue-property-decorator";

@Component
export default class Header extends Vue {

  @Emit("changeLanguage")
  changeLanguage(locale: string) {
    this.$emit("changeLanguage", locale);
  }  
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");
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

.header-links a:hover,
span:hover {
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
  margin-left: 100px;
  cursor: pointer;
}

.language img {
  margin-left: 5px;
}

.language-background {
  display: none;
  position: absolute;
  padding-top: 10px;
}

.language:hover .language-background {
  display: block;
}

.language-popup {
  background: #1c1e2a;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.75);
  border-radius: 2px;
  display: flex;
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