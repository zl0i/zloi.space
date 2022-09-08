<template>
  <v-container fluid class="ml-5">
    <v-row class="mt-2">
      <h2>Links</h2>
      <v-btn color="accent" @click="addLink" icon>
        <v-icon color="black">mdi-plus-circle-outline</v-icon>
      </v-btn>
    </v-row>
    <v-row v-for="(link, i) of links" :key="link.id">
      <v-col cols="24" lg="1">
        <TextField label="Name" v-model="link.name" />
      </v-col>
      <v-col cols="12" lg="5">
        <TextField label="Link" v-model="link.link" />
      </v-col>
      <v-col cols="12" lg="3">
        <v-file-input
          accept="image/*"
          label="icon"
          dense
          outlined
          hide-details
          show-size
          truncate-length="20"
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
      >
        {{ textButton(link.id) }}
      </v-btn>
      <DeleteRowButton @agree="remove(i)" :openCondition="[link.name, link.link, link.blob]" />
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Component, Vue } from "nuxt-property-decorator";
import TextField from "./controls/TextField.vue";
import DeleteRowButton from "./controls/DeleteRowButton.vue";

interface Link {
  id: number;
  name: string;
  link: string;
  blob: string;
  loading: boolean;
}

@Component({
  components: {
    TextField,
    DeleteRowButton,
  },
  async mounted() {
    try {
      this.$data.links = await this.$api.pullLinks();
    } catch (error) {
      console.log(error);
      throw new Error("Error get links");
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

  textButton(id: number) {
    return id < 1 ? "create" : "update";
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
      throw new Error("Error create links");
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
      throw new Error("Error update links");
    } finally {
      Vue.set(this.links, index, {
        ...this.links[index],
        loading: false,
      });
    }
  }

  async remove(index: number) {
    const link = this.links[index];
    if (link.name) {
      await this.$api.deleteLink(link.id);
    }
    this.links.splice(index);
  }
}
</script>