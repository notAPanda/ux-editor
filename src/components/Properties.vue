<template>
  <div class="properties">
      <div v-if="selectedElement.type === 'canvas'">
          <input type="text" v-model="selectedElement.width">
          <input type="text" v-model="selectedElement.height">
      </div>
      <div v-if="selectedElement.type === 'box'">
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">Width</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <OneWayInput :value="selectedElement.width" type="number" className="input is-small" @valueChanged="set($event, 'width')"></OneWayInput>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">Height</label>
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
                    <OneWayInput :value="selectedElement.angle" type="number" min="0" max="359" className="input is-small" @valueChanged="set($event, 'angle')"></OneWayInput>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import OneWayInput from '@/components/OneWayInput.vue'

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
    set (value, property) {
      const payload = {
        ...this.selectedElement
      }
      payload[property] = parseInt(value)
      payload.changedProperty = property
      this.$store.commit('updateElement', payload)
    }
  }
}
</script>

<style lang="scss">

</style>
