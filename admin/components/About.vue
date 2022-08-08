<template>
  <v-container fluid>
    <v-row>
      <v-col sm="2" class="my-auto">
        <h2>About</h2>
      </v-col>
      <v-col sm="2" class="my-auto">
        <v-select
          id="langsBox"
          :loading="loading"
          :readonly="loading"
          no-filter
          disable-lookup
          auto-select-first
          :items="langs"
          @change="pullAbout"
        ></v-select>
      </v-col>
    </v-row>
    <v-container fluid>
      <v-col sm="4">
        <v-row>
          <h3 class="my-auto">Titles:</h3>
          <v-btn icon>
            <v-icon color="black" @click="titles.push('')">
              mdi-plus-circle-outline
            </v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-container fluid v-for="(t, i) in titles" :key="i">
            <v-row>
              <v-col cols="11">
                <TextFiled label="Title" v-model="titles[i]" />
              </v-col>
              <v-col cols="1">
                <DeleteRowButton @agree="titles.splice(i, 1)" />
              </v-col>
            </v-row>
          </v-container>
        </v-row>
        <v-row>
          <v-textarea
            class="pt-7"
            outlined
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
import DeleteRowButton from "./controls/DeleteRowButton.vue";
import TextFiled from "./controls/TextFiled.vue";

@Component({
  components: {
    TextFiled,
    DeleteRowButton,
  },
})
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
      console.log(data);
      this.titles = data.titles ? JSON.parse(data.titles) : [];
      this.about = data.about;
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