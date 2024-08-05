<script lang="ts" setup>
import { type ComputedRef, useSlots } from 'vue'
import { computed, toRef } from 'vue'
import NutIcon from '../icon/icon.vue'
import { getMainClass, pxCheck } from '../_utils'
import { useFormContext, useFormDisabled } from '../form'
import { useInject } from '../_hooks'
import { RADIO_KEY, radioProps } from './radio'

const COMPONENT_NAME = 'nut-radio'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(radioProps)

const slots = useSlots()

const formContext = useFormContext()
const disabled = useFormDisabled(formContext, toRef(props, 'disabled'))

const { parent } = useInject<{
  label: ComputedRef<any>
  position: ComputedRef<string>
  updateValue: (value: any) => void
}>(RADIO_KEY)

const shouldReverse = computed(() => {
  if (parent == null)
    return false

  return parent.position.value === 'left'
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--${props.shape}`]: true,
    [`${COMPONENT_NAME}--reverse`]: shouldReverse.value,
  })
})

const innerChecked = computed(() => {
  if (parent == null)
    return false

  return parent.label.value === props.label
})

const iconClasses = computed(() => {
  return {
    [`${COMPONENT_NAME}__icon`]: true,
    [`${COMPONENT_NAME}__icon--disabled`]: disabled.value,
    // TODO 2.x移除
    [`${COMPONENT_NAME}__icon--disable`]: disabled.value,
    [`${COMPONENT_NAME}__icon--unchecked`]: !innerChecked.value,
  }
})

const buttonClasses = computed(() => {
  return {
    [`${COMPONENT_NAME}__button`]: true,
    [`${COMPONENT_NAME}__button--${props.size}`]: true,
    [`${COMPONENT_NAME}__button--active`]: innerChecked.value,
    [`${COMPONENT_NAME}__button--disabled`]: disabled.value,
  }
})

const labelClasses = computed(() => {
  return {
    [`${COMPONENT_NAME}__label`]: true,
    [`${COMPONENT_NAME}__label--disabled`]: disabled.value,
  }
})

function handleClick() {
  if (innerChecked.value || disabled.value)
    return

  if (parent != null)
    parent.updateValue(props.label)
}
</script>

<template>
  <view :class="classes" :style="props.customStyle" @click="handleClick">
    <view v-if="props.shape === 'button'" :class="buttonClasses">
      <slot />
    </view>

    <template v-else>
      <view v-if="shouldReverse" :class="labelClasses">
        <slot />
      </view>

      <template v-if="!innerChecked">
        <slot v-if="slots.icon" name="icon" />

        <NutIcon
          v-else
          :custom-class="iconClasses"
          name="check-normal"
          :size="pxCheck(props.iconSize)"
          :width="pxCheck(props.iconSize)"
          :height="pxCheck(props.iconSize)"
        />
      </template>

      <template v-else>
        <slot v-if="slots.checkedIcon" name="checkedIcon" />

        <NutIcon
          v-else
          :custom-class="iconClasses"
          name="check-checked"
          :size="pxCheck(props.iconSize)"
          :width="pxCheck(props.iconSize)"
          :height="pxCheck(props.iconSize)"
        />
      </template>

      <view v-if="!shouldReverse" :class="labelClasses">
        <slot />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
