<script lang="ts" setup>
import type { BaseEvent, InputOnBlurEvent, InputOnFocusEvent, InputOnInputEvent } from '@uni-helper/uni-app-types'
import type { CSSProperties } from 'vue'
import { computed, defineComponent, onMounted, toRef, useSlots, watch } from 'vue'
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass, pxCheck } from '../_utils'
import { useFormDisabled } from '../form/form'
import NutIcon from '../icon/icon.vue'
import { inputnumberEmits, inputnumberProps } from './inputnumber'

const props = defineProps(inputnumberProps)

const emit = defineEmits(inputnumberEmits)

const slots = useSlots()

const formDisabled = useFormDisabled(toRef(props, 'disabled'))

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--disabled`]: formDisabled.value,
  })
})

function toNumber(value: number | string) {
  if (typeof value === 'number') {
    return value
  }

  return Number(value)
}

const innerNumberValue = computed(() => {
  return toNumber(props.modelValue)
})

const innerStringValue = computed(() => {
  return String(props.modelValue)
})

const innerMinValue = computed(() => {
  return toNumber(props.min)
})

const innerMaxValue = computed(() => {
  return toNumber(props.max)
})

const innerStepValue = computed(() => {
  return toNumber(props.step)
})

const innerDigits = computed(() => {
  return toNumber(props.decimalPlaces)
})

const allowReduce = computed(() => {
  if (formDisabled.value) {
    return false
  }

  return innerNumberValue.value > innerMinValue.value
})

const allowAdd = computed(() => {
  if (formDisabled.value) {
    return false
  }

  return innerNumberValue.value < innerMaxValue.value
})

const leftClasses = computed(() => {
  return {
    [`${componentName}__icon--disabled`]: !allowReduce.value,
  }
})

const inputStyles = computed(() => {
  const value: CSSProperties = {}

  const { inputWidth, buttonSize } = props

  if (inputWidth) {
    value.width = pxCheck(inputWidth)
  }
  if (buttonSize) {
    value.height = pxCheck(buttonSize)
  }

  return value
})

const rightClasses = computed(() => {
  return {
    [`${componentName}__icon--disabled`]: !allowAdd.value,
  }
})

function formatValue(value: number | string) {
  const trulyValue = Math.max(
    innerMinValue.value,
    Math.min(
      innerMaxValue.value,
      toNumber(value),
    ),
  )

  return Number(trulyValue.toFixed(innerDigits.value))
}

function emitChange(value: number | string, event: BaseEvent) {
  const formattedValue = formatValue(value)

  emit(UPDATE_MODEL_EVENT, formattedValue)

  if (formattedValue !== innerNumberValue.value) {
    emit(CHANGE_EVENT, formattedValue, event)
  }
}

function handleInput(event: InputOnInputEvent) {
  if (formDisabled.value || props.readonly)
    return

  const finalValue = Number(event.detail.value)

  emit(UPDATE_MODEL_EVENT, finalValue)
  emit(CHANGE_EVENT, finalValue, event)
}

function handleReduce(event: BaseEvent) {
  if (formDisabled.value)
    return

  emit('reduce', event)

  const finalValue = innerNumberValue.value - innerStepValue.value

  if (allowReduce.value && finalValue >= innerMinValue.value) {
    emitChange(finalValue, event)
  }
  else {
    emitChange(innerMinValue.value, event)

    emit('overlimit', event, 'reduce')
  }
}

function handleAdd(event: BaseEvent) {
  if (formDisabled.value)
    return

  emit('add', event)

  const finalValue = innerNumberValue.value + innerStepValue.value

  if (allowAdd.value && finalValue <= innerMaxValue.value) {
    emitChange(finalValue, event)
  }
  else {
    emitChange(innerMaxValue.value, event)

    emit('overlimit', event, 'add')
  }
}

function handleFocus(event: InputOnFocusEvent) {
  if (formDisabled.value || props.readonly)
    return

  emit(FOCUS_EVENT, event)
}

function handleBlur(event: InputOnBlurEvent) {
  if (formDisabled.value || props.readonly)
    return

  emitChange(event.detail.value, event)

  emit(BLUR_EVENT, event)
}

function correctValue() {
  const formattedValue = formatValue(props.modelValue)

  if (formattedValue !== toNumber(props.modelValue)) {
    emit(UPDATE_MODEL_EVENT, formattedValue)
  }
}

watch(() => [props.min, props.max, props.decimalPlaces], () => {
  correctValue()
})

onMounted(() => {
  correctValue()
})
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
  <view :class="classes" :style="props.customStyle">
    <view
      class="nut-input-number__icon nut-input-number__left"
      :class="leftClasses"
      @click="handleReduce"
    >
      <slot v-if="slots.leftIcon" name="leftIcon" />

      <NutIcon v-else name="minus" :size="props.buttonSize" />
    </view>

    <view v-if="props.readonly" class="nut-input-number__text--readonly">
      {{ innerStringValue }}
    </view>

    <template v-else>
      <!-- #ifdef H5 -->
      <input
        v-bind="$attrs"
        class="nut-input-number__text--input"
        :style="inputStyles"
        :value="innerStringValue"
        type="number"
        :min="props.min"
        :max="props.max"
        :disabled="formDisabled"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- #endif -->

      <!-- #ifndef H5 -->
      <input
        class="nut-input-number__text--input"
        :style="inputStyles"
        :value="innerStringValue"
        type="number"
        :min="props.min"
        :max="props.max"
        :disabled="formDisabled"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- #endif -->
    </template>

    <view
      class="nut-input-number__icon nut-input-number__right"
      :class="rightClasses"
      @click="handleAdd"
    >
      <slot v-if="slots.rightIcon" name="rightIcon" />

      <NutIcon v-else name="plus" :size="props.buttonSize" />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
