<template>
  <ListView :title="$t('headers.reads')" :model="books">
    <template v-slot:default="props">
      <Book
        :name="props.data.name"
        :image="props.data.image"
        :status="props.data.status"
      />
    </template>
  </ListView>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import ListView from "./ListView.vue";
import Book from "./controls/Book.vue";

@Component({
  components: {
    ListView,
    Book,
  },
})
export default class BooksView extends Vue {
  @Prop() books: Array<unknown>;
}
</script>
