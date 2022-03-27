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
          <img alt="translate" src="../../public/img/translation-icon.svg" />
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
import { Options, Vue } from "vue-class-component";
import { Emit } from "vue-property-decorator";
import { i18n } from "../libs/i18n";

@Options({})
export default class Header extends Vue {
  @Emit("changeLanguage")
  changeLanguage(locale: typeof i18n.global.locale) {
    this.$emit("changeLanguage", locale);
  }
}
</script>


<style scoped>
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
  cursor: pointer;
}

.language img {
  margin-left: 5px;
}

.language-background {
  display: none;
  position: absolute;
  padding-top: 10px;
  margin-left: -80px;
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
  align-items: flex-end;
  padding: 0.6rem 1rem 0.6rem 1rem;
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