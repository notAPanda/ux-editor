<template>
  <div class="canvas"
    ref="canvas"
    :style="getCanvasStyles()"
    @mousedown="selectCanvas(canvas)"
  >
    <FreeTransform v-for="element in elements"
      :class-prefix="element.type === 'text' ? 'text' : null"
      :selected="element.selected"
      :multiple-selected="selectedElementsCount > 1"
      :editing="element.editing"
      selectOn="mousedown"
      @onSelect="selectElement(element)"
      @dblclick="onDblclick(element)"
      @addToSelectedElements="addToSelectedElements(element)"
      :key="element.id"
      :x="element.x"
      :y="element.y"
      :width="element.width"
      :height="element.height"
      :angle="element.angle"
      :offset-x="offsetX"
      :offset-y="offsetY"
      :disable-scale="element.disableScale === true"
      @update="update(element, $event)"
      @updateMultiple="updateMultiple"
    >
      <div :class="`element`"
        :style="getElementStyles(element)">
        <div :class="`element-${element.type}`" :ref="`element-${element.id}-text`" v-if="element.text" :contenteditable="element.editing" @blur="endEditing(element, $event)">{{element.text}}</div>
      </div>
    </FreeTransform>
  </div>
</template>

<script>
import FreeTransform from '@/components/FreeTransform.vue'
import hotkeys from 'hotkeys-js'

export default {
  name: 'Canvas',
  components: {
    FreeTransform
  },
  data () {
    return {
      offsetX: 0,
      offsetY: 0,
      editor: null
    }
  },
  mounted () {
    this.offsetX = this.$refs.canvas.getBoundingClientRect().x
    this.offsetY = this.$refs.canvas.getBoundingClientRect().y

    hotkeys('command+backspace, delete', (e, handler) => {
      this.$store.commit('removeElement', this.selectedElement)
      this.$store.commit('selectElement', { id: null, type: null })
    })
    hotkeys('command+c, ctrl+c', (e, handler) => {
      // copy element to memory
    })
    hotkeys('command+v, ctrl+v', (e, handler) => {
      // paste from memory
    })
  },
  computed: {
    elements () {
      return this.$store.state.elements
    },
    canvas () {
      return this.$store.state.canvas
    },
    selectedElement () {
      return this.selectedElements[0]
    },
    selectedElements () {
      return this.$store.state.elements.filter(el => el.selected)
    },
    selectedElementsCount () {
      return this.$store.state.elements.filter(el => el.selected).length
    }
  },
  methods: {
    endEditing (element, event) {
      this.$store.commit('updateElement', {
        ...element,
        height: event.target.clientHeight,
        text: event.target.innerText,
        selected: true,
        editing: false
      })
    },
    onDblclick (element) {
      this.$store.commit('editElement', element)
    },
    selectCanvas (canvas) {
      this.$store.commit('clearSelection', canvas)
    },
    selectElement (element) {
      this.$store.commit('selectElement', element)
    },
    addToSelectedElements (element) {
      this.$store.commit('addToSelectedElements', element)
    },
    update (element, payload) {
      if (element.type === 'text') {
        this.$store.commit('updateElement', {
          ...element,
          ...payload,
          height: this.$refs[`element-${element.id}-text`][0].clientHeight
        })
        return null
      }
      this.$store.commit('updateElement', {
        ...element,
        ...payload
      })
    },
    updateMultiple (payload) {
      this.$store.commit('updateMultipleElements', payload)
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
        margin: `${this.canvas.marginY / 2}px ${this.canvas.marginX / 2}px`
      }
    }
  }
}
</script>

<style lang="scss">
.canvas {
  background-color: #fff;
}

.element {
  .element-text {
    overflow-wrap: break-word;
  }
}
</style>
