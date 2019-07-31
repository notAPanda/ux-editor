<template>
  <div class="styles">
    <StyleInput
      v-for="(value, name, index) in element.styles"
      :key="`input-${name}-${index}`"
      :name="name"
      :value="value"
      :label="name"
      @valueChanged="set"
    ></StyleInput>
  </div>
</template>

<script>
import StyleInput from "@/components/StyleInput.vue";

export default {
  name: "Styles",
  props: ["element"],
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
    StyleInput
  }
};
</script>

<style lang="scss">
.styles {
  position: relative;
  padding: 0 20px;
}
</style>
