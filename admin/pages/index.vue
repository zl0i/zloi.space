<template>
  <v-main>
    <v-container fluid>
      <v-layout justify-center align-center>
        <v-card
          min-width="400"
          class="mx-auto my-12 justify-center"
          elevation="3"
          :loading="loading"
          :disabled="loading"
        >
          <template slot="progress">
            <v-progress-linear
              color="primary"
              height="3"
              indeterminate
              bottom
            ></v-progress-linear>
          </template>
          <v-card-title>
            <v-spacer />
            <h1>Admin zloi</h1>
            <v-spacer />
          </v-card-title>
          <v-card-text> </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="loginKeycloak">
              Login by Keycloak
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  created() {
    const { code } = this.$route.query;
    if (code) {
      this.$data.loading = true;
    }
  },
})
export default class Index extends Vue {
  loading = false;
  async loginKeycloak() {
    this.$auth.loginWith("keycloak");
  }
}
</script>
