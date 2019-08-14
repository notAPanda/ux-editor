<template>
  <div>
    <div class="style-input-container" v-if="['z-index'].includes(name)">
      <div class="label">{{ label }}</div>

      <div class="input">
        <input
          type="number"
          :value="value"
          min="0"
          max="999999"
          :class="className"
          :disabled="disabled"
          @change="submit($event.target.value)"
        />
      </div>
    </div>
    <div
      class="style-input-container"
      v-if="['font-size', 'border-radius', 'border-width'].includes(name)"
    >
      <div class="label">
        {{ label }}
      </div>
      <div class="input">
        <input
          type="number"
          :value="textToNum"
          min="0"
          max="999999"
          :class="className"
          :disabled="disabled"
          @change="submit($event.target.value)"
        />{{ unit }}
      </div>
    </div>
    <div class="style-input-container" v-if="['opacity'].includes(name)">
      <div class="label">
        {{ label }}
      </div>
      <div class="input">
        <input
          type="number"
          :value="textToNum"
          min="0"
          max="100"
          :class="className"
          :disabled="disabled"
          @change="submit($event.target.value)"
        />%
      </div>
    </div>
    <div class="style-input-container" v-if="['mix-blend-mode'].includes(name)">
      <div class="label">
        {{ label }}
      </div>
      <div class="input">
        <select @change="submit($event.target.value)">
          <option
            v-for="(mode, index) in mixBlendModes"
            :key="`mbm-${index}`"
            :selected="value === mode"
            :value="mode"
            >{{ mode }}</option
          >
        </select>
      </div>
    </div>
    <div class="style-input-container" v-if="['border-style'].includes(name)">
      <div class="label">
        {{ label }}
      </div>
      <div class="input">
        <select @change="submit($event.target.value)">
          <option
            v-for="(mode, index) in borderStyles"
            :key="`bs-${index}`"
            :selected="value === mode"
            :value="mode"
            >{{ mode }}</option
          >
        </select>
      </div>
    </div>
    <div class="style-input-container" v-if="['font-weight'].includes(name)">
      <div class="label">
        {{ label }}
      </div>
      <div class="input">
        <select @change="submit($event.target.value)">
          <option
            v-for="(mode, index) in this.fontWeight"
            :key="`fw-${index}`"
            :selected="value === mode"
            :value="mode"
            >{{ mode }}</option
          >
        </select>
      </div>
    </div>
    <div class="style-input-container" v-if="['font-style'].includes(name)">
      <div class="label">
        {{ label }}
      </div>
      <div class="input">
        <select @change="submit($event.target.value)">
          <option
            v-for="(mode, index) in this.fontStyle"
            :key="`fs-${index}`"
            :selected="value === mode"
            :value="mode"
            >{{ mode }}</option
          >
        </select>
      </div>
    </div>
    <div class="style-input-container" v-if="['text-align'].includes(name)">
      <div class="label">
        {{ label }}
      </div>
      <div class="input">
        <select @change="submit($event.target.value)">
          <option
            v-for="(mode, index) in this.textAlign"
            :key="`ta-${index}`"
            :selected="value === mode"
            :value="mode"
            >{{ mode }}</option
          >
        </select>
      </div>
    </div>
    <div class="style-input-container" v-if="['font-family'].includes(name)">
      <div class="label">
        {{ label }}
      </div>
      <div class="input">
        <select @change="submit($event.target.value)">
          <option :selected="value === 'sans-serif'">sans-serif</option>
          <option
            v-for="(mode, index) in this.fontNames"
            :key="`ta-${index}`"
            :selected="value == `'${mode}', sans-serif`"
            :value="mode"
            >{{ mode }}</option
          >
        </select>
      </div>
    </div>
    <div
      class="style-input-container"
      v-if="['color', 'background', 'border-color'].includes(name)"
    >
      <div class="label">
        {{ label }}
      </div>
      <div class="color">
        <ColorPicker :value="value" :name="name" @update="submit"></ColorPicker>
      </div>
    </div>
    <div
      class="style-input-container box-shadow"
      v-if="['box-shadow'].includes(name)"
    >
      <ShadowInput :value="value" @update="submit"></ShadowInput>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import ColorPicker from "./ColorPicker";
import ShadowInput from "./ShadowInput";
import fonts from "@/assets/fonts.json";
import FontFaceObserver from "fontfaceobserver";

const fontNames = fonts.items.map(f => f.family).sort();
const mixBlendModes = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity"
];
const borderStyles = ["solid", "dotted", "dashed"];
const textAlign = ["left", "center", "right", "justify"];
const fontWeight = ["normal", "bold", "lighter"];
const fontStyle = ["normal", "italic", "oblique"];

export default {
  name: "OneWayInput",
  props: ["name", "value", "className", "disabled", "label"],
  components: {
    ColorPicker,
    ShadowInput
  },
  data() {
    return {
      mixBlendModes,
      borderStyles,
      textAlign,
      fontWeight,
      fontStyle,
      fontNames
    };
  },
  computed: {
    textToNum() {
      if (this.name === "opacity") {
        return numeral(this.value)._value * 100;
      }
      if (this.unit === "%") {
        return numeral(this.value)._value * 100;
      }
      return numeral(this.value)._value;
    },
    unit() {
      if (typeof this.value === "string" && this.value.indexOf("px") > 0) {
        return "px";
      } else if (
        typeof this.value === "string" &&
        this.value.indexOf("%") > 0
      ) {
        return "%";
      }
      return null;
    }
  },
  mounted() {},
  methods: {
    loadFont(value) {
      const font = new FontFaceObserver(value);
      font.load().then(
        result => {},
        error => {
          console.log(error);
        }
      );
    },
    format(value) {
      if (["font-size", "border-radius", "border-width"].includes(this.name)) {
        return `${value}${this.unit || "px"}`;
      }

      if (["opacity"].includes(this.name)) {
        return value / 100;
      }

      return value;
    },
    submit(value) {
      if (value === "") {
        return this.$emit("valueChanged", {
          name: this.name,
          value: this.value
        });
      }

      if (this.name === "font-family") {
        if (value === "sans-serif") {
          return this.$emit("valueChanged", {
            name: this.name,
            value: `sans-serif`
          });
        }
        this.loadFont(value);
        return this.$emit("valueChanged", {
          name: this.name,
          value: `'${value}', sans-serif`
        });
      }

      if (
        [
          "border-style",
          "mix-blend-mode",
          "border-color",
          "box-shadow",
          "color",
          "background",
          "font-weight",
          "font-style",
          "text-align"
        ].includes(this.name)
      ) {
        return this.$emit("valueChanged", {
          name: this.name,
          value: value
        });
      }

      const number = numeral(value)._value;

      if (number === 0) {
        return this.$emit("valueChanged", {
          name: this.name,
          value: 0
        });
      }

      return this.$emit("valueChanged", {
        name: this.name,
        value: this.format(number)
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
.style-input-container {
  margin: 10px 0;
  display: flex;
  .label {
    flex: 4;
  }
  .input {
    flex: 1;
    display: flex;
    min-width: 120px;
  }
  .color {
    flex: 4;
  }
  &.box-shadow {
    flex-direction: column;
  }
}
</style>
