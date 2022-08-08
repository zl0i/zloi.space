<template>
  <v-text-field
    :label="label"
    dense
    outlined
    hide-details
    v-model="valueString"
  ></v-text-field>
</template>


<script lang="ts">
import { Component, Vue, Prop, ModelSync } from "nuxt-property-decorator";

@Component
export default class TextField extends Vue {
  @Prop() label: string;
  @ModelSync("value", "input") valueString: string;
}
</script>

