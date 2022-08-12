<template>
  <div class="fixed">
    <Header></Header>
    <Welcome></Welcome>
    <Summary id="summary"></Summary>
    <KnoweledgeView id="knowledge"></KnoweledgeView>
    <BooksView id="reads"></BooksView>
    <InstructionDialog @close="closeDialog" :name="name" :html="html" />
  </div>
</template>

<script lang="ts">
import Index from "../index.vue";
import InstructionDialog from "../../components/controls/InstructionDialog.vue";
import { Component } from "nuxt-property-decorator";

@Component({
  components: {
    InstructionDialog,
  },
  async asyncData({ store, params, i18n }) {
    const name = params.name.replace(/_/g, " ") + ".md";

    await store.dispatch("summary/requestSummary", i18n.getLocaleCookie());
    await store.dispatch("books/requestBooks");
    await store.dispatch("instructions/requestInstructions");

    const id = store.state.instructions.currentId;
    const instructions = Array(...store.state.instructions.instructions);

    let current: any;
    if (id) {
      current = instructions.find((ins: any) => ins.id == id);
    } else {
      current = instructions.find((ins: any) => {
        return ins.name == name;
      });
    }
    return {
      name: current.name,
      html: current.html,
    };
  },
})
export default class Instruction extends Index {
  name: string = "";
  html: string = "";
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      title: this.name,
    };
  }

  closeDialog() {
    this.$router.back();
  }
}
</script>

<style>
.fixed {
  position: fixed;
  overflow: hidden;
}
</style>
