<template>
  <input :type="type" :value="value" :class="className" @change="validate" :disabled="disabled">
</template>

<script>
export default {
  name: 'OneWayInput',
  props: [
    'type',
    'value',
    'className',
    'name',
    'disabled'
  ],
  methods: {
    validate (e) {
      if (e.target.value === '') {
        e.target.value = 0
      }
      this.$emit('valueChanged', e.target.value)
    }
  }
}
</script>
