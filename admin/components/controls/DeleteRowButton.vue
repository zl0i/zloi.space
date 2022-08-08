<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="my-auto" icon v-bind="attrs" v-on="on">
        <v-icon color="grey"> mdi-delete </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          {{ noButton }}
        </v-btn>
        <v-btn color="red darken-1" text @click="agree">
          {{ yesButton }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class DeleteRowButton extends Vue {
  @Prop({ default: "Agree dialog" }) title: string;
  @Prop({ default: "Do you agree?" }) text: string;
  @Prop({ default: "Yes" }) yesButton: string;
  @Prop({ default: "No" }) noButton: string;
  @Prop({ default: true }) showNoButton: boolean;
  dialog = false;

  @Emit()
  agree() {
    this.dialog = false;
  }
}
</script>