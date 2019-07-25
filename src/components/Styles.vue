<template>
  <div class="styles">
    <div
      v-for="(value, name, index) in element.styles"
      :key="`input-${name}-${index}`"
    >
      <div v-if="name === 'background'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'border-radius'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'opacity'">{{ name }}: {{ value }}</div>
      <div v-if="name === 'mix-blend-mode'">{{ name }}: {{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Styles",
  props: ["element"]
};
</script>

<style lang="scss"></style>
