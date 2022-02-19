<template>
  <div>
    <ListView
      :title="$t('headers.knoweledge')"
      link="https://github.com/zl0i/KnowledgeBase"
      :model="sorted()"
    >
      <template v-slot:default="props">
        <Instruction
          :name="props?.item?.name"
          :html="props?.item?.html"
          @open="showDialog"
        />
      </template>
    </ListView>
    <InstructionDialog
      v-if="showModal"
      @close="closeDialog"
      :name="modelName"
      :text="modelHtml"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Watch } from "vue-property-decorator";
import ListView from "./ListView.vue";
import Instruction from "../elements/Instruction.vue";
import InstructionDialog from "../elements/InstructionDialog.vue";
import axios from "axios";
import { marked } from "marked";
import "vue-router";

const formula = {
  name: "formula",
  level: "inline",
  start(src: string) {
    return src.match(/\$\$\n.*?\s{0,}\$\$/)?.index;
  },
  tokenizer(src: string, _tokens: any) {
    const rule = /\$\$\n.*?\s{0,}\$\$/;
    const match = rule.exec(src);
    if (match) {
      const token = {
        type: "formula",
        raw: src.replace(
          rule,
          `<div class="formula">${match[0].replace(/\$/gm, "")}</div>`
        ),
        tokens: [],
      };
      return token;
    }
  },
  renderer(token: any) {
    return token.raw;
  },
};
marked.setOptions({
  renderer: new marked.Renderer(),
  langPrefix: "hljs language-",
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});
marked.use({ extensions: [formula] });

interface IInstruction {
  id: string;
  name: string;
  text: string;
  html: string;
}

@Options({
  components: {
    ListView,
    Instruction,
    InstructionDialog,
  },
})
export default class KnoweledgeView extends Vue {
  instructions: IInstruction[] = [];
  showModal = false;
  modelName = "";
  modelHtml = "";
  private opening: string = "";

  created() {
    this.getInstructions();
    this.$router.beforeEach((to, _from, next) => {
      if (to.hash == "" || to.hash == "#knowledge") {
        this.showModal = false;
      } else {
        this.opening = to.hash.replace(/-/g, " ");
        this.opening = this.opening.replace(/#/, "");
      }
      next();
    });
    import(
      /* webpackChunkName: "highlight.js" */ /* webpackPrefetch: -1 */ "highlight.js"
    ).then((lib) => {
      const hljs = lib.default;
      marked.setOptions({
        ...marked.options,
        highlight: function (code: string, lang: string) {
          const language = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(code, { language }).value;
        },
      });
      this.instructions.forEach((item) => {
        item.html = marked(item.text);
        if (item.name == this.modelName) {
          this.modelHtml = item.html;
        }
      });
    });
  }

  @Watch("instructions")
  sorted() {
    return this.instructions.sort((a, b) => a.name.localeCompare(b.name));
  }

  getInstructions() {
    axios
      .get("https://api.github.com/repos/zl0i/KnowledgeBase/contents")
      .then((res) => {
        for (const file of res.data) {
          if (file.name.includes(".md")) {
            axios
              .get(file.download_url)
              .then((res2) => {
                const obj: IInstruction = {
                  id: file.sha,
                  name: file.name,
                  text: res2.data,
                  html: marked(res2.data),
                };
                this.instructions.push(obj);
                if (this.opening == obj.name) {
                  this.openDialogByHash(obj.name, obj.html);
                  this.opening = "";
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openDialogByHash(name: string, html: string) {
    document.body.style.overflow = "hidden";
    this.modelName = name;
    this.modelHtml = html;
    this.showModal = true;
  }

  showDialog(name: string, html: string) {
    document.body.style.overflow = "hidden";
    this.modelName = name;
    this.modelHtml = html;
    this.showModal = true;
    this.$router.push({
      path: "/",
      hash: "#" + name.replace(/ /g, "-"),
    });
  }

  closeDialog() {
    document.body.style.overflow = "auto";
    this.showModal = false;
    this.$router.push({
      path: "/",
      hash: "#knowledge",
    });
    window.scrollTo({
      top: (document.getElementById("knowledge") as HTMLElement).offsetTop,
      left: 0,
    });
  }
}
</script>
