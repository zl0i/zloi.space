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
import { RouteRecordName } from "vue-router";

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
    this.$router.beforeEach((to, _from, next) => {
      console.log(to.path, to.hash)
      if (to.hash == "" || to.hash == "#knowledge") {
        this.showModal = false;
      } else {
        console.log(to.path);
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
      name: this.$route.name as RouteRecordName,
      hash: name.replace(/ /g, "-"),
    });
  }

  closeDialog() {
    document.body.style.overflow = "auto";
    this.showModal = false;
    this.$router.push({
      name: this.$route.name as RouteRecordName,
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
