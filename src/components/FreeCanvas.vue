<template>
  <div
    class="free-canvas"
    ref="freeCanvas"
    :style="getCanvasStyles()"
    @mousedown="handleSelection"
  >
    <div v-if="selecting" class="selector" :style="getSelectorStyles(selector)"></div>
    <slot></slot>
  </div>
</template>

<script>
import { select } from '@/helpers/scale'

export default {
  name: 'FreeCanvas',
  computed: {
    canvas () {
      return this.$store.state.canvas
    }
  },
  mounted () {
  },
  data () {
    return {
      selector: {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      },
      selecting: false
    }
  },
  methods: {
    handleSelection (event) {
      event.stopPropagation()
      event.preventDefault()
      const offsetX = this.$refs.freeCanvas.getBoundingClientRect().x
      const offsetY = this.$refs.freeCanvas.getBoundingClientRect().y
      const drag = select({
        startX: event.pageX,
        startY: event.pageY,
      }, (payload) => {
        this.selecting = true
        this.selector = {
          ...payload,
          x: payload.x - offsetX,
          y: payload.y - offsetY
        }
      })
      this.onDrag(drag)
    },
    onDrag (drag) {
      const up = () => {
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', up)
        this.selecting = false
      }
      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', up)
    },
    getSelectorStyles (selector) {
      return {
        width: `${selector.width}px`,
        height: `${selector.height}px`,
        top: `${selector.y}px`,
        left: `${selector.x}px`
      }
    },
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
.selector {
  border: 1px dotted blue;
  position: absolute;
}
</style>
