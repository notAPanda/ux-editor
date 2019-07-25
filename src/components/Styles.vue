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
      <div v-if="name === 'border-radius'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'opacity'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'mix-blend-mode'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'z-index'">{{ name }}: {{ value }}</div>
    </div>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker'

export default {
  name: "Styles",
  methods: {
  },
  components: {
    ColorPicker
  },
  props: ["element"]
};
</script>

<style lang="scss">
.styles {
  position: relative;
}

</style>
