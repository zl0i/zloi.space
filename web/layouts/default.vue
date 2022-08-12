<template>
  <div>
    <nuxt />
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
