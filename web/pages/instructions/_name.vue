<template>
  <div>
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
  async asyncData({ $axios, store, params }) {
    const name = params.name.replace(/_/g, " ") + ".md";
    const id = store.state.instructions.currentId;
    const instructions = Array(...store.state.instructions.instructions);
    if (instructions.length == 0) {
      const res = await $axios.get("http://localhost:3000/api/knowledgebase");
      store.commit("instructions/of", res.data);
      instructions.push(...res.data);
    }
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
      title: this.name,
    };
  }

  closeDialog() {
    this.$router.back();
    // this.$nuxt.$router.back()
    //TODO: rewrite
    // if (document.referrer.length) {
    //   this.$router.back();
    // } else {
    //   this.$router.push({ path: "/" });
    // }
  }
}
</script>
