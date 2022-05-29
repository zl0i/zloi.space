<template>
  <v-app app dark>
    <v-main>
      <v-snackbar v-model="snackbar" :timeout="6000" top>
        {{ errorMessage }}
        <v-btn color="pink" text @click="snackbar = false">Закрыть</v-btn>
      </v-snackbar>
      <v-container fluid>
        <v-layout justify-center align-center>
          <v-card min-width="400" class="mt-12 pa-3" elevation="3">
            <v-card-title>
              <h1>Admin zloi</h1>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  :counter="16"
                  label="Введите ключ"
                  :rules="keyRules"
                  required
                  v-model="key"
                >
                </v-text-field>
                <v-btn
                  :disabled="!isValid"
                  color="primary"
                  @click="login"
                  class="align-left"
                >
                  Войти
                </v-btn>
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

@Component({
  mounted() {
    const { message } = this.$route.query;
    if (message === "keyUndefined") {
      this.$data.errorMessage = "Вы не авторизованы";
    }
    this.$data.snackbar = !!this.$data.errorMessage;
  },
})
export default class Index extends Vue {
  snackbar = false;
  errorMessage = "";
  isValid = true;
  key = "";

  keyRules = [
    (v: string) => !!v || "Введите ключ",
    (v: string) => (v && v.length == 16) || "Ключ должен быть 16 символов",
  ];

  async login() {
    try {
      const form = this.$refs.form as any;
      if (form.validate()) {
        const { data, status } = await this.$axios.post("/api/auth/validate", {
          key: this.key,
        });
        this.$store.dispatch("setAdminKey", this.key);
        this.$router.push("/panel/summary");
      }
    } catch (error) {
      if (error.response.status == 401) {
        this.errorMessage = "Key is not correct";
        this.snackbar = true;
      } else {
        this.errorMessage = "Internal error";
        this.snackbar = true;
      }
    }
  }
}
</script>
