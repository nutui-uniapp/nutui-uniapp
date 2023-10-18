<script setup lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { radioProps } from './radio'

const props = defineProps(radioProps)
const parent: any = inject('parent', null)

const reverseState = computed(() => parent.position.value === 'left')

const classes = computed(() => {
  return `${componentName} ${componentName}--${props.shape} ${reverseState.value ? `${componentName}--reverse` : ''}`
})
function handleClick() {
  if (isCurValue.value || props.disabled)
    return
  parent.updateValue(props.label)
}
const isCurValue = computed(() => {
  return parent.label.value === props.label
})

const color = computed(() => {
  return !props.disabled
    ? isCurValue.value
      ? 'nut-radio__icon'
      : 'nut-radio__icon--unchecked'
    : 'nut-radio__icon--disable'
})

const getButtonClass = computed(() => {
  return `${componentName}__button ${isCurValue.value && `${componentName}__button--active`} ${
            props.disabled ? `${componentName}__button--disabled` : ''
          }`
})

const getLabelClass = computed(() => {
  return `${componentName}__label ${props.disabled ? `${componentName}__label--disabled` : ''}`
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-radio`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="classes" @click="handleClick">
    <view v-if="shape === 'button'" :class="getButtonClass">
      <slot />
    </view>

    <template v-else-if="reverseState">
      <view :class="getLabelClass">
        <slot />
      </view>

      <slot v-if="!isCurValue" name="icon">
        <NutIcon
          name="check-normal"
          :size="pxCheck(iconSize)"
          :width="pxCheck(iconSize)"
          :height="pxCheck(iconSize)"
          :pop-class="color"
        />
      </slot>
      <slot v-else name="checkedIcon">
        <NutIcon
          name="check-checked"
          :size="pxCheck(iconSize)"
          :width="pxCheck(iconSize)"
          :height="pxCheck(iconSize)"
          :pop-class="color"
        />
      </slot>
    </template>
    <template v-else>
      <slot v-if="!isCurValue" name="icon">
        <NutIcon
          name="check-normal"
          :size="pxCheck(iconSize)"
          :width="pxCheck(iconSize)"
          :height="pxCheck(iconSize)"
          :pop-class="color"
        />
      </slot>
      <slot v-else name="checkedIcon">
        <NutIcon
          name="check-checked"
          :size="pxCheck(iconSize)"
          :width="pxCheck(iconSize)"
          :height="pxCheck(iconSize)"
          :pop-class="color"
        />
      </slot>
      <view :class="getLabelClass">
        <slot />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
