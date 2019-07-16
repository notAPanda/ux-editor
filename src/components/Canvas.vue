<template>
  <div class="canvas"
    ref="canvas"
    :style="getCanvasStyles()"
    @mousedown="selectCanvas(canvas)"
  >
    <FreeTransform
      v-for="element in elements"
      :selected="selectedElement.id === element.id"
      :selectOn="'mousedown'"
      @onSelect="selectElement(element)"
      :key="element.id"
      :x="element.x"
      :y="element.y"
      :scale-x="element.scaleX"
      :scale-y="element.scaleY"
      :width="element.width"
      :height="element.height"
      :angle="element.angle"
      :offset-x="offsetX"
      :offset-y="offsetY"
      :disable-scale="element.disableScale === true"
      @update="update(element, $event)"
    >
      <div class="element" :style="getElementStyles(element)">{{element.text}}</div>
    </FreeTransform>
  </div>
</template>

<script>
import FreeTransform from '@/components/FreeTransform.vue'

export default {
  name: 'Canvas',
  components: {
    FreeTransform
  },
  data () {
    return {
      offsetX: 0,
      offsetY: 0
    }
  },
  mounted () {
    this.$refs.canvas.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'center' })
    this.offsetX = this.$refs.canvas.getBoundingClientRect().x
    this.offsetY = this.$refs.canvas.getBoundingClientRect().y
  },
  computed: {
    elements () {
      return this.$store.state.elements
    },
    canvas () {
      return this.$store.state.canvas
    },
    selectedElement () {
      return this.$store.state.selectedElement
    }
  },
  methods: {
    selectCanvas (canvas) {
      this.$store.commit('selectElement', canvas)
    },
    selectElement (element) {
      if (this.selectedElement.id === element.id) {
        return null
      }
      this.$store.commit('selectElement', element)
    },
    update (element, payload) {
      this.$store.commit('updateElement', {
        ...element,
        ...payload
      })
    },
    getElementStyles (element) {
      const styles = element.styles ? element.styles : {}
      return {
        width: element.disableScale === true ? `100%` : `${element.width}px`,
        height: element.disableScale === true ? `100%` : `${element.height}px`,
        ...styles
      }
    },
    getCanvasStyles () {
      return {
        width: `${this.canvas.width}px`,
        height: `${this.canvas.height}px`,
        margin: `250px auto`
      }
    }
  }
}
</script>

<style lang="scss">
.canvas {
  background-color: #fff;
}
</style>
