<template>
  <div>
    <ListView
      title="Knowledge"
      link="https://github.com/zl0i/KnowledgeBase"
      :model="sortKnowledge()"
    >
      <template v-slot:default="props">
        <Instruction
          :name="props?.item?.name"
          :text="props?.item?.text"
          @open="openDialog"
        />
      </template>
    </ListView>
    <InstructionDialog ref="dialog" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import ListView from "./ListView.vue";
import Instruction from "../elements/Instruction.vue";
import InstructionDialog from "../elements/InstructionDialog.vue";
import axios from "axios";

interface IInstruction {
  id: string;
  name: string;
  text: string;
}

@Options({
  components: {
    ListView,
    Instruction,
    InstructionDialog,
  },
})
export default class KnoweledgeView extends Vue {
  instructions: IInstruction[] = [];

  created() {
    this.getInstructions();
  }

  sortByName<T extends { name: string }>(a: T, b: T) {
    return a.name.localeCompare(b.name);
  }

  @Watch("instructions")
  sortKnowledge() {
    return this.instructions.sort(this.sortByName);
  }

  getInstructions() {
    axios
      .get("https://api.github.com/repos/zl0i/KnowledgeBase/contents")
      .then((res) => {
        for (const file of res.data) {
          if (file.name.includes(".md")) {
            axios
              .get(file.download_url)
              .then((res2) => {
                this.instructions.push({
                  id: file.sha,
                  name: file.name,
                  text: res2.data,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openDialog(name: string, html: string) {
    //document.body.style["overflow-y"] = "hidden";
    (this.$refs.dialog as InstructionDialog).open(name, html);
  }
}
</script>
