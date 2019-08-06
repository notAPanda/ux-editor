<template>
  <div class="editor">
    <section id="assets-panel" v-if="0">assets</section>
    <section id="toolbar-panel">
      <ul class="nav">
        <li @click="addElement({ type: 'text' })">
          <span><i class="fas fa-font"></i></span>
        </li>
        <li @click="addElement({ type: 'box' })">
          <span><i class="far fa-square"></i></span>
        </li>
        <li @click="addElement({ type: 'oval' })">
          <span><i class="far fa-circle"></i></span>
        </li>
        <li @click="addElement({ type: 'icon' })">
          <span><i class="fas fa-heart"></i></span>
        </li>
      </ul>
    </section>
    <div id="workbench" ref="workbench">
      <FreeCanvas ref="freeCanvas"></FreeCanvas>
    </div>
    <section id="properties-panel">
      <Properties></Properties>
    </section>
  </div>
</template>

<script>
import FreeCanvas from "@/components/FreeCanvas.vue";
import Properties from "@/components/Properties.vue";

export default {
  name: "editor",
  components: {
    FreeCanvas,
    Properties
  },
  methods: {
    addElement(payload) {
      const scrollTop = Math.abs(
        this.$refs.freeCanvas.$el.getBoundingClientRect().y
      );
      this.$store.commit("addElement", {
        ...payload,
        y: scrollTop + 10,
        x: 100
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.editor {
  flex: 1;
  display: flex;
  flex-direction: row;

  #assets-panel {
    width: 255px;
  }
  #toolbar-panel {
    width: 40px;
    background-color: #f6f6f6;
  }
  #properties-panel {
    width: 280px;
  }
  #workbench {
    flex: 1;
    background-color: #f6f6f6;
    overflow: auto;
    height: 100%;
    position: relative;
  }
}
ul.nav {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    cursor: pointer;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: rgba($black, 0.2);
    }
  }
}
</style>
