<template>
  <v-container fluid class="ml-5">
    <v-row class="mt-2">
      <h2>Books</h2>
      <v-btn color="accent" @click="dialog = true" icon>
        <v-icon color="black">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row v-for="(book, i) in books" :key="book.id">
      <v-col cols="1" class="my-auto">
        <v-img
          v-if="book.icon"
          :lazy-src="book.icon"
          :src="book.icon"
          alt="book"
          max-height="150"
          max-width="100"
        />
        <v-img
          v-if="!book.icon"
          src="/default-image-book.png"
          alt="book"
          max-height="150"
          max-width="100"
        />
      </v-col>
      <v-col cols="3" class="my-auto">
        <v-row>
          <v-text-field
            hide-details
            dense
            readonly
            outlined
            :value="book.name"
            class="mb-5"
          >
          </v-text-field>
        </v-row>
        <v-row>
          <v-col class="pl-0">
            <v-select
              hide-details
              dense
              outlined
              :items="statuses"
              v-model="book.status"
              @change="updateBook(book.id, book.status)"
            >
            </v-select>
          </v-col>
          <v-col cols="2"><DeleteRowButton @agree="deleteBook(i)" /></v-col>
        </v-row>
      </v-col>
      <v-col class="my-auto mr-5">
        <v-textarea
          hide-details
          dense
          readonly
          outlined
          height="150"
          :value="book.description"
        >
        </v-textarea>
      </v-col>
    </v-row>
    <BookDialaog v-model="dialog" @selected="addBook" />
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from "nuxt-property-decorator";
import BookDialaog from "./controls/BookDialaog.vue";
import DeleteRowButton from "./controls/DeleteRowButton.vue";
import { IBook } from "~/store/books";

@Component({
  async mounted() {
    const books = await this.$api.books.get();
    this.$data.books = books;
  },
  components: {
    BookDialaog,
    DeleteRowButton,
  },
})
export default class Books extends Vue {
  books: IBook[] = [];
  dialog = false;

  statuses = ["unread", "inprogress", "read"] as const;

  async addBook(link: string) {
    await this.$api.books.add(link);
    this.books = await this.$api.books.get();
  }

  async updateBook(id: number, status: string) {
    await this.$api.books.update(id, status);
  }

  async deleteBook(i: number) {
    await this.$api.books.delete(this.books[i].id);
    this.books.splice(i, 1);
  }
}
</script>