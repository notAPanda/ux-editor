<template>
  <div class="d-flex">
    <div class="one">
      <input
        type="checkbox"
        value="1"
        :checked="values.show"
        @change="set('show', $event.target.checked)"
      />
    </div>
    <div class="one">
      <input
        type="number"
        :value="values.offsetX"
        :disabled="!values.show"
        @input="set('offsetX', $event.target.value)"
      />
    </div>
    <div class="one">
      <input
        type="number"
        :value="values.offsetY"
        :disabled="!values.show"
        @input="set('offsetY', $event.target.value)"
      />
    </div>
    <div class="one">
      <input
        type="number"
        :value="values.blurRadius"
        :disabled="!values.show"
        @input="set('blurRadius', $event.target.value)"
      />
    </div>
    <div class="one">
      <input
        type="number"
        :value="values.spreadRadius"
        :disabled="!values.show"
        @input="set('spreadRadius', $event.target.value)"
      />
    </div>
    <div class="one">
      <ColorPicker
        :value="values.color"
        name="color"
        @update="changeColor"
      ></ColorPicker>
    </div>
  </div>
</template>
<script>
import ColorPicker from "./ColorPicker";

export default {
  name: "ShadowInput",
  components: {
    ColorPicker
  },
  props: ["value"],
  computed: {
    values() {
      if (this.value === "none") {
        return {
          offsetX: 0,
          offsetY: 0,
          blurRadius: 0,
          spreadRadius: 0,
          color: "rgba(0, 0, 0, .2)",
          show: false
        };
      }
      const shadow = this.value.split("px ");
      return {
        offsetX: shadow[0] || 0,
        offsetY: shadow[1] || 0,
        blurRadius: shadow[2] || 0,
        spreadRadius: shadow[3] || 0,
        color: shadow[4] || "rgba(0, 0, 0, .2)",
        show: true
      };
    }
  },
  methods: {
    shadowString(shadow) {
      return `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${
        shadow.spreadRadius
      }px ${shadow.color}`;
    },
    changeColor(value) {
      this.set("color", value);
    },
    set(name, value) {
      if (name === "show" && value === false) {
        return this.$emit("update", "none");
      }
      const shadow = {
        ...this.values,
        [name]: value
      };
      return this.$emit("update", this.shadowString(shadow));
    }
  }
};
</script>

<style lang="scss">
.d-flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.one {
  flex: 1;
  input {
    width: 100%;
  }
}
</style>
