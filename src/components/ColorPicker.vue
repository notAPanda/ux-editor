<template>
  <div class="colorpicker-container">
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
      <Sketch @input="updateValue" :value="value"></Sketch>
    </div>
  </div>
</template>

<script>
import { Sketch } from "vue-color";

export default {
  name: "ColorPicker",
  props: ["value", "name"],
  components: {
    Sketch
  },
  computed: {
    styles() {
      return {
        background: this.value
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
      this.$emit("update", rgba);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";

.colorpicker {
  position: fixed;
}
.colorpicker-button {
  border: 1px solid rgba($black, 0.1);
  border-radius: 2px;
  outline: 0;
  width: 100%;
  height: 20px;
}
</style>
