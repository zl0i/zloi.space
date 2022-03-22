<template>
  <div>
    <Header></Header>
    <Welcome :text="about" :titles="titles" :links="links"></Welcome>
    <Summary id="summary" :summary="summary"></Summary>
    <KnoweledgeView
      id="knowledge"
      :instructions="instructions"
      :showDialog="true"
      :dialogName="name"
      :dialogHtml="html"
    ></KnoweledgeView>
    <BooksView id="reads" :books="books"></BooksView>
  </div>
</template>

<script lang="ts">
import Index from "../index.vue";
import { Component } from "vue-property-decorator";
import "vuex";

@Component
export default class Instruction extends Index {
  name = "";
  html = "";
  head() {
    return {
      title: this.name,
    };
  }

  created() {
    const name = this.$route.params.name.replace(/_/g, " ") + ".md";
    const id = this.$store.state.instructions.currentId;
    const instructions = Array(...this.$store.state.instructions.instructions);
    let current: any;
    if (id) {
      current = instructions.find((ins: any) => ins.id == id);
    } else {
      current = instructions.find((ins: any) => {
        return ins.name == name;
      });
    }
    this.name = current.name;
    this.html = current.html;
  }
}
</script>