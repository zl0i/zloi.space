<template>
  <v-container fluid class="ml-5">
    <v-row>
      <v-col sm="2">
        <h2>Links</h2>
      </v-col>
    </v-row>
    <v-row v-for="(link, i) of links" :key="link.id">
      <v-col cols="24" lg="1">
        <v-text-field
          :value="link.name"
          v-model="link.name"
          placeholder="name"
          counter="10"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="3">
        <v-text-field
          :value="link.link"
          v-model="link.link"
          placeholder="url"
          counter="255"
          dense
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2">
        <v-file-input
          accept="image/*"
          label="icon"
          dense
          show-size
          @change="setFile($event, i)"
        >
        </v-file-input>
      </v-col>
      <img
        :src="`${link.blob}`"
        :alt="link.name"
        width="25px"
        height="25px"
        class="my-auto"
      />
      <v-btn
        class="ml-5 my-auto"
        color="accent"
        :loading="link.loading"
        @click="link.id < 1 ? create(i) : update(i)"
        >{{ link.id < 1 ? "create" : "update" }}</v-btn
      >
      <v-btn class="ml-5 my-auto" color="pink" @click="remove(i)">
        <v-icon color="white">mdi-delete</v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-btn color="accent" @click="addLink">
        <v-icon color="white">mdi-plus-circle-outline</v-icon></v-btn
      >
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from "nuxt-property-decorator";

interface Link {
  id: number;
  name: string;
  link: string;
  blob: string;
  loading: boolean;
}

@Component({
  async mounted() {
    try {
      this.$data.links = await this.$api.pullLinks();
    } catch (error) {
      console.log(error);
    }
  },
})
export default class Links extends Vue {
  links: Link[] = [];

  async setFile(file: File, index: number) {
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        Vue.set(this.links, index, {
          ...this.links[index],
          blob: reader.result?.toString(),
        });
      };
    }
  }

  addLink() {
    this.links.push({
      id: Math.random(),
      name: "",
      link: "",
      blob: "",
      loading: false,
    });
  }
  async create(index: number) {
    try {
      Vue.set(this.links, index, {
        ...this.links[index],
        loading: true,
      });
      const link = this.links[index];
      const data = await this.$api.pushLink(link.name, link.link, link.blob);
      Vue.set(this.links, index, {
        ...this.links[index],
        id: data.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      Vue.set(this.links, index, {
        ...this.links[index],
        loading: false,
      });
    }
  }

  async update(index: number) {
    try {
      Vue.set(this.links, index, {
        ...this.links[index],
        loading: true,
      });
      const link = this.links[index];
      await this.$api.patchLink(link.id, link.name, link.link, link.blob);
    } catch (error) {
      console.log(error);
    } finally {
      Vue.set(this.links, index, {
        ...this.links[index],
        loading: false,
      });
    }
  }

  async remove(index: number) {
    try {
      const link = this.links[index];
      if (link.name) {
        await this.$api.deleteLink(link.id);
      }
      this.links.splice(index);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>