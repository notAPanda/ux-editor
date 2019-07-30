<template>
  <div>
    <div
      class="style-input-container"
      v-if="['x', 'y', 'width', 'height', 'angle', 'z-index'].includes(name)"
    >
      <div class="label">
        <h2>{{ label }}</h2>
      </div>

      <div class="input">
        <input
          type="number"
          :value="value"
          min="0"
          :class="className"
          :disabled="disabled"
          @change="submit($event.target.value)"
        />
      </div>

      <div class="unit"></div>
    </div>
    <div
      class="style-input-container"
      v-if="['font-size', 'border-radius', 'border-width'].includes(name)"
    >
      <div class="label">
        <h2>{{ label }}</h2>
      </div>
      <div class="input">
        <input
          type="number"
          :value="textToNum"
          min="0"
          :class="className"
          :disabled="disabled"
          @change="submit($event.target.value)"
        />
      </div>
      <div class="unit">px</div>
    </div>
    <div class="style-input-container" v-if="['opacity'].includes(name)">
      <div class="label">
        <h2>{{ label }}</h2>
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
        />
      </div>
      <div class="unit">%</div>
    </div>
    <div class="style-input-container" v-if="['mix-blend-mode'].includes(name)">
      <div class="label">
        <h2>{{ label }}</h2>
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
      <div class="unit"></div>
    </div>
    <div class="style-input-container" v-if="['border-style'].includes(name)">
      <div class="label">
        <h2>{{ label }}</h2>
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
      <div class="unit"></div>
    </div>
    <div class="style-input-container" v-if="['font-weight'].includes(name)">
      <div class="label">
        <h2>{{ label }}</h2>
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
      <div class="unit"></div>
    </div>
    <div class="style-input-container" v-if="['font-style'].includes(name)">
      <div class="label">
        <h2>{{ label }}</h2>
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
      <div class="unit"></div>
    </div>
    <div class="style-input-container" v-if="['text-align'].includes(name)">
      <div class="label">
        <h2>{{ label }}</h2>
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
      <div class="unit"></div>
    </div>
    <div class="style-input-container" v-if="['font-family'].includes(name)">
      <div class="label">
        <h2>{{ label }}</h2>
      </div>
      <div class="input">
        <select @change="submit($event.target.value)">
          <option :selected="value === 'sans-serif'">sans-serif</option>
          <option
            v-for="(mode, index) in this.fontNames"
            :key="`ta-${index}`"
            :selected="value === mode"
            :value="mode"
            >{{ mode }}</option
          >
        </select>
      </div>
      <div class="unit"></div>
    </div>
    <div
      class="style-input-container"
      v-if="['color', 'background', 'border-color'].includes(name)"
    >
      <div class="label">
        <h2>{{ label }}</h2>
      </div>
      <div class="color">
        <ColorPicker :value="value" :name="name" @update="submit"></ColorPicker>
      </div>
    </div>
    <div class="style-input-container" v-if="['box-shadow'].includes(name)">
      <div class="label">
        <h2>{{ label }}</h2>
      </div>
      <ShadowInput :value="value" @update="submit"></ShadowInput>
    </div>
    <hr />
  </div>
</template>

<script>
import numeral from "numeral";
import ColorPicker from "./ColorPicker";
import ShadowInput from "./ShadowInput";
import fonts from "@/assets/fonts.json";
import FontFaceObserver from "fontfaceobserver";

const fontNames = fonts.items.map(f => f.family);
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
      return numeral(this.value)._value;
    }
  },
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
        return `${value}px`;
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
  display: flex;
  .label {
    flex: 4;
  }
  .input {
    flex: 1;
    input {
      margin: 0;
      padding: 0;
      text-align: center;
      outline: 0;
      border: 0;
      border-bottom: 1px solid rgba($black, 0.2);
    }
  }
  .unit {
    flex: 1;
  }
  .color {
    flex: 4;
  }
}
</style>
