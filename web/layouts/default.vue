<template>
  <div>
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  name: "LayoutDefault",
  middleware: "logs",
})
export default class Default extends Vue {}
</script>