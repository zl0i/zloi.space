<template>
  <div class="summary-box">
    <div class="summary-header">
      <p style="margin: 0px">{{ $t("summary.title") }}</p>
      <a href="https://career.habr.com/zloi07/print.pdf" target="_blank" style="padding-top: 20px">
        <img alt="downloadSummary" src="~/static/img/download.svg" />
      </a>
    </div>
    <div class="all-column">
      <div class="left-column">
        <div>
          <p class="box-naming">{{ `${$t("summary.education")}:` }}</p>
          <ul style="padding: 0">
            <li class="box-list" v-for="item of education" :key="item.title">
              <p>{{ item.range.from }} - {{ item.range.to }}</p>
              <p>{{ item.title }}</p>
              <p>{{ item.speciality }}</p>
            </li>
          </ul>

          <p class="box-naming">{{ `${$t("summary.courses")}:` }}</p>
          <ul style="padding: 0">
            <li class="box-list" v-for="item of courses" :key="item.title">
              <p>{{ item.range.from }} - {{ item.range.to }}</p>
              <p>{{ item.title }}</p>
              <p>{{ item.speciality }}</p>
            </li>
          </ul>

          <p class="box-naming">{{ `${$t("summary.experience")}:` }}</p>
          <ul style="padding: 0">
            <li class="box-list" v-for="item of experience" :key="item.title">
              <p>
                {{ item.range.from }} - {{ item.range.to }}
                <a class="org-name" :href="item.link_org">{{ item.org }}</a>
              </p>
              <p class="description">{{ item.position }}</p>
              <p class="description">{{ item.duties }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="right-column">
        <p class="box-naming">{{ `${$t("summary.skills")}:` }}</p>
        <div class="box-skill" v-for="item of skills" :key="item.name">
          <p>{{ item.name }}</p>
          <div class="skill-progress">
            <div
              class="skill-fill"
              :style="{ width: `${item.value * 100}%` }"
            ></div>
            <div class="skill-lvl">{{ item.description }}</div>
          </div>
        </div>
        <p class="box-naming">{{ `${$t("summary.tech_stack")}:` }}</p>
        <ul style="padding: 0">
          <li class="box-list" v-for="item of tech_stack" :key="item">
            {{ item }}
          </li>
        </ul>
        <p class="box-naming">{{ `${$t("summary.achievements")}:` }}</p>
        <ul style="padding: 0">
          <li class="box-list" v-for="item of achievements" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from "nuxt-property-decorator";
import {
  namespace as summaryStoreNamespace,
  SummaryState,
} from "../store/summary";

const SummaryStore = namespace(summaryStoreNamespace);

@Component
export default class Summary extends Vue {
  @SummaryStore.State("education") education: SummaryState["education"];
  @SummaryStore.State("courses") courses: SummaryState["courses"];
  @SummaryStore.State("experience") experience: SummaryState["experience"];
  @SummaryStore.State("skills") skills: SummaryState["skills"];
  @SummaryStore.State("tech_stack") tech_stack: SummaryState["tech_stack"];
  @SummaryStore.State("achievements")
  achievements: SummaryState["achievements"];
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
