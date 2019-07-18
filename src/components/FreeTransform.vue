<template>
    <div :class="{[`${classPrefix}-transform`]: true, [`${classPrefix}-transform--active`]:selected}"
         :style="styles"
         @click="click"
         @dblclick="dblClick"
         @mousedown="mousedown">
        <div :class="`${classPrefix}-transform__content`" :style="computedStyles.element">
            <slot></slot>
        </div>
        <div v-if="selected"
             :class="`${classPrefix}-transform__controls`"
             :style="computedStyles.controls">
            <div :class="`${classPrefix}-transform__rotator`" @mousedown="handleRotation"></div>
            <div :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--tl`]"
                 @mousedown="handleScale('tl',$event)"></div>
            <div :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--ml`]"
                 @mousedown="handleScale('ml',$event)"></div>
            <div :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--tr`]"
                 @mousedown="handleScale('tr',$event)"></div>
            <div :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--tm`]"
                 @mousedown="handleScale('tm',$event)"></div>
            <div :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--bl`]"
                 @mousedown="handleScale('bl',$event)"></div>
            <div :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--bm`]"
                 @mousedown="handleScale('bm',$event)"></div>
            <div :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--br`]"
                 @mousedown="handleScale('br',$event)"></div>
            <div :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--mr`]"
                 @mousedown="handleScale('mr',$event)"></div>
        </div>
    </div>
</template>

<script>
import { translate } from 'free-transform'
import scale from '@/helpers/scale'
import rotate from '@/helpers/rotate'
import styler from '@/helpers/styler'

export default {
  name: 'Transform',
  props: {
    classPrefix: {
      type: String,
      default: 'tr'
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    scaleLimit: {
      type: Number,
      default: 0.1
    },
    angle: {
      type: Number,
      required: true
    },
    disableScale: {
      type: Boolean,
      default: false
    },
    offsetX: {
      type: Number,
      required: true
    },
    offsetY: {
      type: Number,
      required: true
    },
    selected: {
      type: Boolean,
      default: true
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    selectOn: {
      validator: function (value) {
        return ['dblclick', 'mousedown', 'click'].indexOf(value) !== -1
      },
      default: 'mousedown'
    },
    aspectRatio: {
      type: Boolean,
      default: true
    },
    scaleFromCenter: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    computedStyles () {
      const { element, controls } = styler({
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        angle: this.angle,
        disableScale: this.disableScale
      })
      return {
        element: {
          ...element,
          width: element.width ? `${element.width}px` : null,
          height: element.height ? `${element.height}px` : null
        },
        controls: {
          ...controls,
          width: `${controls.width}px`,
          height: `${controls.height}px`
        }
      }
    }
  },
  methods: {
    handleScale (scaleType, event) {
      event.stopPropagation()
      event.preventDefault()

      const drag = scale(scaleType, {
        startX: event.pageX,
        startY: event.pageY,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        angle: this.angle,
        scaleLimit: this.scaleLimit,
        scaleFromCenter: this.scaleFromCenter && event.altKey,
        enableScaleFromCenter: this.scaleFromCenter,
        aspectRatio: this.aspectRatio && event.shiftKey,
        enableAspectRatio: this.aspectRatio
      }, (payload) => {
        this.$emit('update', payload)
      })
      this.onDrag(drag)
    },
    handleTranslation (event) {
      event.stopPropagation()
      const drag = translate({
        x: this.x,
        y: this.y,
        startX: event.pageX,
        startY: event.pageY
      }, (payload) => {
        this.$emit('update', payload)
      })
      this.onDrag(drag)
    },
    handleRotation (event) {
      event.stopPropagation()
      const drag = rotate({
        startX: event.pageX,
        startY: event.pageY,
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        angle: this.angle,
        offsetX: this.$parent.$refs.canvas.getBoundingClientRect().x,
        offsetY: this.$parent.$refs.canvas.getBoundingClientRect().y
      }, (payload) => {
        this.$emit('update', payload)
      })
      this.onDrag(drag)
    },
    onDrag (drag) {
      const up = () => {
        document.removeEventListener('mousemove', drag)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', up)
    },
    mousedown (event) {
      this.$emit('mousedown', event)
      if (this.selectOn === 'mousedown' || this.selected === true) {
        this.$emit('onSelect')
        this.handleTranslation(event)
      }
    },
    click (event) {
      this.$emit('click', event)
      if (this.selectOn === 'click') {
        this.$emit('onSelect')
      }
    },
    dblClick (event) {
      this.$emit('dblclick', event)
      if (this.selectOn === 'dblclick') {
        this.$emit('onSelect')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$point-size: 6px;
$half-point-size: $point-size / 2;

.tr-transform {
  &--active {
    position: absolute;
    z-index: 5;
    .tr-transform__content {
      .element {
        border: 1px solid #006cff;
      }
    }
  }
  &__content {
    user-select: none;
  }
  &__rotator {
    top: -20px;
    left: calc(50% - #{$half-point-size});
  }
  &__rotator,
  &__scale-point {
    background: #fff;
    width: $point-size;
    height: $point-size;
    // border-radius: 50%;
    position: absolute;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #006cff;
    cursor: pointer;
  }
  &__rotator:hover,
  &__scale-point:hover {
    background: #f1f5f8;
  }
  &__rotator:active,
  &__scale-point:active {
    background: #dae1e7;
  }
  &__scale-point {
    &--tl {
      top: -$half-point-size;
      left: -$half-point-size;
    }
    &--ml {
      top: calc(50% - #{$half-point-size});
      left: -$half-point-size;
    }
    &--tr {
      left: calc(100% - #{$half-point-size});
      top: -$half-point-size;
    }
    &--tm {
      left: calc(50% - #{$half-point-size});
      top: -$half-point-size;
    }
    &--mr {
      left: calc(100% - #{$half-point-size});
      top: calc(50% - #{$half-point-size});
    }
    &--bl {
      left: -$half-point-size;
      top: calc(100% - #{$half-point-size});
    }
    &--bm {
      left: calc(50% - #{$half-point-size});
      top: calc(100% - #{$half-point-size});
    }
    &--br {
      left: calc(100% - #{$half-point-size});
      top: calc(100% - #{$half-point-size});
    }
  }
}
</style>
