<template>
  <div>
    <ListView
      title="Knowledge"
      link="https://github.com/zl0i/KnowledgeBase"
      :model="sorted()"
    >
      <template v-slot:default="props">
        <Instruction
          :name="props?.item?.name"
          :text="props?.item?.text"
          @open="showDialog"
        />
      </template>
    </ListView>
    <InstructionDialog
      v-if="showModal"
      @close="closeDialog"
      :name="modelName"
      :text="modelText"
    />
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
  showModal = false;
  modelName = "";
  modelText = "";

  created() {
    this.getInstructions();
  }

  @Watch("instructions")
  sorted() {
    return this.instructions.sort((a, b) => a.name.localeCompare(b.name));
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

  showDialog(name: string, text: string) {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    this.modelName = name;
    this.modelText = text;
    this.showModal = true;
  }

  closeDialog() {
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
    const knowledgeView = document.getElementById("knowledge");
    if (knowledgeView) {
      scrollTo(0, knowledgeView.offsetTop - knowledgeView.scrollTop)
    }
    this.showModal = false;
  }
}
</script>
