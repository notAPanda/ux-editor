<template>
  <div
    class="free-canvas"
    ref="freeCanvas"
    :style="getCanvasStyles()"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FreeCanvas',
  computed: {
    canvas () {
      return this.$store.state.canvas
    }
  },
  mounted () {
  },
  methods: {
    getCanvasStyles () {
      return {
        width: `${this.canvas.width + 500}px`,
        height: `${this.canvas.height + 100}px`
      }
    }
  }
}
</script>

<style lang="scss">
.abs {
  position: absolute;
  top: 0;
  left: 0;
}
.free-canvas {
  position: absolute;
  top: 0;
  left: 0;
  flex-basis: 100%;
}
</style>
