<template>
  <div>
    <v-dialog
      v-model="showDialog"
      max-width="500px"
      @click:outside="closeDialog"
    >
      <v-card tile="false">
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
                @keydown.enter="search"
              >
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn color="primary" :loading="loading" @click="search">
                Search
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="totalItems" class="mt-0">
            <v-col> Searched items: {{ totalItems }} </v-col>
          </v-row>
          <v-list>
            <InfiniteScroll
              v-bind="infiniteScrollProps"
              @loadMoreItems="loadItems"
            >
              <template v-slot="{ item }">
                <v-list-item three-line>
                  <v-row>
                    <v-col cols="2">
                      <v-img
                        :lazy-src="item.icon"
                        v-if="item.icon"
                        :src="item.icon"
                        alt="book"
                        class="my-auto"
                      />
                      <v-img
                        alt="book"
                        v-if="!item.icon"
                        src="/default-image-book.png"
                        class="my-auto"
                      />
                    </v-col>
                    <v-col>
                      <div style="color: black">{{ item.name }}</div>
                      <div>
                        Authors:
                        {{ item.authors.length > 0 ? item.authors[0] : "" }}
                      </div>
                      <div>{{ item.publishedDate }}</div>
                    </v-col>
                    <v-col cols="2" class="my-auto">
                      <v-btn @click="selected(item.selfLink)">Add</v-btn>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-divider></v-divider>
              </template>
            </InfiniteScroll>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="closeDialog"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, ModelSync, Emit } from "nuxt-property-decorator";
import InfiniteScroll, { InfiniteScrollProps } from "./InfiniteScroll.vue";

@Component({
  components: {
    InfiniteScroll,
  },
})
export default class BookDialog extends Vue {
  @ModelSync("dialog", "opened") showDialog: boolean;
  searchString = "";
  loading = false;
  totalItems = 0;

  infiniteScrollProps: InfiniteScrollProps = {
    page: 0,
    pageSize: 20,
    items: [],
    lastPage: 0,
  };

  closeDialog() {
    this.showDialog = false;
    this.totalItems = 0;
    this.infiniteScrollProps.items = [];
    this.searchString = "";
  }

  async search() {
    this.totalItems = 0;
    this.infiniteScrollProps.page = 0;
    this.infiniteScrollProps.lastPage = 0;
    this.infiniteScrollProps.items = [];
    if (this.searchString.length == 0) {
      return;
    }
    await this.loadItems(0, this.infiniteScrollProps.pageSize);
  }

  async loadItems(page: number = 0, pageSize: number = 20) {
    try {
      this.loading = true;
      const { data } = await this.$axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: `intitle:${this.searchString}`,
            maxResults: pageSize,
            startIndex: pageSize * page,
          },
        }
      );
      for (const book of data.items) {
        this.infiniteScrollProps.items.push({
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
      this.totalItems = data.totalItems;
      this.infiniteScrollProps.page = page;
      this.infiniteScrollProps.lastPage = Math.floor(
        this.totalItems / pageSize
      );
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  @Emit()
  selected(link: string) {
    this.closeDialog();
  }
}
</script>

<style>
.v-dialog.v-dialog--active::-webkit-scrollbar {
  width: 9px;
  padding-right: 5px;
}

.v-dialog.v-dialog--active::-webkit-scrollbar-thumb {
  border: 3px solid transparent;
  border-radius: 150px;
  background-color: gray;
  background-clip: content-box;
}

.v-dialog.v-dialog--active::-webkit-scrollbar-track {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.v-dialog.v-dialog--active::-webkit-scrollbar-track {
  background: white;
}
</style>

