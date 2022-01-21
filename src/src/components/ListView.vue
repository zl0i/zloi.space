<template>
  <div>
    <div class="summary-header" id="knowledge-id">
      <p>{{ title }}</p>
      <a href="https://github.com/zl0i/KnowledgeBase" target="_blank">
        <img
          v-if="link"
          :alt="title"
          src="../assets/link.svg"
          style="width: 32px; height: 32px; padding-left: 10px"
        />
      </a>
    </div>
    <ul class="list-summary">
      <li class="list-element" v-for="file in sortKnowledge" :key="file.id">
        <div class="element-img" @click.stop="openDialog(file)">
          <div class="element-inner" v-html="marked(file.data)"></div>
        </div>
        <p class="element-name">{{ file.name }}</p>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    title: String,
    link: String,
  },
})
export default class ListView extends Vue {
  title: string;
  link!: string;
}
</script>

<style scoped>
.summary-header {
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 0;
  height: 48px;
}

.list-summary {
  margin: 40px 0;
  width: calc(100vw - 144px);
  height: 370px;
  background: #404040;
  display: flex;
  padding-left: 72px;
  padding-right: 72px;
  padding-top: 30px;
  gap: 50px;
  list-style: none;
  overflow: auto;
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
}

.list-summary:active {
  cursor: grabbing;
}

.list-summary::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Handle */
.list-summary::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
.list-summary ::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-device-width: 736px) {
  .list-summary {
    margin-top: 0;
  }
}

.list-element {
  width: 170px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  position: relative;
}

.element-img {
  align-self: flex-start;
  background: white;
  width: 100%;
  height: 250px;
  cursor: pointer;
  padding: 5px;
  overflow: hidden;
  user-select: none;
}

.element-inner {
  width: calc(100% * 6.6);
  height: fit-content;
  margin-left: 0;
  background: white;
  color: #1a1a1a;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow: auto;
  padding: 20px;
  border-radius: 5px;
  transform: scale(0.15);
  transform-origin: left top;
}

.element-inner * {
  pointer-events: none;
  user-select: none;
}

.element-name {
  margin-top: 10px;
  margin-bottom: 0;
  align-self: flex-end;
  text-align: center;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
}
</style>