<template>
  <div>
    <input
      :type="type"
      :value="val"
      class="coord"
      max="999999"
      @change="submit"
      :disabled="disabled"
    />{{ unit }}
  </div>
</template>

<script>
import numeral from "numeral";

export default {
  name: "OneWayInput",
  props: ["type", "value", "name", "disabled", "unit"],
  computed: {
    val() {
      return numeral(this.value)._value;
    }
  },
  methods: {
    format(value) {
      let num = numeral(value)._value;
      if (num === null) {
        return this.value;
      }
      if (this.unit) {
        return `${num}${this.unit}`;
      }
      return num;
    },
    submit(e) {
      this.$emit("valueChanged", {
        name: this.name,
        value: this.format(e.target.value)
      });
    }
  }
};
</script>

<style lang="scss">
input.coord {
  max-width: 50px;
}
</style>
