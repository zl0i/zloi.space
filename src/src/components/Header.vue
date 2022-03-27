<template>
  <div class="header">
    <img alt="menu" class="burger-button" src="../../public/img/menu-sharp.svg" @click="showMenu(!isOpenMenu)">
    <div class="mobile-view" v-if="isOpenMenu">
      <div class="mobile-menu-blur" @click="showMenu(false)"></div>
      <div class="mobile-menu">
        <p class="mobile-header">_zloi_</p>
        <a href="#summary" @click="showMenu(false)">{{ $t("headers.summary") }}</a>
        <a href="#knowledge" @click="showMenu(false)">{{ $t("headers.knoweledge") }}</a>
        <a href="#reads" @click="showMenu(false)">{{ $t("headers.reads") }}</a>
        <a>{{ $t("headers.languages") }}:</a>
        <span @click="changeLanguage('ru')">Русский</span>
        <span @click="changeLanguage('en')">English</span>
      </div>
    </div>
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
  isOpenMenu: boolean = false
  showMenu(isOpenMenu: boolean) {
    if (this.isOpenMenu) {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
      this.isOpenMenu = false;
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      this.isOpenMenu = true;
    }
  }
  @Emit("changeLanguage")
  changeLanguage(locale: typeof i18n.global.locale) {
    this.$emit("changeLanguage", locale);
    this.isOpenMenu=false
  }
}
</script>


<style scoped>
.header {
  padding: 0 8.5%;
  display: flex;
}

.header nav {
  text-align: right;
}

.burger-button {
  display: none;
}

.header-links {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-grow: 1;
  font-size: 24px;
  letter-spacing: 1px;
}

.mobile-view {
  display: none;
}

.mobile-header {
  font-size: 24px;
  font-family: 'Permanent Marker';
}

@media (max-device-width: 736px) {
  .header {
    margin-top: 15px;
  }
  .header nav a h1 {
    margin: 0 0 0 25px;
  }
  .burger-button {
    display: block;
    width: 45px;
  }
  .mobile-view {
    display: block;
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    overflow: hidden;
    z-index: 10;
  }
  .mobile-menu-blur {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.66);
    backdrop-filter: blur(4px);
  }
  .mobile-menu {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 25px;
    padding: 19px 0 0 30px;
    background: #292D48;
    width: 55%;
    height: 100%;
    z-index: 10;
  }
  .mobile-menu a, .mobile-menu span {
    color: #ffffff;
    font-family: 'Roboto';
    font-size: 20px;
    text-decoration: none;
  }
  .mobile-menu a, .mobile-menu span {
    margin: 0;
  }
  .mobile-menu span {
    margin-left: 25px;
  }
  .header-links {
    display: none;
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