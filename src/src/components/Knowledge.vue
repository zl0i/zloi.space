<template>
  <div>
    <ListView
      :title="$t('headers.knoweledge')"
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
import "vue-router";

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
  private opening: string = "";

  created() {
    this.getInstructions();
    this.$router.beforeEach((to, _from, next) => {
      if (to.hash == "" || to.hash == "#knowledge") {
        this.showModal = false;
      } else {
        this.opening = to.hash.replace(/-/g, " ");
        this.opening = this.opening.replace(/#/, "");
      }
      next();
    });
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
                if (this.opening == file.name) {
                  this.showDialog(file.name, res2.data);
                  this.opening = "";
                }
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
    this.modelName = name;
    this.modelText = text;
    this.showModal = true;
    this.$router.push({
      path: "/",
      hash: "#" + name.replace(/ /g, "-"),
    });
  }

  closeDialog() {
    document.body.style.overflow = "auto";
    this.showModal = false;
    this.$router.push({
      path: "/",
      hash: "#knowledge",
    });
    window.scrollTo({
      top: (document.getElementById("knowledge") as HTMLElement).offsetTop,
      left: 0,
    });
  }
}
</script>
