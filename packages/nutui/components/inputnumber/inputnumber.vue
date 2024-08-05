<script lang="ts" setup>
import { computed, toRef } from 'vue'
import { getMainClass, pxCheck } from '../_utils'
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { useFormContext, useFormDisabled } from '../form'
import { useFormItemContext } from '../formitem'
import { inputnumberEmits, inputnumberProps } from './inputnumber'

const COMPONENT_NAME = 'nut-input-number'

defineOptions({
  name: COMPONENT_NAME,
  inheritAttrs: true,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(inputnumberProps)

const emit = defineEmits(inputnumberEmits)

const formContext = useFormContext()
const formItemContext = useFormItemContext()
const formDisabled = useFormDisabled(formContext, toRef(props, 'disabled'))

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--disabled`]: formDisabled.value,
  })
})

function fixedDecimalPlaces(v: string | number): string {
  return Number(v).toFixed(Number(props.decimalPlaces))
}

function change(event: any) {
  const value = event.detail.value
  emit(UPDATE_MODEL_EVENT, value, event)
  emit(CHANGE_EVENT, value, event)

  if (formItemContext !== undefined && formItemContext.triggers.value.change)
    formItemContext.validate('change')
}

function emitChange(value: string | number, event: any) {
  const output_value: number | string = fixedDecimalPlaces(value)
  emit(UPDATE_MODEL_EVENT, output_value, event)

  if (Number(props.modelValue) !== Number(output_value)) {
    emit(CHANGE_EVENT, output_value, event)

    if (formItemContext !== undefined && formItemContext.triggers.value.change)
      formItemContext.validate('change')
  }
}

function addAllow(value = Number(props.modelValue)): boolean {
  return value < Number(props.max) && !formDisabled.value
}

function reduceAllow(value = Number(props.modelValue)): boolean {
  return value > Number(props.min) && !formDisabled.value
}

function reduce(event: any) {
  if (formDisabled.value)
    return
  emit('reduce', event)
  const output_value = Number(props.modelValue) - Number(props.step)
  if (reduceAllow() && output_value >= Number(props.min)) {
    emitChange(output_value, event)
  }
  else {
    emitChange(Number(props.min), event)
    emit('overlimit', event, 'reduce')
  }
}

function add(event: any) {
  if (formDisabled.value)
    return
  emit('add', event)
  const output_value = Number(props.modelValue) + Number(props.step)
  if (addAllow() && output_value <= Number(props.max)) {
    emitChange(output_value, event)
  }
  else {
    emitChange(Number(props.max), event)
    emit('overlimit', event, 'add')
  }
}

function blur(event: any) {
  if (formDisabled.value)
    return
  if (props.readonly)
    return
  const input = event.target as HTMLInputElement
  // 如果没有值将不进行change修改
  if (input.value) {
    let value = +input.value
    if (value < Number(props.min))
      value = Number(props.min)
    else if (value > Number(props.max))
      value = Number(props.max)
    emitChange(value, event)
  }

  emit(BLUR_EVENT, event)

  if (formItemContext !== undefined && formItemContext.triggers.value.blur)
    formItemContext.validate('blur')
}

function focus(event: any) {
  if (formDisabled.value)
    return
  if (props.readonly) {
    blur(event)
    return
  }
  emit(FOCUS_EVENT, event)
}
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view
      class="nut-input-number__icon nut-input-number__left"
      :class="{ 'nut-input-number__icon--disabled': !reduceAllow() }"
      @click="reduce"
    >
      <slot name="leftIcon">
        <NutIcon name="minus" :size="pxCheck(props.buttonSize)" />
      </slot>
    </view>

    <view v-if="props.readonly" class="nut-input-number__text--readonly">
      {{ props.modelValue }}
    </view>

    <template v-else>
      <!-- #ifdef MP -->
      <input
        class="nut-input-number__text--input"
        type="number"
        :min="props.min"
        :max="props.max"
        :style="{ width: pxCheck(props.inputWidth), height: pxCheck(props.buttonSize) }"
        :disabled="formDisabled"
        :readonly="readonly"
        :value="String(props.modelValue)"
        @input="change"
        @blur="blur"
        @focus="focus"
      >
      <!-- #endif -->

      <!-- #ifndef MP -->
      <input
        v-bind="$attrs"
        class="nut-input-number__text--input"
        type="number"
        :min="props.min"
        :max="props.max"
        :style="{ width: pxCheck(props.inputWidth), height: pxCheck(props.buttonSize) }"
        :disabled="formDisabled"
        :readonly="readonly"
        :value="String(props.modelValue)"
        @input="change"
        @blur="blur"
        @focus="focus"
      >
      <!-- #endif -->
    </template>

    <view
      class="nut-input-number__icon nut-input-number__right"
      :class="{ 'nut-input-number__icon--disabled': !addAllow() }"
      @click="add"
    >
      <slot name="rightIcon">
        <NutIcon name="plus" :size="pxCheck(props.buttonSize)" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
