<template>
  <v-app app>
    <v-navigation-drawer app dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4">Admin panel</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-content>
            <v-list-item-title @click="push(item.title)">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <div style="height: 100%">
        <About v-if="item == 'about'"> </About>
        <Links v-if="item == 'links'"> </Links>
        <Summary v-if="item == 'summary'"></Summary>
        <Books v-if="item == 'books'"> </Books>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import Summary from "~/components/Summary.vue";
import Books from "~/components/Books.vue";
import About from "~/components/About.vue";
import Links from "~/components/Links.vue";

@Component({
  middleware: ["keyValidate"],
  components: {
    Summary,
    Books,
    Links,
    About,
  },
  async asyncData({ params, store }) {
    await store.dispatch("requestLangs");
    return {
      item: params.panel,
    };
  },
})
export default class Index extends Vue {
  items = [
    { title: "About" },
    { title: "Links" },
    { title: "Summary" },
    { title: "Books" },
  ];
  item = "";
  push(title: string) {
    this.$router.push(`/panel/${title.toLowerCase()}`);
  }
}
</script>
