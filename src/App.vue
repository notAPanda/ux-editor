<template>
  <div id="app">
    <nav id="nav" class="navbar has-shadow">
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Editor</router-link>
          <a href="" @click.prevent="exportFile" class="navbar-item">Export</a>
          <a href="" @click.prevent="handleImportClick" class="navbar-item"
            >Import</a
          >
          <input
            ref="fileInput"
            type="file"
            id="fileElem"
            accept="application/json"
            style="display:none"
            @change="handleFiles"
          />
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import download from "downloadjs";

export default {
  computed: {
    data() {
      return this.$store.state;
    }
  },
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
    },
    exportFile() {
      const fileName = prompt("File name:", "ux-project");
      download(
        JSON.stringify(this.data),
        `${fileName}.json`,
        "application/json"
      );
    }
  }
};
</script>

<style lang="scss">
@import "~normalize.css/normalize.css";
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

html,
body,
#app {
  height: 100%;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: sans-serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 12px;
    margin: 0;
    font-weight: normal;
  }
}

#nav {
  background: $light-grey;
  height: 40px;
  border-bottom: 1px solid rgba($black, 0.1);
  display: flex;
  align-items: center;

  .navbar-menu {
    margin: 0 10px;

    .navbar-item:not(:first-child) {
      margin: 0 0 0 10px;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }
}
</style>
