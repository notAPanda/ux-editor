<template>
    <div>
        <input type="number">
        <input type="number">
        <input type="number">
        <input type="number">
    </div>
</template>
<script>
export default {
    name: 'ShadowInput',
    props: [
        'value'
    ],
    computed: {
        shadow () {
            const base = {
                x: 0,
                y: 0,
                blur: 0,
                spread: 0,
                color: 'rgba(0, 0, 0, 1)'
            }
            if (this.value === 'none') {
                return {...base}
            }
            return 
        }
    }
}
</script>
