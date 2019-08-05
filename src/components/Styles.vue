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
    <IconInput v-if="element.type === 'icon'" @update="submit"> </IconInput>
  </div>
</template>

<script>
import StyleInput from "@/components/StyleInput.vue";
import IconInput from "@/components/IconInput.vue";

export default {
  name: "Styles",
  props: ["element"],
  methods: {
    submit(icon) {
      this.$store.commit("updateElement", {
        ...this.element,
        text: JSON.stringify(icon)
      });
    },
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
    StyleInput,
    IconInput
  }
};
</script>

<style lang="scss">
.styles {
  position: relative;
  padding: 0 20px;
}
</style>
