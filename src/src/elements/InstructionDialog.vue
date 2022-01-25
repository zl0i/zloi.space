<template>
  <teleport to="body">
      <div class="modal-mask">
        <div class="modal-wrapper" @click.stop="$emit('close')">
          <p class="popupName" @click.stop="">{{ name }}</p>
          <div class="showBox" @click.stop="">
            <div v-html="text"></div>
          </div>
        </div>
      </div>
  </teleport>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    name: String,
    text: String,
  },
})
export default class MarkDownDialog extends Vue {
  name: string;
  text: string;

  close() {
    this.$emit("close");
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(44, 44, 44, 0.56);
  backdrop-filter: blur(10px);
  overflow: scroll;
  transition: opacity 0.3s ease;
  justify-content: center;
}

.modal-wrapper {
  vertical-align: middle;
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

.modal-mask::-webkit-scrollbar {
  display: none;
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
</style>
