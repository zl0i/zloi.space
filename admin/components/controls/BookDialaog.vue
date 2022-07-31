<template>
  <div>
    <v-dialog v-model="showDialog" max-width="500px">
      <v-card>
        <v-card-title> Add Book </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                dense
                hide-details
                label="Book title"
                v-model="searchString"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn color="primary" :loading="loading" @click="search">
                Search
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="totalItems"> Searched items: {{ totalItems }} </v-row>
          <v-row v-for="(book, i) in books" :key="i">
            <v-col cols="2">
              <v-img :lazy-src="book.icon" :src="book.icon" alt="book" />
            </v-col>
            <v-col>
              <div style="color: black">{{ book.name }}</div>
              <div>{{ book.authors[0] }}</div>
              <div>{{ book.publishedDate }}</div>
            </v-col>
            <v-col cols="2" class="my-auto">
              <v-btn @click="selected(book.selfLink)">Add</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="showDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, ModelSync, Emit } from "nuxt-property-decorator";
import { IBook } from "~/store/books";

interface IAdvBook extends IBook {
  selfLink: string;
  authors: string[];
  publishedDate: string;
}

@Component({})
export default class BookDialog extends Vue {
  books: IAdvBook[] = [];
  searchString = "Чистый код";
  loading = false;
  totalItems = 0;
  @ModelSync("dialog", "opened") showDialog: boolean;

  async search() {
    try {
      this.loading = true;
      const { data } = await this.$axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: `intitle:${this.searchString}`,
          },
        }
      );
      this.totalItems = data.totalItems;
      this.books = [];
      for (const book of data.items) {
        this.books.push({
          id: book.id,
          name: book.volumeInfo?.title,
          icon: book.volumeInfo?.imageLinks?.thumbnail,
          status: "unread",
          description: book.volumeInfo?.description,
          selfLink: book.selfLink,
          authors: book.volumeInfo?.authors ?? [],
          publishedDate: book.volumeInfo?.publishedDate,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  @Emit()
  selected(link: string) {}
}
</script>

