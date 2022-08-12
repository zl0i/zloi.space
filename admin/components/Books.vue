<template>
  <v-container fluid>
    <v-row class="mb-1">
      <v-col sm="2" class="my-auto">
        <h2>Books</h2>
      </v-col>
    </v-row>
    <v-row v-for="(book, i) in books" :key="book.id">
      <v-col cols="1">
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
        <v-text-field hide-details dense readonly outlined :value="book.name">
        </v-text-field>
      </v-col>
      <v-col cols="2" class="my-auto">
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
      <v-col class="my-auto">
        <v-text-field
          hide-details
          dense
          readonly
          outlined
          :value="book.description"
        >
        </v-text-field>
      </v-col>
      <v-col cols="1" class="my-auto">
        <DeleteRowButton @agree="deleteBook(i)" />
      </v-col>
    </v-row>
    <v-row class="ma-1 mt-6">
      <BookDialaog v-model="dialog" @selected="addBook" />
      <v-btn color="primary" @click="dialog = true">New</v-btn>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from "nuxt-property-decorator";
import BookDialaog from "./controls/BookDialaog.vue";
import DeleteRowButton from "./controls/DeleteRowButton.vue";
import { IBook } from "~/store/books";

@Component({
  async mounted() {
    const books = await this.$api.getBooks();
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
    try {
      await this.$api.addBook(link);
      this.books = await this.$api.getBooks();
    } catch (error) {
      console.log(error);
    }
  }

  async updateBook(id: number, status: string) {
    try {
      await this.$api.updateBook(id, status);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteBook(i: number) {
    try {
      await this.$api.deleteBook(this.books[i].id);
      this.books.splice(i, 1);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>