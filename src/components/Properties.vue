<template>
  <div class="properties">
      <div v-if="selectedElement.type === 'canvas'">
          <input type="text" v-model="selectedElement.width">
          <input type="text" v-model="selectedElement.height">
      </div>
      <div v-if="selectedElement.type === 'box'">
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">W</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <OneWayInput :value="selectedElement.width" type="number" className="input is-small" @valueChanged="set($event, 'width')"></OneWayInput>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">H</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <OneWayInput :value="selectedElement.height" type="number" className="input is-small" @valueChanged="set($event, 'height')"></OneWayInput>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">X</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <OneWayInput :value="selectedElement.x" type="number" className="input is-small" @valueChanged="set($event, 'x')"></OneWayInput>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">Y</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <OneWayInput :value="selectedElement.y" type="number" className="input is-small" @valueChanged="set($event, 'y')"></OneWayInput>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">Angle</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <OneWayInput name="angle" :value="selectedElement.angle" type="number" min="0" max="359" className="input is-small" @valueChanged="set($event, 'angle')"></OneWayInput>
                </div>
            </div>
        </div>
        <!-- <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">Bg</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <OneWayInput name="angle" :value="selectedElement.styles.background" type="text" className="input is-small" @valueChanged="set($event, 'styles', $event)"></OneWayInput>
                </div>
            </div>
        </div> -->
      </div>
  </div>
</template>

<script>
import OneWayInput from '@/components/OneWayInput.vue'
import { rotatePoint } from '@/helpers/point-transformer'
import { getCenter } from '@/helpers/point-finder'

export default {
  name: 'Properties',
  components: {
    OneWayInput
  },
  computed: {
    selectedElement () {
      return this.$store.state.selectedElement
    }
  },
  methods: {
    set (value, property, style = null) {
      const payload = {
        ...this.selectedElement
      }

      const multi = value / 360
      if (multi > 1 || multi < -1) {
        value = value - Math.round(multi) * 360
      }

      if (property === 'angle') {
        const center = rotatePoint(getCenter(payload), { x: payload.x, y: payload.y }, payload.angle)
        const rotatedTL = rotatePoint({ x: payload.x, y: payload.y }, center, parseInt(value) - payload.angle)
        const rotatedElement = {
          ...payload,
          ...rotatedTL,
          angle: parseInt(value)
        }
        this.$store.commit('updateElement', rotatedElement)
        return null
      }

      // if (property === 'styles') {
      //   this.$store.commit('updateElement', {
      //     ...payload,
      //     styles: { 
      //       ...payload.styles,
      //       background: e.target.value
      //     }
      //   })
      //   return null
      // }

      payload[property] = parseInt(value)
      this.$store.commit('updateElement', payload)
      return null
    }
  }
}
</script>

<style lang="scss">

</style>
