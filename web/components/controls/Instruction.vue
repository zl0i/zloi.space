<template>
  <div class="instruction">
    <div class="image">
      <div class="content" v-html="html"></div>
    </div>
    <p class="name">{{ name }}</p>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Instruction extends Vue {
  @Prop() id: string;
  @Prop() name: string;
  @Prop() html: string;
}
</script>

<style scoped>


.instruction {
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

.image {
  align-self: flex-start;
  background: white;
  width: 100%;
  height: 250px;
  cursor: pointer;
  padding: 5px;
  overflow: hidden;
  user-select: none;
}

.content {
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

.content * {
  pointer-events: none;
  user-select: none;
}

.name {
  margin-top: 10px;
  margin-bottom: 0;
  align-self: flex-end;
  text-align: center;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
  color: #ffffff;
}
</style>

<style>
strong {
  font-size: 16px;
  line-height: 26px;
  font-weight: 700;
}

pre {
  padding: 10px;
  display: flex;
  background-color: #f0f0f0;
  border-radius: 5px;
  max-width: max-content;
  overflow-x: auto;
}

code {
  padding: 10px;
  display: contents;
  background-color: #f0f0f0;
  border-radius: 5px;
  word-wrap: break-word;
  max-width: max-content;
  height: auto;
  overflow-x: auto;
}

.formula {
  font-family: "Cambria";
  font-style: italic;
  text-align: center;
  margin-bottom: 20px;
}
</style>