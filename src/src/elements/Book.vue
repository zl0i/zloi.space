<template>
  <div class="book">
    <img      
      alt=""
      class="image"
      v-if="image"
      :src="image"
      loading="lazy"
    />
    <img
      alt=""
      v-if="!image"
      class="image"
      src="../assets/default-image-book.png"
      loading="lazy"
    />
    <div class="read-div" v-show="isRead">
      <img src="../assets/check.png" alt="read" />
      <p>Прочитано</p>
    </div>
    <p class="name" style="">{{ name }}</p>
  </div>
</template>


<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    name: String,
    isRead: Boolean,
    image: String,
  },
})
export default class Book extends Vue {
  name: string;
  isRead: boolean;
  image!: string;
  defaultImage = "../assets/default-image-book.png";
}
</script>

<style scoped>
.book {
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
  padding: 5px;
  overflow: hidden;
  user-select: none;
  -webkit-user-drag: none;
  padding: 0; 
  object-fit: cover
}

.read-div {
  position: absolute;
  bottom: 78px;
  user-select: none;
  display: flex;
  width: 100%;
  background: linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #535353 100%);
  align-items: center;
  padding-bottom: 10px;
}

.read-div img {
  width: 30px;
  height: 30px;
  margin: 0 0 0 7px;
}

.read-div p {
  margin: 0 0 0 10px;
  text-align: center;
  font-size: 14px;
}

.name {
  height: 72px;
  margin-top: 7px;
  margin-bottom: 0;
  text-align: center;
  width: 100%;
  user-select: none;
}
</style>