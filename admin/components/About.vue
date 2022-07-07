<template>
  <v-container fluid>
    <v-row>
      <v-col sm="2" class="my-auto">
        <h2>About</h2>
      </v-col>
      <v-col sm="2" class="my-auto">
        <v-combobox
          id="langsBox"
          :loading="loading"
          :readonly="loading"
          no-filter
          disable-lookup
          auto-select-first
          :items="langs"
          @change="pullAbout"
        ></v-combobox>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-col sm="4">
        <v-row class="my-auto">
          <h3>Titles:</h3>
        </v-row>
        <v-row v-for="(t, i) in titles" :key="i">
          <v-text-field
            height="25"
            :value="t"
            v-model="titles[i]"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-btn color="accent" @click="titles.push('')">Add</v-btn>
          <v-btn class="ml-5" color="pink" @click="titles.pop()">Pop</v-btn>
        </v-row>
        <v-row>
          <v-textarea
            class="pt-7"
            dense
            label="About"
            :value="about"
            v-model="about"
          ></v-textarea>
        </v-row>
      </v-col>
    </v-container>
    <v-btn color="primary" @click="save">Save</v-btn>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue, State } from "nuxt-property-decorator";

@Component({})
export default class About extends Vue {
  @State("langs") langs: string;

  titles: string[] = [];
  about: string = "";
  lang: string = "";
  loading = false;

  async pullAbout(lang: string) {
    try {
      this.lang = lang;
      this.loading = true;
      const data = await this.$api.pullAbout(lang);
      this.titles = JSON.parse(data.titles);
      this.about = String(data.about);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  async save() {
    await this.$api.pushAbout(this.lang, this.titles, this.about);
  }
}
</script>