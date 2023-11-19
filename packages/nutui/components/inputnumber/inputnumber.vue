<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { getMainClass, pxCheck } from '../_utils'
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { inputnumberEmits, inputnumberProps } from './inputnumber'

const props = defineProps(inputnumberProps)
const emit = defineEmits(inputnumberEmits)
const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--disabled`]: props.disabled,
  })
})
function fixedDecimalPlaces(v: string | number): string {
  return Number(v).toFixed(Number(props.decimalPlaces))
}
function change(event: any) {
  const value = event.detail.value
  emit(UPDATE_MODEL_EVENT, value, event)
}
function emitChange(value: string | number, event: Event) {
  const output_value: number | string = fixedDecimalPlaces(value)
  emit(UPDATE_MODEL_EVENT, output_value, event)
  if (Number(props.modelValue) !== Number(output_value))
    emit(CHANGE_EVENT, output_value, event)
}
function addAllow(value = Number(props.modelValue)): boolean {
  return value < Number(props.max) && !props.disabled
}
function reduceAllow(value = Number(props.modelValue)): boolean {
  return value > Number(props.min) && !props.disabled
}
function reduce(event: Event) {
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
function add(event: Event) {
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
function blur(event: Event) {
  if (props.disabled)
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
}
function focus(event: Event) {
  if (props.disabled)
    return
  if (props.readonly) {
    blur(event)
    return
  }
  emit(FOCUS_EVENT, event)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-input-number`

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
  <view :class="classes" :style="customStyle">
    <view
      class="nut-input-number__icon nut-input-number__left"
      :class="{ 'nut-input-number__icon--disabled': !reduceAllow() }"
      @click="(reduce as any)"
    >
      <slot name="leftIcon">
        <NutIcon name="minus" :size="pxCheck(buttonSize)" />
      </slot>
    </view>
    <view v-if="props.readonly" class="nut-input-number__text--readonly">
      {{ modelValue }}
    </view>
    <input
      v-else
      class="nut-input-number__text--input"
      type="number"
      :min="min"
      :max="max"
      :style="{ width: pxCheck(inputWidth), height: pxCheck(buttonSize) }"
      :disabled="disabled"
      :readonly="readonly"
      :value="String(modelValue)"
      @input="(change as any)"
      @blur="(blur as any)"
      @focus="(focus as any)"
    >
    <view
      class="nut-input-number__icon nut-input-number__right"
      :class="{ 'nut-input-number__icon--disabled': !addAllow() }"
      @click="(add as any)"
    >
      <slot name="rightIcon">
        <NutIcon name="plus" :size="pxCheck(buttonSize)" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
