<template>
  <div
    class="canvas-overlay"
    ref="canvasOverlay"
    :style="getCanvasStyles()"
    @mousedown="selectCanvas(canvas)"
  >
    <FreeTransform
      v-for="element in elements"
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
      :z-index="element.styles['z-index']"
      :styles="getStyles(element)"
      @update="update(element, $event)"
      @translateMultiple="translateMultiple"
    ></FreeTransform>
  </div>
</template>

<script>
import FreeTransform from "@/components/FreeTransform.vue";
import hotkeys from "hotkeys-js";
import { roundTo } from "@/helpers/styler";

export default {
  name: "CanvasOverlay",
  components: {
    FreeTransform
  },
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      editor: null
    };
  },
  mounted() {
    this.offsetX = this.$refs.canvasOverlay.getBoundingClientRect().x;
    this.offsetY = this.$refs.canvasOverlay.getBoundingClientRect().y;

    hotkeys("command+backspace, delete", (e, handler) => {
      this.$store.commit("removeElement", this.selectedElement);
      this.$store.commit("selectElement", { id: null, type: null });
    });
    hotkeys("command+c, ctrl+c", (e, handler) => {
      // copy element to memory
    });
    hotkeys("command+v, ctrl+v", (e, handler) => {
      // paste from memory
    });
  },
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
    onDblclick(element) {
      if (element.type === "text") {
        this.$store.commit("editElement", element);
        this.$parent.focus(element);
      }
    },
    selectCanvas(canvas) {
      this.$store.commit("clearSelection", canvas);
    },
    selectElement(element) {
      this.$store.commit("selectElement", element);
    },
    addToSelectedElements(element) {
      this.$store.commit("addToSelectedElements", element);
    },
    update(element, payload) {
      if (element.type === "text") {
        this.$store.commit("updateElement", {
          ...element,
          ...payload
          //   height: this.$refs[`element-${element.id}-text`][0].clientHeight
        });
        return null;
      }
      this.$store.commit("updateElement", {
        ...element,
        ...payload
      });
    },
    translateMultiple(payload) {
      this.$store.commit("translateMultipleElements", payload);
    },
    getStyles(element) {
      return {
        width: `${element.width}px`,
        height: `${element.height}px`,
        transform: `rotate(0deg) translate(${roundTo(element.x)}px, ${roundTo(
          element.y
        )}px) rotate(${element.angle}deg)`,
        "transform-origin": "0 0 0",
        position: "absolute"
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
.canvas-overlay {
  position: absolute;
  pointer-events: auto;
}
</style>
