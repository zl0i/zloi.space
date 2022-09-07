<template>
  <v-app app dark>
    <ErrorItem v-model="showError" :text="errorMessage" />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import ErrorItem from "~/components/controls/ErrorItem.vue";

export default {
  name: "default",
  components: {
    ErrorItem,
  },
  data: function () {
    return {
      showError: false,
      errorMessage: "",
    };
  },
  errorCaptured: function (error: Error, _vm: Vue, _info: string) {
    console.log(error);
    this.errorMessage = error.message;
    this.showError = true;
    return false;
  },
};
</script>
