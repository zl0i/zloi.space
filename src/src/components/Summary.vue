<template>
  <div class="summary-box">
    <div class="summary-header">
      <p style="margin: 0px">Summary</p>
      <a href="./summary.pdf" target="_blank" style="padding-top: 20px">
        <img alt="downloadSummary" src="../assets/download.svg" />
      </a>
    </div>
    <div class="all-column">
      <ul class="left-column">
        <div>
          <p class="box-naming">Образование:</p>
          <li
            class="box-list"
            v-for="item of summary.education"
            :key="item.title"
          >
            <p>{{ item.range.from }} - {{ item.range.to }}</p>
            <p>{{ item.title }}</p>
            <p>{{ item.speciality }}</p>
          </li>

          <p class="box-naming">Дополнительное образование:</p>
          <li
            class="box-list"
            v-for="item of summary.courses"
            :key="item.title"
          >
            <p>{{ item.range.from }} - {{ item.range.to }}</p>
            <p>{{ item.title }}</p>
            <p>{{ item.speciality }}</p>
          </li>

          <p class="box-naming">Опыт работы:</p>
          <li
            class="box-list"
            v-for="item of summary.experience"
            :key="item.title"
          >
            <p>
              {{ item.range.from }} - {{ item.range.to }}
              <a class="org-name" :href="item.link_org">{{ item.org }}</a>
            </p>
            <p class="description">{{ item.position }}</p>
            <p class="description">{{ item.duties }}</p>
          </li>
        </div>
      </ul>
      <ul class="right-column">
        <p class="box-naming">Скиллы:</p>
        <div class="box-skill" v-for="item of summary.skills" :key="item.name">
          <p>{{ item.name }}</p>
          <div class="skill-progress">
            <div
              class="skill-fill"
              :style="{ width: `${item.value * 100}%` }"
            ></div>
            <div class="skill-lvl">{{ item.description }}</div>
          </div>
        </div>
        <p class="box-naming">Технический стэк:</p>
        <li class="box-list" v-for="item of summary.tech_stack" :key="item">
          {{ item }}
        </li>
        <p class="box-naming">Достижения:</p>
        <li class="box-list" v-for="item of summary.achievements" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    summary: Object,
  },
})
export default class Summary extends Vue {
  summary: any = {};
}
</script>

<style scoped>
.summary-box {
  min-height: 100vh;
  position: static;
  padding: 0 8.5%;
}

.summary-header {
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 0;
  height: 48px;
}

.summary-header a {
  padding-top: 10px;
  height: fit-content;
  cursor: pointer;
}

.summary-header a img {
  width: 32px;
  height: 32px;
}

@media (max-device-width: 736px) {
  .summary-header {
    font-size: 24px;
    margin-top: 30px;
  }
  .summary-header p {
    margin: 0;
  }
}

.all-column {
  margin-top: 20px;
  margin-bottom: 147px;
  display: flex;
  justify-content: space-between;
}

@media (max-device-width: 736px) {
  .all-column {
    flex-direction: column;
  }
  .left-column {
    margin: 0;
    padding: 0;
  }
  .right-column {
    margin: 0;
    padding: 0;
  }
  .all-column {
    margin: 0;
  }
}

.left-column {
  list-style-position: outside;
}

.box-naming {
  padding: 0;
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 24px;
  max-height: max-content;
}

@media (max-device-width: 736px) {
  .box-naming {
    margin-top: 30px;
    margin-bottom: 0;
  }
}

.box-list {
  max-width: 420px;
  font-size: 17px;
  margin-top: 20px;
  margin-left: 40px;
  word-break: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}

.box-list p {
  /* width: min-content; */
  margin: 7px 0;
}

.org-name {
  margin-left: 7px;
  font-size: 20px;
  font-weight: 400;
  font-style: oblique;
  color: #ffffff;
}

.org-name:hover {
  text-decoration: underline;
  color: #515075;
}

.description {
  padding-left: 14px;
  text-align: justify;
  word-break: break-all;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.right-column p {
  word-break: keep-all;
  padding-right: 5px;
}

.box-skill {
  display: flex;
  align-items: center;
  text-align: right;
  width: fit-content;
  margin-bottom: 0px;
}

.box-skill p {
  text-align: right;
  width: 120px;
}

@media (max-device-width: 736px) {
  .box-skill {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
  }
  .box-skill p {
    width: fit-content;
    padding-left: 10px;
    margin: 26px 0 3px 0;
  }
}

.skill-progress {
  width: 20vw;
  height: 8px;
  border-radius: 4px;
  background: #c5c5c5;
  margin-left: 7px;
}

@media (max-device-width: 736px) {
  .skill-progress {
    width: 250px;
  }
}

.skill-fill {
  height: 8px;
  border-radius: 4px 0 0 4px;
  background: #515075;
}

.skill-lvl {
  font-size: 17px;
  width: inherit;
}

@media (max-device-width: 736px) {
  .skill-lvl {
    font-size: 14px;
  }
}
</style>