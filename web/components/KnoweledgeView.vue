<template>
  <div>
    <ListView
      :title="$t('headers.knoweledge')"
      link="https://github.com/zl0i/KnowledgeBase"
      :model="instructions"
    >
      <template v-slot:default="props">
        <nuxt-link
          class="link"
          :to="`/instructions/${props.data.name
            .replace(/ /g, '_')
            .replace('.md', '')}`"
          prefetch
        >
          <!-- <p :id="props.data.id" :name="props.data.name">
            {{ props.data.name }}
          </p> -->
          <Instruction
            :id="props.data.id"
            :name="props.data.name"
            :html="props.data.html"
            @click="openInstruction(props.data.id)"
          />
        </nuxt-link>
      </template>
    </ListView>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import ListView from "./ListView.vue";
import Instruction from "./controls/Instruction.vue";

@Component({
  components: {
    ListView,
    Instruction,
  },
})
export default class KnoweledgeView extends Vue {
  @Prop() instructions: Array<unknown>;

  openInstruction(id: string) {
    this.$store.commit("instructions/setCurrentId", id);
  }
}
</script>

<style scoped>
.link {
  color: #ffffff;
  text-decoration-line: none;
}
</style>
