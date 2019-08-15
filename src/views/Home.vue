<template>
  <div class="home">
    <div class="center middle text-center">
      <div class="mb-3">
        <button @click.prevent="loadNewProject" class="btn btn-block">
          Start a new project
        </button>
      </div>
      <div class="mb-3">
        <button @click.prevent="loadSampleProject" class="btn btn-block">
          Load a sample project
        </button>
      </div>
      <div class="mb-3">
        <button @click.prevent="handleImportClick" class="btn btn-block">
          Import project from file
        </button>
        <input
          ref="fileInput"
          type="file"
          id="fileElem"
          accept="application/json"
          style="display:none"
          @change="handleFiles"
        />
      </div>
      <div class="mb-3">
        <router-link class="btn btn-block" to="/about"
          >About 99drafts</router-link
        >
      </div>
      <div class="mb-3">
        <a
          class="btn btn-block"
          href="https://www.buymeacoffee.com/99drafts"
          target="_blank"
          >Buy me a coffee</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import sample from "@/assets/sample.json";

export default {
  methods: {
    handleFiles(e) {
      const file = e.target.files[0];
      const r = new FileReader();
      r.onload = e => {
        const content = e.target.result;
        const json = JSON.parse(content);
        this.loadData(json);
      };
      r.readAsText(file);
    },
    handleImportClick() {
      this.$refs.fileInput.click();
    },
    loadData(json) {
      this.$store.replaceState(json);
      this.$router.push({ name: "editor" });
    },
    loadSampleProject() {
      this.$store.replaceState(sample);
      this.$router.push({ name: "editor" });
    },
    loadNewProject() {
      this.$store.replaceState({
        canvas: {
          type: "canvas",
          width: 1024,
          height: 3000,
          marginX: 400,
          marginY: 400,
          selected: false
        },
        elements: []
      });
      this.$router.push({ name: "editor" });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.home {
  display: flex;

  .center {
    margin: 40px auto;
  }

  .mb-3 {
    margin-bottom: 30px;
  }

  .text-center {
    text-align: center;
  }

  .btn {
    font-size: $font-size;
    /* default for <button>, but useful for <a> */
    display: inline-block;
    text-align: center;
    text-decoration: none;

    /* create a small space when buttons wrap on 2 lines */
    margin: 2px 0;

    /* invisible border (will be colored on hover/focus) */
    border: solid 1px transparent;

    /* size comes from text & padding (no width/height) */
    padding: 1.5em 3em;

    /* make sure colors have enough contrast! */
    color: $white;
    background-color: $primary;
    cursor: pointer;

    &:active {
      transform: translateY(1px);
      filter: saturate(150%);
    }
    &:hover {
      color: $primary;
      border-color: currentColor;
      background-color: white;
    }
  }

  .btn-block {
    width: 100%;
  }
}
</style>
