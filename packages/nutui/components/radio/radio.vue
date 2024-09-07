<script setup lang="ts">
import { computed, defineComponent, toRef } from 'vue'
import { PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import { getMainClass, pxCheck } from '../_utils'
import { useFormDisabled } from '../form/form'
import NutIcon from '../icon/icon.vue'
import { RADIO_KEY, radioProps } from './radio'

const props = defineProps(radioProps)
const { parent }: any = useInject(RADIO_KEY)
const disabled = useFormDisabled(toRef(props, 'disabled'))

const reverseState = computed(() => parent.position.value === 'left')

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--reverse`]: reverseState.value,
    [`${componentName}--${props.shape}`]: true,
  })
})
function handleClick() {
  if (isCurValue.value || disabled.value)
    return
  parent.updateValue(props.label)
}
const isCurValue = computed(() => {
  return parent.label.value === props.label
})

const color = computed(() => {
  return !disabled.value
    ? isCurValue.value
      ? 'nut-radio__icon'
      : 'nut-radio__icon--unchecked'
    : 'nut-radio__icon--disable'
})

const getButtonClass = computed(() => {
  return `${componentName}__button ${componentName}__button--${props.size} ${isCurValue.value && `${componentName}__button--active`} ${disabled.value ? `${componentName}__button--disabled` : ''}`
})

const getLabelClass = computed(() => {
  return `${componentName}__label ${disabled.value ? `${componentName}__label--disabled` : ''}`
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
  <view :class="classes" :style="customStyle" @click="handleClick">
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
