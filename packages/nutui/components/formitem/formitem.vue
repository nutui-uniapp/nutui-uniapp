<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, useSlots } from 'vue'
import { PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import { getMainClass, pxCheck } from '../_utils'
import NutCell from '../cell/cell.vue'
import { FORM_KEY } from '../form/form'
import type { FormItemProps } from './formitem'
import { formitemProps } from './formitem'
import type { FormItemRule } from './types'

const props = defineProps(formitemProps)
const slots = useSlots()
const Parent = useInject<{ formErrorTip: Required<any>, props: Required<FormItemProps> }>(FORM_KEY)

const isRequired = computed(() => {
  if (props.required === false)
    return false
  const rules = Parent.parent?.props?.rules
  let formRequired = false
  for (const key in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, key) && key === props.prop && Array.isArray(rules[key as any]))
      formRequired = rules[key as any].some((rule: FormItemRule) => rule.required)
  }
  return props.required || props.rules.some(rule => rule.required) || formRequired
})

const labelPositionClass = computed(() => {
  const labelPosition = Parent.parent?.props.labelPosition
  const position = props.labelPosition ? props.labelPosition : labelPosition

  return `nut-form-item__${position}`
})

const starPositionClass = computed(() => {
  const starPosition = Parent.parent?.props.starPosition
  const position = props.starPosition ? props.starPosition : starPosition
  return `nut-form-item__star-${position}`
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})
const labelStyle = computed(() => {
  return {
    width: pxCheck(props.labelWidth),
    textAlign: props.labelAlign,
  } as CSSProperties
})
const bodyStyle = computed(() => {
  return {
    textAlign: props.bodyAlign,
  } as CSSProperties
})
const formErrorTip = Parent.parent?.formErrorTip || {}

const errorMessageStyle = computed(() => {
  return {
    textAlign: props.errorMessageAlign,
  } as CSSProperties
})
const getSlots = (name: string) => slots[name]
</script>

<script lang="ts">
const componentName = `${PREFIX}-form-item`

export default defineComponent({
  name: componentName,
  inheritAttrs: false,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <NutCell
    :custom-class="[{ error: formErrorTip[prop], line: showErrorLine }, classes, labelPositionClass]"
    :custom-style="customStyle"
  >
    <view
      v-if="label || getSlots('label')"
      class="nut-cell__title nut-form-item__label"
      :style="labelStyle"
      :class="{ required: isRequired, [starPositionClass]: starPositionClass }"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </view>
    <view class="nut-cell__value nut-form-item__body">
      <view class="nut-form-item__body__slots" :style="bodyStyle">
        <slot />
      </view>
      <view v-if="formErrorTip[prop] && showErrorMessage" class="nut-form-item__body__tips" :style="errorMessageStyle">
        {{ formErrorTip[prop] }}
      </view>
    </view>
  </NutCell>
</template>

<style lang="scss">
@import './index';
</style>
