<template>
  <div 
    class="text-element"
  >
    <p :contenteditable="element.editing" @input="onInput" @blur="endEditing" @keydown.enter="endEditing">
      {{element.text}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextElement',
  props: [
    'element'
  ],
  methods: {
    onInput (e) {
      this.element.height = e.target.clientHeight
    },
    endEditing () {
      this.element.editing = false
      this.element.height = e.target.clientHeight
      this.element.text = e.target.innerText
    }
  }
}
</script>

<style lang="scss">
.text-element {
  p {
    margin: 0;
    padding: 0;
    overflow-wrap: break-word;
  }
}

</style>
