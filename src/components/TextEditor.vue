<template>
  <div class="text-editor">
    <textarea name="text" v-model="element.text" @input="checkHeight"></textarea>
  </div>
</template>

<script>
export default {
  name: 'TextEditor',
  props: [
    'element'
  ]
}
</script>

<style lang="scss">

</style>
