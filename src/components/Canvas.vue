<template>
  <div class="canvas" ref="canvas" :style="getCanvasStyles()">
    <div
      v-for="element in elements"
      :key="element.id"
      :class="
        `element${element.type === ' text' ? ' element-text' : ''}${
          element.editing === true ? ' element-text__editing' : ''
        }`
      "
      :style="getElementStyles(element)"
      :ref="`element${element.id}`"
    >
      <div
        :ref="`element${element.id}p`"
        :contenteditable="element.type === 'text'"
        @blur="endEditing(element, $event)"
        @input="onInput(element)"
        spellcheck="false"
      >
        {{ element.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { roundTo } from "@/helpers/styler";

const selectElementContents = el => {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
};

export default {
  name: "Canvas",
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      editor: null
    };
  },
  mounted() {},
  computed: {
    elements() {
      return this.$store.state.elements;
    },
    canvas() {
      return this.$store.state.canvas;
    },
    selectedElement() {
      return this.selectedElements[0];
    },
    selectedElements() {
      return this.$store.state.elements.filter(el => el.selected);
    },
    selectedElementsCount() {
      return this.$store.state.elements.filter(el => el.selected).length;
    }
  },
  methods: {
    onInput(element) {
      this.$store.commit("updateElement", {
        ...element,
        height: this.$refs[`element${element.id}p`][0].offsetHeight
      });
    },
    focus(element) {
      const input = this.$refs[`element${element.id}p`][0];
      selectElementContents(input);
      setTimeout(() => input.focus(), 0);
    },
    endEditing(element, event) {
      this.$store.commit("updateElement", {
        ...element,
        height: event.target.clientHeight,
        text: event.target.innerText,
        selected: true,
        editing: false
      });
    },
    getElementStyles(element) {
      const styles = element.styles ? element.styles : {};
      return {
        width: `${element.width}px`,
        height: `${element.height}px`,
        transform: `rotate(0deg) translate(${roundTo(element.x)}px, ${roundTo(
          element.y
        )}px) rotate(${element.angle}deg)`,
        "transform-origin": "0 0 0",
        ...styles
      };
    },
    getCanvasStyles() {
      return {
        width: `${this.canvas.width}px`,
        height: `${this.canvas.height}px`,
        margin: `${this.canvas.marginY / 2}px ${this.canvas.marginX / 2}px`
      };
    }
  }
};
</script>

<style lang="scss">
.canvas {
  background-color: #fff;
  position: absolute;
  z-index: auto;
  backface-visibility: hidden;
}

.element {
  position: absolute;
  &.element-text {
    overflow-wrap: break-word;
    cursor: default;
  }
  p {
    margin: 0;
    padding: 0;
  }
}
</style>
