<template>
  <v-app app dark>
    <v-main>
      <v-container fluid>
        <v-layout justify-center align-center>
          <v-card min-width="400" class="mt-12 pa-3" elevation="3">
            <v-card-title>
              <h1>Admin zloi</h1>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field :counter="16" label="Введите ключ" required>
                </v-text-field>
                <v-btn color="primary" @click="login">Войти</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class Index extends Vue {
  login() {
    this.$router.push("/panel/summary");
  }
}
</script>
