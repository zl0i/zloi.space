<template>
  <div class="header">
    <img
      alt="menu"
      class="burger-button"
      src="~/static/img/menu-sharp.svg"
      @click="showMenu()"
    />
    <nav>
      <a href="#">
        <h1>_zloi_</h1>
      </a>
      <div
        class="mobile-menu-blur"
        :style="{ display: isShowMenu ? 'flex' : 'none' }"
        @click="hideMenu()"
      ></div>
      <div :class="isShowMenu ? 'mobile-header-links' : 'header-links'">
        <a href="#summary" @click="hideMenu()">{{ $t("headers.summary") }}</a>
        <a href="#knowledge" @click="hideMenu()">{{
          $t("headers.knoweledge")
        }}</a>
        <a href="#reads" @click="hideMenu()">{{ $t("headers.reads") }}</a>
        <div class="language" :class="isShowMenu && 'mobile-language'">
          <a>Translate</a>
          <img
            alt="arrow"
            src="~/static/img/arrow-down.svg"
            :style="isShowMenu && { display: 'none' }"
          />
          <div
            :class="
              isShowMenu ? 'mobile-language-background' : 'language-background'
            "
          >
            <div
              class="language-popup"
              :class="isShowMenu && 'mobile-language-popup'"
            >
              <a
                @click="
                  () => {
                    changeLanguage('ru');
                    hideMenu();
                  }
                "
                >Русский</a
              >
              <a
                @click="
                  () => {
                    changeLanguage('en');
                    hideMenu();
                  }
                "
                >English</a
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Header extends Vue {
  isShowMenu = false;

  changeLanguage(locale: string) {
    this.$emit("changeLanguage", locale);
  }
  showMenu() {
    this.isShowMenu = true;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
  }
  hideMenu() {
    this.isShowMenu = false;
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");
.header {
  padding: 0 8.5%;
  display: flex;
}

.burger-button {
  display: none;
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
  .burger-button {
    display: block;
    width: 45px;
    padding: 30px 20px 0 0;
  }
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

.header-links a:hover {
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

.mobile-language {
  text-align: left;
  cursor: none;
  user-select: none;
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

.mobile-menu-blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.66);
  backdrop-filter: blur(4px);
}

.mobile-header-links {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 25px;
  padding: 50px 0 0 30px;
  background: #292d48;
  width: 55%;
  height: 100%;
  z-index: 10;
}

.mobile-header-links > * {
  color: #fff;
  font-family: Roboto;
  font-size: 24px;
  text-decoration: none;
  margin: 0;
}

.mobile-language-background {
  text-align: left;
}

.mobile-language-popup {
  background: none;
  border: none;
  box-shadow: none;
  gap: 20px;
  padding: 1.5rem 1.5rem 0.6rem 1.25rem;
}
</style>
