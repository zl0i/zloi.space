<template>
  <section class="container">
    <div>
      <h1 class="title">
        {{ error.statusCode }}
      </h1>
      <h2 class="info">
        {{ error.message }}
      </h2>
      <nuxt-link v-if="error.statusCode === 404" class="button" to="/">
        Homepage
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { Vue, Prop, Component } from "nuxt-property-decorator";

@Component
export default class ErrorView extends Vue {
  @Prop() error;
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button {
  margin-top: 50px;
}
</style>
