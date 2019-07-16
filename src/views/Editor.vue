<template>
  <div class="editor">
    <section id="assets-panel">assets</section>
    <section id="toolbar-panel" class="has-text-centered">
      <button class="button is-small" @click="addElement">
        <span class="icon is-small">
          <fa-icon :icon="['far', 'square']"></fa-icon>
        </span>
      </button>
    </section>
    <div id="workbench">
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
import FreeCanvas from '@/components/FreeCanvas.vue'
import Canvas from '@/components/Canvas.vue'
import Properties from '@/components/Properties.vue'

export default {
  name: 'editor',
  components: {
    FreeCanvas,
    Canvas,
    Properties
  },
  methods: {
    addElement () {
      this.$store.commit('addElement')
    }
  }
}
</script>

<style lang="scss" scoped>
.editor {
  flex: 1;
  display: flex;
  flex-direction: row;

  #assets-panel {
    width: 255px;
  }
  #toolbar-panel {
    margin-top: 3px;
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
</style>
