<template>
  <div>
    <input type="text" ref="pixelField" :value="val" />
  </div>
</template>

<script>
export default {
  name: "PixelField",
  props: "value",
  data() {
    return {
      numericValue: stringToNumber(this.value)
    };
  },
  computed: {
    val() {
      return `${this.numericValue}px`;
    }
  },
  methods: {
    stringToNumber(str) {
      return parseInt(str.match(/\d/g).join(""));
    }
  }
};
</script>
