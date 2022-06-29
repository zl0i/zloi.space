<template>
  <v-container fluid>
  </v-container>
</template>

<script>
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  mounted() {
    console.log(this.$vuetify.breakpoint.name);
  },
})
export default class Summary extends Vue {
  langs = ["ru", "en"];
}
</script>
