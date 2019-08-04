<template>
  <div class="properties">
    <div class="alignment row mb" v-if="selectedElementsCount > 1">
      <ul class="alignment-list">
        <li class="alignment-list-item" @click="alignElements('left')">
          <i class="fas fa-long-arrow-alt-left"></i>
        </li>
        <li class="alignment-list-item" @click="alignElements('center')">
          <i class="fas fa-arrows-alt-h"></i>
        </li>
        <li class="alignment-list-item" @click="alignElements('right')">
          <i class="fas fa-long-arrow-alt-right"></i>
        </li>
        <li class="alignment-list-item" @click="alignElements('top')">
          <i class="fas fa-long-arrow-alt-up"></i>
        </li>
        <li class="alignment-list-item" @click="alignElements('middle')">
          <i class="fas fa-arrows-alt-v"></i>
        </li>
        <li class="alignment-list-item" @click="alignElements('bottom')">
          <i class="fas fa-long-arrow-alt-down"></i>
        </li>
      </ul>
    </div>
    <div v-if="selectedElementsCount === 1">
      <div v-if="selectedElement.type === 'canvas'" class="coordinates">
        <div class="row mt mb">
          <div class="col">
            <label class="label">W</label>
            <OneWayInput
              :value="selectedElement.width"
              name="width"
              type="number"
              @valueChanged="set"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">H</label>
            <OneWayInput
              :value="selectedElement.height"
              name="height"
              type="number"
              className="input is-small"
              @valueChanged="set"
            ></OneWayInput>
          </div>
        </div>
      </div>
      <div v-if="selectedElement.type === 'text'" class="coordinates">
        <div class="row mb mt">
          <div class="col">
            <label class="label">W</label>
            <OneWayInput
              :value="selectedElement.width"
              name="width"
              type="number"
              @valueChanged="set"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">H</label>
            <OneWayInput
              :value="selectedElement.height"
              name="height"
              type="number"
              className="input is-small"
              @valueChanged="set"
              disabled="1"
            ></OneWayInput>
          </div>
        </div>
        <div class="row mb">
          <div class="col">
            <label class="label">X</label>
            <OneWayInput
              :value="selectedElement.x"
              name="x"
              type="number"
              @valueChanged="set"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">Y</label>
            <OneWayInput
              :value="selectedElement.y"
              name="y"
              type="number"
              @valueChanged="set"
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
              @valueChanged="set"
            ></OneWayInput>
          </div>
          <div class="col"></div>
        </div>
        <hr />
      </div>
      <div
        v-if="['box', 'oval', 'line'].includes(selectedElement.type)"
        class="coordinates"
      >
        <div class="row mb mt">
          <div class="col">
            <label class="label">W</label>
            <OneWayInput
              :value="selectedElement.width"
              name="width"
              type="number"
              className=""
              @valueChanged="set"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">H</label>
            <OneWayInput
              :value="selectedElement.height"
              name="height"
              type="number"
              @valueChanged="set"
            ></OneWayInput>
          </div>
        </div>
        <div class="row mb">
          <div class="col">
            <label class="label">X</label>
            <OneWayInput
              :value="selectedElement.x"
              type="number"
              name="x"
              @valueChanged="set"
            ></OneWayInput>
          </div>
          <div class="col">
            <label class="label">Y</label>
            <OneWayInput
              :value="selectedElement.y"
              name="y"
              type="number"
              @valueChanged="set"
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
              @valueChanged="set"
            ></OneWayInput>
          </div>
          <div class="col"></div>
        </div>
        <hr />
      </div>
      <Styles :element="selectedElement"></Styles>
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
    set(load) {
      const payload = {
        ...this.selectedElement
      };

      if (load.name === "angle") {
        const multi = load.value / 360;
        if (multi > 1 || multi < -1) {
          load.value = load.value - Math.round(multi) * 360;
        }
        const center = rotatePoint(
          getCenter(payload),
          { x: payload.x, y: payload.y },
          payload.angle
        );
        const rotatedTL = rotatePoint(
          { x: payload.x, y: payload.y },
          center,
          parseInt(load.value) - payload.angle
        );
        const rotatedElement = {
          ...payload,
          ...rotatedTL,
          angle: parseInt(load.value)
        };
        this.$store.commit("updateElement", rotatedElement);
        return null;
      }

      this.$store.commit("updateElement", {
        ...payload,
        [load.name]: load.value
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/variables.scss";
.properties {
  line-height: 20px;
  input {
    width: 100%;
    line-height: 20px;
    margin: 0;
    padding: 0;
    text-align: right;
    outline: 0;
    border: 0;
    border-bottom: 1px solid rgba($black, 0.2);
  }
  select {
    line-height: 20px;
    width: 100%;
    text-align-last: right;
    border: 0;
    border-bottom: 1px solid rgba($black, 0.2);
  }
  .label {
    color: rgba($black, 0.6);
    text-transform: uppercase;
    font-size: 10px;
  }
  .coordinates {
    padding: 5px 20px;
  }
  .alignment {
    padding: 5px 10px;

    .alignment-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
      width: 100%;

      .alignment-list-item {
        flex: 1;
        flex-grow: 1;
        height: 30px;
        cursor: pointer;
        vertical-align: middle;
        display: flex;
        align-items: center;
        justify-content: center;

        &.rotate90 {
          svg {
            transform: rotate(90deg);
          }
        }

        &:hover {
          background: rgba($black, 0.1);
        }
      }
    }
  }
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
    }
  }
}
</style>
