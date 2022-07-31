<template>
  <v-container fluid>
    <v-row class="mb-1">
      <v-col sm="2" class="my-auto">
        <h2>Instructions</h2>
      </v-col>
    </v-row>
    <v-btn color="primary" @click="update" :loading="loading">Update</v-btn>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue, State } from "nuxt-property-decorator";

@Component({})
export default class Instructions extends Vue {
  loading = false;
  async update() {
    try {
      this.loading = true;
      await this.$api.updateInstructions();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>