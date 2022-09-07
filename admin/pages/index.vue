<template>
  <v-main>
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
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  mounted() {
    const { message } = this.$route.query;
    if (message === "keyUndefined") {
      throw new Error("Вы не авторизованы");
    }
  },
})
export default class Index extends Vue {
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
        const { status } = await this.$axios.post(
          "/auth/validate",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.key}`,
            },
          }
        );
        if (status == 200) {
          this.$store.dispatch("setAdminKey", this.key);
          this.$router.push("/panel/about");
        }
      }
    } catch (error) {
      if (error.response.status == 401) {
        throw new Error("Key is not correct");
      } else {
        throw new Error("Internal error");
      }
    }
  }
}
</script>
