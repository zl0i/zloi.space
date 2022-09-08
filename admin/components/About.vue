<template>
  <v-container fluid class="ml-5 mb-5">
    <v-row class="mt-1">
      <h2 class="my-auto">Welcome</h2>
      <v-col lg="1">
        <v-select
          :loading="loading"
          :readonly="loading"
          no-filter
          hide-details
          disable-lookup
          dense
          auto-select-first
          :items="langs"
          @change="pullAbout"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <h3 class="my-auto">Titles</h3>
      <v-btn icon>
        <v-icon color="black" @click="titles.push('')">
          mdi-plus-circle-outline
        </v-icon>
      </v-btn>
    </v-row>
    <v-row fluid v-for="(t, i) in titles" :key="i">
      <v-col cols="6">
        <TextField label="Title" v-model="titles[i]" />
      </v-col>
      <v-col cols="1">
        <DeleteRowButton
          @agree="titles.splice(i, 1)"
          :openCondition="[titles[i]]"
        />
      </v-col>
    </v-row>
    <v-row>
      <h3 class="my-auto">About</h3>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-textarea
          outlined
          dense
          hide-details
          auto-grow
          label="About"
          :value="about"
          v-model="about"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-btn color="primary" @click="save">Save</v-btn>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue, State, Watch } from "nuxt-property-decorator";
import DeleteRowButton from "./controls/DeleteRowButton.vue";
import TextField from "./controls/TextField.vue";

@Component({
  components: {
    TextField,
    DeleteRowButton,
  },
  created() {
    console.log(this);
  },
})
export default class About extends Vue {
  @State("langs") langs: string;

  titles: string[] = [];
  about: string = "";
  lang: string = "";
  loading = false;

  @Watch("langs")
  setFirstLnag() {
    console.log(this.langs);
    this.lang = this.langs[0];
  }

  async pullAbout(lang: string) {
    try {
      this.lang = lang;
      this.loading = true;
      const data = await this.$api.pullAbout(lang);
      console.log(data);
      this.titles = data.titles ? JSON.parse(data.titles) : [];
      this.about = data.about;
    } catch (error) {
      console.log(error);
      throw new Error("Error update about");
    } finally {
      this.loading = false;
    }
  }

  async save() {
    await this.$api.pushAbout(this.lang, this.titles, this.about);
  }
}
</script>