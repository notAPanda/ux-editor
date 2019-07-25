<template>
  <div class="editor">
    <section id="assets-panel" v-if="0">assets</section>
    <section id="toolbar-panel">
      <ul class="nav">
        <li @click="addElement({ type: 'text' })">
          <span><fa-icon :icon="['fas', 'font']"></fa-icon></span>
        </li>
        <li @click="addElement({ type: 'box' })">
          <span><fa-icon :icon="['far', 'square']"></fa-icon></span>
        </li>
        <li @click="addElement({ type: 'oval' })">
          <span><fa-icon :icon="['far', 'circle']"></fa-icon></span>
        </li>
        <li @click="addElement({ type: 'line' })">
          <span>|</span>
        </li>
      </ul>
    </section>
    <div id="workbench" ref="workbench">
      <FreeCanvas>
        <Canvas></Canvas>
      </FreeCanvas>
    </div>
    <section id="properties-panel">
      <Properties></Properties>
    </section>
  </div>
</template>

<script>
import FreeCanvas from "@/components/FreeCanvas.vue";
import Canvas from "@/components/Canvas.vue";
import Properties from "@/components/Properties.vue";

export default {
  name: "editor",
  components: {
    FreeCanvas,
    Canvas,
    Properties
  },
  methods: {
    addElement(payload) {
      this.$store.commit("addElement", payload);
    }
  }
};
</script>

<style lang="scss">
$black: #000000;

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
