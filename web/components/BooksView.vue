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
import { Vue, Component, namespace } from "nuxt-property-decorator";
import ListView from "./ListView.vue";
import Book from "./controls/Book.vue";

import { namespace as booksStoreNamespace, BooksState } from "../store/books";

const BooksStore = namespace(booksStoreNamespace);

@Component({
  components: {
    ListView,
    Book,
  },
})
export default class BooksView extends Vue {
  @BooksStore.State("books") books: BooksState["books"];
}
</script>
