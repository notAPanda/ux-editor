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
                    <input class="input is-small" type="text" placeholder="Text input" v-model="selectedElement.width">
                </div>
            </div>
        </div>          
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">Height</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <input class="input is-small" type="number" min="0" placeholder="Text input" v-model.number="selectedElement.height">
                </div>
            </div>
        </div>          
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">X</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <input class="input is-small" type="number" min="0" placeholder="Text input" v-model.number="selectedElement.x">
                </div>
            </div>
        </div>         
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label class="label">Y</label>
            </div>
            <div class="field-body">
                <div class="control">
                    <input class="input is-small" type="number" min="0" placeholder="Text input" v-model.number="selectedElement.y">
                </div>
            </div>
        </div>          
      </div>
  </div>
</template>

<script>
export default {
  name: 'Properties',
  computed: {
    selectedElement () {
      return this.$store.state.selectedElement
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">

</style>
