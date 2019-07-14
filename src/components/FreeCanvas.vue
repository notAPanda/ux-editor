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
    this.$refs.freeCanvas.scrollIntoView({behavior: "auto", inline: "center"})
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

<style scoped lang="scss">
  .free-canvas {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
