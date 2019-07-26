<template>
  <div class="styles">
    <div
      v-for="(value, name, index) in element.styles"
      :key="`input-${name}-${index}`"
    >
      <div class="row mb" v-if="name === 'background'">
        <div class="col">
          <ColorPicker :property="name"></ColorPicker>
        </div>
        <div class="col"></div>
      </div>
      <div class="row mb" v-if="name === 'color'">
        <div class="col">
          <ColorPicker :property="name"></ColorPicker>
        </div>
        <div class="col"></div>
      </div>

      <div v-if="name === 'font-size'">
        <label class="label">Font Size</label>
        <OneWayInput
          :value="value"
          type="text"
          className="input is-small"
          @valueChanged="set($event, payload)"
        ></OneWayInput>
      </div>
      <div v-if="name === 'border-radius'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'opacity'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'mix-blend-mode'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'z-index'">{{ name }}: {{ value }}</div>
    </div>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";
import OneWayInput from "@/components/OneWayInput.vue";

export default {
  name: "Styles",
  methods: {
    set($event, payload) {
      this.$store.commit("updateElement", {
        ...this.element,
        styles: {
          ...this.element.styles,
          [payload.name]: payload.value
        }
      });
    }
  },
  components: {
    ColorPicker,
    OneWayInput
  },
  props: ["element"]
};
</script>

<style lang="scss">
.styles {
  position: relative;
}
</style>
