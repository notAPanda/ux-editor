<template>
  <div
    class="free-canvas"
    ref="freeCanvas"
    :style="getCanvasStyles()"
    @mousedown="handleSelection"
  >
    <div
      v-if="selecting"
      class="selector"
      :style="getSelectorStyles(selector)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import select from "@/helpers/select";

export default {
  name: "FreeCanvas",
  computed: {
    canvas() {
      return this.$store.state.canvas;
    },
    elements() {
      return this.$store.state.elements;
    },
    selectedElementsCount() {
      return this.$store.state.elements.filter(el => el.selected).length;
    },
    isEditing() {
      return this.$store.state.elements.filter(el => el.editing).length === 1;
    }
  },
  mounted() {
    this.$parent.$refs.workbench.scrollLeft = this.canvas.marginX / 2 - 50;
    this.$parent.$refs.workbench.scrollTop = this.canvas.marginY / 2 - 50;
  },
  data() {
    return {
      selector: {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      },
      selecting: false
    };
  },
  methods: {
    handleSelection(event) {
      if (this.isEditing) {
        return null;
      }
      event.stopPropagation();
      event.preventDefault();
      const offsetX = this.$refs.freeCanvas.getBoundingClientRect().x;
      const offsetY = this.$refs.freeCanvas.getBoundingClientRect().y;
      const drag = select(
        {
          startX: event.pageX,
          startY: event.pageY
        },
        payload => {
          this.selecting = true;
          const selector = {
            ...payload,
            x: payload.x - offsetX,
            y: payload.y - offsetY
          };
          this.selector = selector;
          this.$store.commit("selectElements", {
            ...selector,
            x: selector.x - this.canvas.marginX / 2,
            y: selector.y - this.canvas.marginY / 2
          });
        }
      );
      this.onDrag(drag);
    },
    onDrag(drag) {
      const up = () => {
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", up);
        this.selecting = false;
      };
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", up);
    },
    getSelectorStyles(selector) {
      return {
        width: `${selector.width}px`,
        height: `${selector.height}px`,
        top: `${selector.y}px`,
        left: `${selector.x}px`
      };
    },
    getCanvasStyles() {
      return {
        width: `${this.canvas.width + this.canvas.marginX}px`,
        height: `${this.canvas.height + this.canvas.marginY}px`
      };
    }
  }
};
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
