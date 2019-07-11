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
import FreeTransform from 'vue-free-transform'

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
    this.offsetX = this.$refs.canvas.offsetLeft
    this.offsetY = this.$refs.canvas.offsetTop
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
    selectElement (element){
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
        height: `${this.canvas.height}px`
      }
    }
  }
}
</script>

<style lang="scss">
$point-size: 6px;
$half-point-size: $point-size / 2;

.canvas {
  background-color: #fff;
  position: relative;
}

.tr-transform {
  &--active {
    position: absolute;
    z-index: 5;
    .tr-transform__content {
      .element {
        border: 1px solid #006cff;
      }
    }
  }
  &__content {
    user-select: none;
  }
  &__rotator {
    top: -20px;
    left: calc(50% - #{$half-point-size});
  }
  &__rotator,
  &__scale-point {
    background: #fff;
    width: $point-size;
    height: $point-size;
    // border-radius: 50%;
    position: absolute;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #006cff;
    cursor: pointer;
  }
  &__rotator:hover,
  &__scale-point:hover {
    background: #f1f5f8;
  }
  &__rotator:active,
  &__scale-point:active {
    background: #dae1e7;
  }
  &__scale-point {
    &--tl {
      top: -$half-point-size;
      left: -$half-point-size;
    }
    &--ml {
      top: calc(50% - #{$half-point-size});
      left: -$half-point-size;
    }
    &--tr {
      left: calc(100% - #{$half-point-size});
      top: -$half-point-size;
    }
    &--tm {
      left: calc(50% - #{$half-point-size});
      top: -$half-point-size;
    }
    &--mr {
      left: calc(100% - #{$half-point-size});
      top: calc(50% - #{$half-point-size});
    }
    &--bl {
      left: -$half-point-size;
      top: calc(100% - #{$half-point-size});
    }
    &--bm {
      left: calc(50% - #{$half-point-size});
      top: calc(100% - #{$half-point-size});
    }
    &--br {
      left: calc(100% - #{$half-point-size});
      top: calc(100% - #{$half-point-size});
    }
  }
}
</style>
