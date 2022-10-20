<template>
  <v-container fluid class="ml-3 mb-5">
    <v-row>
      <h2 class="my-auto">Summary</h2>
      <v-col lg="1">
        <v-select
          :loading="loading"
          :readonly="loading"
          no-filter
          disable-lookup
          :items="langs"
          @change="pullSummary"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <h3 class="my-auto">Education</h3>
      <v-btn
        icon
        @click="
          education.push({
            title: '',
            speciality: '',
            range: { from: '', to: '' },
          })
        "
      >
        <v-icon color="black">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-3 mb-3">
      <v-container fluid class="ml-0" v-for="(ed, i) of education" :key="i">
        <v-row lg="2">
          <v-col cols="2">
            <MonthPicker label="Start" v-model="ed.range.from" />
          </v-col>
          <v-col cols="2">
            <MonthPicker label="End" v-model="ed.range.to" />
          </v-col>
          <v-col cols="3">
            <TextField label="Title" v-model="ed.title" />
          </v-col>
          <v-col cols="4">
            <TextField label="Speciality" v-model="ed.speciality" />
          </v-col>
          <DeleteRowButton @agree="education.splice(i, 1)" :openCondition="[ed.title, ed.speciality]"/>
        </v-row>
      </v-container>
    </v-row>

    <v-row>
      <h3 class="my-auto">Courses</h3>
      <v-btn
        icon
        @click="
          courses.push({
            title: '',
            speciality: '',
            range: { from: '', to: '' },
          })
        "
      >
        <v-icon color="black">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-3 mb-3">
      <v-container fluid class="ml-0" v-for="(cr, i) of courses" :key="i">
        <v-row lg="2">
          <v-col cols="2">
            <MonthPicker label="Start" v-model="cr.range.from" />
          </v-col>
          <v-col cols="2">
            <MonthPicker label="End" v-model="cr.range.to" />
          </v-col>
          <v-col cols="3">
            <TextField label="Title" v-model="cr.title" />
          </v-col>
          <v-col cols="4">
            <TextField label="Speciality" v-model="cr.speciality" />
          </v-col>
          <DeleteRowButton @agree="courses.splice(i, 1)" :openCondition="[cr.title, cr.speciality]" />
        </v-row>
      </v-container>
    </v-row>

    <v-row>
      <h3 class="my-auto">Experience</h3>
      <v-btn
        icon
        @click="
          experience.push({
            title: '',
            org: '',
            link_org: '',
            range: { from: '', to: '' },
            position: '',
            duties: '',
          })
        "
      >
        <v-icon color="black">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-3 mb-3">
      <v-container fluid v-for="(ex, i) of experience" :key="i">
        <v-row>
          <v-col cols="2">
            <MonthPicker label="Start" v-model="ex.range.from" />
          </v-col>
          <v-col cols="2">
            <MonthPicker label="End" v-model="ex.range.to" />
          </v-col>
          <v-col cols="3">
            <TextField label="Title" v-model="ex.org" />
          </v-col>
          <v-col cols="4">
            <TextField label="Link" v-model="ex.link_org" />
          </v-col>
          <v-col lg="1">
            <DeleteRowButton @agree="experience.splice(i, 1)" :openCondition="[ex.title, ex.duties, ex.org, ex.position]" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2" md="2" class="ml-8">
            <TextField label="Speciality" v-model="ex.position" />
          </v-col>
          <v-col lg="8">
            <v-textarea
              outlined
              dense
              hide-details
              auto-grow
              rows="1"
              label="Duties"
              v-model="ex.duties"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <v-row>
      <h3 class="my-auto">Skills</h3>
      <v-btn icon @click="skills.push('')">
        <v-icon color="black">mdi-plus-circle-outline </v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-3 mb-3">
      <v-container fluid class="ml-0" v-for="(sk, i) of skills" :key="i">
        <v-row lg="2">
          <v-col cols="7">
            <TextField label="Skills" v-model="skills[i]" />
          </v-col>
          <v-col cols="1">
            <DeleteRowButton @agree="skills.splice(i, 1)" :openCondition="[skills[i]]"/>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <v-row>
      <h3 class="my-auto">Achievements</h3>
      <v-btn icon @click="achievements.push('')">
        <v-icon color="black">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-3 mb-3">
      <v-container
        fluid
        class="ml-0"
        v-for="(achv, i) of achievements"
        :key="i"
      >
        <v-row lg="2">
          <v-col cols="7">
            <TextField label="Achievement" v-model="achievements[i]" />
          </v-col>
          <v-col cols="1">
            <DeleteRowButton @agree="achievements.splice(i, 1)" :openCondition="[achievements[i]]" />
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <v-row>
      <v-btn color="primary" :loading="loading" @click="save">Save</v-btn>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue, State } from "nuxt-property-decorator";
import { IEducation, IExperience } from "~/store/summary";

import MonthPicker from "./controls/MonthPicker.vue";
import TextField from "./controls/TextField.vue";
import DeleteRowButton from "./controls/DeleteRowButton.vue";

@Component({
  components: {
    TextField,
    MonthPicker,
    DeleteRowButton,
  },
})
export default class Summary extends Vue {
  @State("langs") langs: string;
  lang = "";
  loading = false;
  education: IEducation[] = [];
  courses: IEducation[] = [];
  experience: IExperience[] = [];
  skills: string[] = [];
  achievements: string[] = [];

  async pullSummary(lang: string) {
    try {
      this.lang = lang;
      this.loading = true;
      const data = await this.$api.summary.pull(lang);
      this.education = data.education ?? [];
      this.courses = data.courses ?? [];
      this.experience = data.experience ?? [];
      this.skills = data.skills ?? [];
      this.achievements = data.achievements ?? [];
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  async save() {
    try {
      this.loading = true;
      const summary = {
        education: this.education,
        courses: this.courses,
        experience: this.experience,
        skills: this.skills,
        achievements: this.achievements,
      };
      await this.$api.summary.push(this.lang, summary);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>
