<template>
  <v-snackbar v-model="isShow" :timeout="6000" top dark>
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="isShow = false">
        Close
      </v-btn>
    </template>
    <!-- <v-btn color="pink" text @click="isShow = false">Close</v-btn> -->
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, Vue, ModelSync } from "nuxt-property-decorator";

@Component({})
export default class ErrorItem extends Vue {
  @ModelSync("item", "opened") isShow: boolean;
  @Prop({ default: "" }) text: string;
}
</script>