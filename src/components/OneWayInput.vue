<template>
  <div>
    <input
      :type="type"
      :value="val"
      :class="className"
      @change="validate"
      :disabled="disabled"
    />{{ containsPx ? "px" : "" }}
  </div>
</template>

<script>
import numeral from "numeral";

export default {
  name: "OneWayInput",
  props: ["type", "value", "className", "name", "disabled"],
  computed: {
    val() {
      return numeral(this.value)._value;
    },
    isNumber() {
      if (typeof this.value === "number") {
        return true;
      }
      return false;
    },
    containsPx() {
      if (this.isNumber) {
        return false;
      }
      return this.value.indexOf("px");
    }
  },
  methods: {
    validate(e) {
      const val = e.target.value;
      const num = numeral(val);
      if (num._value) {
        this.$emit("valueChanged", { 
          name: this.name, 
          value: this.containsPx ? `${num._value}px` : num._value
        });
      }
    }
  }
};
</script>
