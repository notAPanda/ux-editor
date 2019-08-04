<template>
  <div>
    <div class="d-flex">
      <div class="label">box-shadow</div>
      <div class="one">
        <input
          type="checkbox"
          value="1"
          :checked="values.show"
          @change="set('show', $event.target.checked)"
        />
      </div>
    </div>
    <div class="d-flex" v-show="values.show">
      <div class="two">
        <input
          type="number"
          :value="values.offsetX"
          @input="set('offsetX', $event.target.value)"
        />
      </div>
      <div class="two">
        <input
          type="number"
          :value="values.offsetY"
          @input="set('offsetY', $event.target.value)"
        />
      </div>
      <div class="two">
        <input
          type="number"
          :value="values.blurRadius"
          @input="set('blurRadius', $event.target.value)"
        />
      </div>
      <div class="two">
        <input
          type="number"
          :value="values.spreadRadius"
          @input="set('spreadRadius', $event.target.value)"
        />
      </div>
      <div class="two">
        <ColorPicker
          :value="values.color"
          name="color"
          @update="changeColor"
        ></ColorPicker>
      </div>
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
.one {
  flex: 1;
}
.two {
  flex: 2;
}
</style>
