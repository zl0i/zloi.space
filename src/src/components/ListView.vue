<template>
  <div>
    <div class="summary-header" id="knowledge-id">
      <p>{{ title }}</p>
      <a :href="link" target="_blank">
        <img
          v-if="link"
          :alt="title"
          src="../assets/link.svg"
          style="width: 32px; height: 32px; padding-left: 10px"
        />
      </a>
    </div>
    <ul class="list-summary">
      <li class="list-element" v-for="item in model" :key="item.id">
        <slot :item="item"></slot>
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
    model: Array,
  },
})
export default class ListView extends Vue {
  title: string;
  link!: string;
  model: unknown[];
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
</style>