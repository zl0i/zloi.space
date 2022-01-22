<template>
  <ListView title="Reads" :model="books">
    <template v-slot:default="props">
      <Book
        :name="props?.item?.name"
        :image="props?.item?.image"
        :isRead="props?.item?.isRead"
      />
    </template>
  </ListView>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ListView from "./ListView.vue";
import Book from "../elements/Book.vue";
import axios from "axios";

interface IBook {
  id: string;
  name: string;
  image: string;
  isRead: boolean;
}

@Options({
  components: {
    ListView,
    Book,
  },
})
export default class BooksView extends Vue {
  books: IBook[] = [];

  created() {
    this.getBook();
  }

  sortByName<T extends { name: string }>(a: T, b: T) {
    return a.name.localeCompare(b.name);
  }

  sortBooks() {
    const read = this.books.filter((item) => item.isRead);
    const unread = this.books.filter((item) => !item.isRead);
    return [...read.sort(this.sortByName), ...unread.sort(this.sortByName)];
  }

  getBook() {
    axios
      .get(window.location.href + "/reads.json")
      .then((res) => {
        for (const book of res.data) {
          axios
            .get(book.link)
            .then((res2) => {
              const obj: IBook = {
                id: res2.data.id,
                name: res2.data.volumeInfo.title,
                image: res2.data.volumeInfo?.imageLinks?.thumbnail,
                isRead: book.read,
              };
              this.books.push(obj);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
