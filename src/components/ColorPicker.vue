<template>
  <div>
    <button
      class="colorpicker-button"
      @click="showColorpicker"
      :style="styles"
    ></button>
    <div
      class="colorpicker"
      v-show="editColor"
      :style="{ top: `${pos.y}px`, left: `${pos.x - 240}px` }"
    >
      <Sketch @input="updateValue" :value="color"></Sketch>
    </div>
  </div>
</template>

<script>
import { Sketch } from "vue-color";

export default {
  name: "ColorPicker",
  props: ["property"],
  components: {
    Sketch
  },
  computed: {
    selectedElement() {
      return this.$store.state.elements.filter(el => el.selected)[0];
    },
    color() {
      return this.selectedElement.styles[this.property];
    },
    styles() {
      return {
        background: this.color
      };
    }
  },
  data() {
    return {
      pos: { x: 0, y: 0 },
      editColor: false
    };
  },
  methods: {
    showColorpicker(event) {
      this.pos = event.target.getBoundingClientRect();
      this.editColor = !this.editColor;
    },
    updateValue(value) {
      let rgba = `rgba(${value.rgba.r},${value.rgba.g},${value.rgba.b},${
        value.rgba.a
      })`;
      let newEl = { ...this.selectedElement };
      newEl.styles[this.property] = rgba;
      this.$store.commit("updateElement", newEl);
    }
  }
};
</script>

<style lang="scss">
.colorpicker {
  position: fixed;
}
.colorpicker-button {
  border: 1px solid #666666;
  outline: 0;
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
</style>
