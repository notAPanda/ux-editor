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
          :name="name"
          type="text"
          unit="px"
          className="input is-small"
          @valueChanged="set"
        ></OneWayInput>
      </div>
      <div v-if="name === 'border-radius'">
        <label class="label">Border radius</label>
        <OneWayInput
          :value="value"
          :name="name"
          unit="px"
          type="text"
          className="input is-small"
          @valueChanged="set"
        ></OneWayInput>
        
      </div>
      <div v-if="name === 'opacity'">
        <label class="label">Opacity</label>
        <OneWayInput
          :value="value"
          :name="name"
          unit="%"
          className="input is-small"
          @valueChanged="set"
        ></OneWayInput>        
      </div>
      <div v-if="name === 'mix-blend-mode'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'z-index'">
        <label class="label">Z Index</label>
        <OneWayInput
          :value="value"
          :name="name"
          type="text"
          className="input is-small"
          @valueChanged="set"
        ></OneWayInput>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from "./ColorPicker";
import OneWayInput from "@/components/OneWayInput.vue";

export default {
  name: "Styles",
  methods: {
    set(payload) {
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
