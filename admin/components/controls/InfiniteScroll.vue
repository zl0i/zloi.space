<template>
  <div>
    <div
      v-for="(item, i) in items"
      :key="i"
      v-intersect="onIntersect"
      :data-last="i === items.length - 1"
    >
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export interface InfiniteScrollProps {
  page: number;
  pageSize: number;
  items: unknown[];
  lastPage: number;
  emitByMounted?: boolean;
}

@Component({})
export default class InfiniteScroll extends Vue {
  @Prop() items: unknown[];
  @Prop({ default: 0 }) lastPage: any;
  @Prop({ default: 0 }) page: number;
  @Prop({ default: false }) emitByMounted: boolean;

  mounted() {
    if (this.emitByMounted) {
      this.$emit("loadMoreItems", this.page);
    }
  }

  onIntersect(entries: any, _observer: any) {
    if (
      entries[0].isIntersecting &&
      entries[0].target.dataset.last &&
      this.page < this.lastPage
    ) {
      this.$emit("loadMoreItems", this.page + 1);
    }
  }
}
</script>