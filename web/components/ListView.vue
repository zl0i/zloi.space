<template>
  <div>
    <div class="header">
      <p>{{ title }}</p>
      <a :href="link" target="_blank">
        <img
          class="link-image"
          v-if="link"
          :alt="title"
          src="~/static/img/link.svg"
        />
      </a>
    </div>
    <ul class="list">
      <li v-for="item in model" :key="item.id">
        <slot v-bind:data="item"></slot>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component
export default class ListView extends Vue {
  @Prop() title: string;
  @Prop() link!: string;
  @Prop() model: unknown[];
}
</script>

<style scoped>
.header {
  font-size: 40px;
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 0;
  height: 48px;
}

.link-image {
  width: 32px;
  height: 32px;
  padding-left: 10px;
  padding-top: 15px;
}

.list {
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
  overflow-y: hidden;
}

.list:active {
  cursor: grabbing;
}

.list::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Handle */
.list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
.list ::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>