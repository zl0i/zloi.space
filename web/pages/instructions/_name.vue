<template>
  <div>
    <Header></Header>
    <Welcome :text="about" :titles="titles" :links="links"></Welcome>
    <Summary id="summary" :summary="summary"></Summary>
    <KnoweledgeView
      id="knowledge"
      :instructions="instructions"
    ></KnoweledgeView>
    <BooksView id="reads" :books="books"></BooksView>
    <InstructionDialog @close="closeDialog" :name="name" :html="html" />
  </div>
</template>

<script lang="ts">
import Index from "../index.vue";
import InstructionDialog from "../../components/controls/InstructionDialog.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
    InstructionDialog
  },
  async asyncData({ $axios, store, params }) {
    const name = params.name.replace(/_/g, " ") + ".md";
    const id = store.state.instructions.currentId;
    const instructions = Array(...store.state.instructions.instructions);
    console.log(instructions.length);
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
    //TODO: rewrite
    if (document.referrer.length) {
      this.$router.back();
    } else {
      this.$router.push({ path: "/" });
    }
  }
}
</script>
