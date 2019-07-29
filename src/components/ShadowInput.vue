<template>
    <div class="d-flex">
        <div class="one">
            <input type="checkbox" v-model="show" @change="set">
        </div>
        <div class="one">

        <input type="number" v-model="offsetX" :disabled="!show" @input="set">
        </div>
        <div class="one">

        <input type="number" v-model="offsetY" :disabled="!show" @input="set">
        </div>
        <div class="one">

        <input type="number" v-model="blurRadius" :disabled="!show" @input="set">
        </div>
        <div class="one">

        <input type="number" v-model="spreadRadius" :disabled="!show" @input="set">
        </div>
        <div class="one">

        <ColorPicker :value="color" :name="color" @update="changeColor"></ColorPicker>
        </div>
    </div>
</template>
<script>
import ColorPicker from "./ColorPicker";

export default {
    name: 'ShadowInput',
    components: {
        ColorPicker
    },
    data () {
        return {
            show: false,
            offsetX: 0,
            offsetY: 6,
            blurRadius: 20,
            spreadRadius: 0,
            color: 'rgba(0, 0, 0, .2)'
        }
    },
    props: [
        'value'
    ],
    mounted () {
        if (this.value === 'none') {
            this.show = false
        } else {
            const shadow = this.value.split('px ')
            this.offsetX = shadow[0]
            this.offsetY = shadow[1]
            this.blurRadius = shadow[2]
            this.spreadRadius = shadow[3]
            this.color = shadow[4]
            this.show = true
        }
    },
    computed: {
        shadow () {
            if (this.show) {
                return `${this.offsetX}px ${this.offsetY}px ${this.blurRadius}px ${this.spreadRadius}px ${this.color}`
            }
            return 'none'
        }
    },
    methods: {
        changeColor (value) {
            this.color = value
            this.$emit('update', this.shadow)
        },
        set () {
            this.$emit('update', this.shadow)
        }
    }
}
</script>

<style lang="scss">
.d-flex {
    display: flex;
}
.flex-row {
    flex-direction: row;
}
.one {
    flex: 1;
    input {
        width: 100%;
    }
}
</style>

