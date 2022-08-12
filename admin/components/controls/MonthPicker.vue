<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateValue"
        outlined
        dense
        prepend-icon="mdi-calendar"
        :label="label"
        hide-details
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateValue"
      type="month"
      @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>


<script lang="ts">
import { Component, Vue, Prop, ModelSync } from "nuxt-property-decorator";

@Component
export default class MothPicker extends Vue {
  @Prop() label: string;
  menu = false;
  @ModelSync("date", "selected") dateValue: string;
}
</script>