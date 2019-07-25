<template>
  <div class="properties">
    <div v-if="selectedElementsCount === 1">
      <button @click="getBounds(selectedElement)">getBounds</button>
      <button @click="getCenter(selectedElement)">getCenter</button>
      <div v-if="selectedElement.type === 'canvas'">
        <div class="row mt mb">
          <div class="col">
            <label class="label">W</label>
            <OneWayInput
              :value="selectedElement.width"
              type="number"
              className=""
              @valueChanged="set($event, 'width')"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">H</label>
            <OneWayInput
              :value="selectedElement.height"
              type="number"
              className="input is-small"
              @valueChanged="set($event, 'height')"
            ></OneWayInput>
          </div>
        </div>
      </div>
      <div v-if="selectedElement.type === 'text'">
        <div class="row mb mt">
          <div class="col">
            <label class="label">W</label>
            <OneWayInput
              :value="selectedElement.width"
              type="number"
              className=""
              @valueChanged="set($event, 'width')"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">H</label>
            <OneWayInput
              :value="selectedElement.height"
              type="number"
              className="input is-small"
              @valueChanged="set($event, 'height')"
              disabled="1"
            ></OneWayInput>
          </div>
        </div>
        <div class="row mb">
          <div class="col">
            <label class="label">X</label>
            <OneWayInput
              :value="selectedElement.x"
              type="number"
              className="input is-small"
              @valueChanged="set($event, 'x')"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">Y</label>
            <OneWayInput
              :value="selectedElement.y"
              type="number"
              className="input is-small"
              @valueChanged="set($event, 'y')"
            ></OneWayInput>
          </div>
        </div>
        <div class="row mb">
          <div class="col">
            <label class="label">A</label>
            <OneWayInput
              name="angle"
              :value="selectedElement.angle"
              type="number"
              min="0"
              max="359"
              className="input is-small"
              @valueChanged="set($event, 'angle')"
            ></OneWayInput>
          </div>
          <div class="col"></div>
        </div>
        <hr />
      </div>
      <div v-if="['box', 'oval', 'line'].includes(selectedElement.type)">
        <div class="row mb mt">
          <div class="col">
            <label class="label">W</label>
            <OneWayInput
              :value="selectedElement.width"
              type="number"
              className=""
              @valueChanged="set($event, 'width')"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">H</label>
            <OneWayInput
              :value="selectedElement.height"
              type="number"
              className="input is-small"
              @valueChanged="set($event, 'height')"
            ></OneWayInput>
          </div>
        </div>
        <div class="row mb">
          <div class="col">
            <label class="label">X</label>
            <OneWayInput
              :value="selectedElement.x"
              type="number"
              className="input is-small"
              @valueChanged="set($event, 'x')"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">Y</label>
            <OneWayInput
              :value="selectedElement.y"
              type="number"
              className="input is-small"
              @valueChanged="set($event, 'y')"
            ></OneWayInput>
          </div>
        </div>
        <div class="row mb">
          <div class="col">
            <label class="label">A</label>
            <OneWayInput
              name="angle"
              :value="selectedElement.angle"
              type="number"
              min="0"
              max="359"
              className="input is-small"
              @valueChanged="set($event, 'angle')"
            ></OneWayInput>
          </div>
          <div class="col"></div>
        </div>
        <hr />
        <Styles :element="selectedElement"></Styles>
      </div>
    </div>
    <div v-if="selectedElementsCount > 1">
      <div class="row mb t">
        <button @click="alignElements('left')">Align left</button>
        <button @click="alignElements('right')">Align right</button>
        <button @click="alignElements('top')">Align top</button>
        <button @click="alignElements('bottom')">Align bottom</button>
        <button @click="alignElements('center')">Align center</button>
        <button @click="alignElements('middle')">Align middle</button>
      </div>
    </div>
  </div>
</template>

<script>
import OneWayInput from "@/components/OneWayInput.vue";
import Styles from "@/components/Styles.vue";
import { rotatePoint } from "@/helpers/point-transformer";
import { getCenter, minMax } from "@/helpers/point-finder";
import _ from "lodash";

export default {
  name: "Properties",
  components: {
    OneWayInput,
    Styles
    // TextEditor
  },
  computed: {
    selectedElement() {
      if (this.selectedElementsCount) {
        return this.selectedElements[0];
      }
      return {};
    },
    selectedElements() {
      return this.$store.state.elements.filter(el => el.selected);
    },
    selectedElementsCount() {
      return this.$store.state.elements.filter(el => el.selected).length;
    }
  },
  methods: {
    getBounds(element) {
      console.log(minMax(element));
    },
    getCenter(el) {
      console.log(getCenter(el));
    },
    alignElements(side) {
      switch (side) {
        case "left":
          let xmin = _.min(this.selectedElements.map(el => minMax(el).xmin));
          this.$store.commit("alignLeftSelectedElements", { x: xmin });
          break;
        case "right":
          let xmax = _.max(this.selectedElements.map(el => minMax(el).xmax));
          this.$store.commit("alignRightSelectedElements", { x: xmax });
          break;
        case "center":
          xmin = _.min(this.selectedElements.map(el => minMax(el).xmin));
          xmax = _.max(this.selectedElements.map(el => minMax(el).xmax));
          this.$store.commit("alignCenterSelectedElements", {
            x: (xmin + xmax) / 2
          });
          break;
        case "top":
          let ymin = _.min(this.selectedElements.map(el => minMax(el).ymin));
          this.$store.commit("alignTopSelectedElements", { y: ymin });
          break;
        case "bottom":
          let ymax = _.max(this.selectedElements.map(el => minMax(el).ymax));
          this.$store.commit("alignBottomSelectedElements", { y: ymax });
          break;
        case "middle":
          ymin = _.min(this.selectedElements.map(el => minMax(el).ymin));
          ymax = _.max(this.selectedElements.map(el => minMax(el).ymax));
          this.$store.commit("alignMiddleSelectedElements", {
            y: (ymin + ymax) / 2
          });
          break;
      }
    },
    set(value, property, style = null) {
      const payload = {
        ...this.selectedElement
      };
      if (property === "angle") {
        const multi = value / 360;
        if (multi > 1 || multi < -1) {
          value = value - Math.round(multi) * 360;
        }
        const center = rotatePoint(
          getCenter(payload),
          { x: payload.x, y: payload.y },
          payload.angle
        );
        const rotatedTL = rotatePoint(
          { x: payload.x, y: payload.y },
          center,
          parseInt(value) - payload.angle
        );
        const rotatedElement = {
          ...payload,
          ...rotatedTL,
          angle: parseInt(value)
        };
        this.$store.commit("updateElement", rotatedElement);
        return null;
      }

      payload[property] = parseInt(value);
      this.$store.commit("updateElement", payload);
      return null;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
.properties {
  hr {
    border: none;
    color: rgba($black, 0.1);
    background-color: rgba($black, 0.1);
    height: 1px;
  }
  .mb {
    margin-bottom: 10px;
  }
  .mt {
    margin-top: 10px;
  }
  .row {
    display: flex;
    flex-direction: row;
    .col {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      label {
        color: rgba($black, 0.6);
        margin: 0 5px 1px 0;
        width: 15px;
      }
      input {
        margin: 0;
        padding: 0;
        width: 50%;
        text-align: center;
        outline: 0;
        border: 0;
        border-bottom: 1px solid rgba($black, 0.2);
      }
    }
  }
}
</style>
