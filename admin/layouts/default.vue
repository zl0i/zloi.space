<template>
  <v-app app dark>
    <ErrorItem v-model="showError" :text="errorMessage" />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import ErrorItem from "~/components/controls/ErrorItem.vue";
import { Component, Vue } from "nuxt-property-decorator";

@Component({
  name: "default",
  components: {
    ErrorItem,
  },
  errorCaptured: function (error: Error, _vm: Vue, _info: string) {
    console.log(error);
    this.$data.errorMessage = error.message;
    this.$data.showError = true;
    return false;
  },
})
export default class DefaultLayout extends Vue {
  showError = false;
  errorMessage = "";
}
</script>
