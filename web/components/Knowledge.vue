<template>
  <div>
    <ListView
      :title="$t('headers.knoweledge')"
      link="https://github.com/zl0i/KnowledgeBase"
      :model="instructions"
    >
      <template v-slot:default="props">
        <Instruction
          :name="props.data.name"
          :html="props.data.html"
          @click="openDialog"
        />
      </template>
    </ListView>
    <InstructionDialog
      v-if="showDialog"
      @close="closeDialog"
      :name="dialogName"
      :html="dialogHtml"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ListView from "./ListView.vue";
import Instruction from "./controls/Instruction.vue";
import InstructionDialog from "./controls/InstructionDialog.vue";

@Component({
  components: {
    ListView,
    Instruction,
    InstructionDialog,
  },
})
export default class KnoweledgeView extends Vue {
  @Prop() instructions: Array<unknown>;
  showDialog = false;
  dialogName = "";
  dialogHtml = "";

  openDialog(name: string, html: string) {
    this.dialogName = name;
    this.dialogHtml = html;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
}
</script>
