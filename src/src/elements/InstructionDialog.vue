<template>
  <div
    class="darkenBackground"
    v-show="isOpen"
    @click.stop="close"
    style="display: none"
  >
    <p class="popupName" @click.stop="">{{ name }}</p>
    <div class="showBox" @click.stop="">
      <div v-html="text"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class MarkDownDialog extends Vue {
  name: string;
  text: string;
  isOpen = false;

  open(name: string, text: string) {
    this.name = name;
    this.text = text;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
</script>

<style scoped>
.darkenBackground {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 44, 44, 0.56);
  z-index: 3;
  backdrop-filter: blur(10px);
  overflow: auto;
  justify-content: center;
}

.popupName {
  margin-top: 60px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 10px;
  z-index: 3;
  font-size: 40px;
}

.showBox {
  margin-left: auto;
  margin-right: auto;
  width: 75%;
  height: fit-content;
  background: white;
  color: #1a1a1a;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 20px;
  min-height: 86%;
  border-radius: 5px;
  margin-bottom: 60px;
}

@media (max-device-width: 736px) {
  .popupName {
    font-size: 24px;
  }
  .showBox {
    width: calc(100% - 30px);
    padding: 20px 15px;
  }
  .showBox a {
    word-wrap: break-word;
  }
}

/* .showBox::-webkit-scrollbar {
  width: 0;
} */
</style>

