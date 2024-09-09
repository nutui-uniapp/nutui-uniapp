<script lang="ts" setup>
import type { BaseEvent, InputOnBlurEvent, InputOnFocusEvent, InputOnInputEvent } from '@uni-helper/uni-app-types'
import type { CSSProperties } from 'vue'
import { computed, defineComponent, nextTick, onMounted, ref, toRef, useSlots, watch } from 'vue'
import { BLUR_EVENT, CHANGE_EVENT, FOCUS_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass, pxCheck } from '../_utils'
import { useFormDisabled } from '../form/form'
import NutIcon from '../icon/icon.vue'
import { inputnumberEmits, inputnumberProps } from './inputnumber'

type UpdateSource = '' | 'click' | 'input' | 'blur'

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

const innerValue = computed(() => {
  return toNumber(props.modelValue)
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

const allowDecrease = computed(() => {
  if (formDisabled.value) {
    return false
  }

  return innerValue.value > innerMinValue.value
})

const allowIncrease = computed(() => {
  if (formDisabled.value) {
    return false
  }

  return innerValue.value < innerMaxValue.value
})

const decreaseClasses = computed(() => {
  return {
    [`${componentName}__icon--disabled`]: !allowDecrease.value,
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

const increaseClasses = computed(() => {
  return {
    [`${componentName}__icon--disabled`]: !allowIncrease.value,
  }
})

const inputValue = ref('')

let updateSource: UpdateSource = ''

function precisionValue(value: number, type: 'number'): number
function precisionValue(value: number, type: 'string'): string
function precisionValue(value: number, type: 'number' | 'string') {
  const fixedValue = value.toFixed(innerDigits.value)

  if (type === 'string') {
    return fixedValue
  }

  return Number(fixedValue)
}

function updateInputValue(value: number) {
  const finalValue = precisionValue(value, 'string')

  if (finalValue !== inputValue.value) {
    inputValue.value = finalValue
  }
  else {
    inputValue.value = ''

    nextTick(() => {
      inputValue.value = finalValue
    })
  }
}

function formatValue(value: number | string) {
  let trulyValue = Math.max(
    innerMinValue.value,
    Math.min(
      innerMaxValue.value,
      toNumber(value),
    ),
  )

  if (props.stepStrictly) {
    trulyValue = Math.round(trulyValue / innerStepValue.value) * innerStepValue.value
  }

  return precisionValue(trulyValue, 'number')
}

function emitChange(source: UpdateSource, value: number | string, event?: BaseEvent) {
  updateSource = source

  const formattedValue = formatValue(value)

  if (['', 'blur'].includes(updateSource)) {
    updateInputValue(formattedValue)
  }

  if (formattedValue !== props.modelValue) {
    emit(UPDATE_MODEL_EVENT, formattedValue)
    emit(CHANGE_EVENT, formattedValue, event)
  }
}

function handleInput(event: InputOnInputEvent) {
  if (formDisabled.value || props.readonly)
    return

  emitChange('input', event.detail.value, event)
}

function handleDecrease(event: BaseEvent) {
  if (formDisabled.value)
    return

  emit('reduce', event)

  const finalValue = innerValue.value - innerStepValue.value

  if (allowDecrease.value && finalValue >= innerMinValue.value) {
    emitChange('click', finalValue, event)
  }
  else {
    emit('overlimit', event, 'reduce')

    emitChange('click', innerMinValue.value, event)
  }
}

function handleIncrease(event: BaseEvent) {
  if (formDisabled.value)
    return

  emit('add', event)

  const finalValue = innerValue.value + innerStepValue.value

  if (allowIncrease.value && finalValue <= innerMaxValue.value) {
    emitChange('click', finalValue, event)
  }
  else {
    emit('overlimit', event, 'add')

    emitChange('click', innerMaxValue.value, event)
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

  emit(BLUR_EVENT, event)

  emitChange('blur', event.detail.value, event)
}

function correctValue() {
  emitChange('', props.modelValue)
}

watch(() => props.modelValue, () => {
  if (updateSource === 'input') {
    updateSource = ''
    return
  }

  correctValue()
})

watch(() => [
  props.min,
  props.max,
  props.step,
  props.stepStrictly,
  props.decimalPlaces,
], () => {
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
      :class="decreaseClasses"
      @click="handleDecrease"
    >
      <slot v-if="slots.leftIcon" name="leftIcon" />

      <NutIcon v-else name="minus" :size="props.buttonSize" />
    </view>

    <view v-if="props.readonly" class="nut-input-number__text--readonly">
      {{ inputValue }}
    </view>

    <template v-else>
      <!-- #ifdef H5 -->
      <input
        v-model="inputValue"
        v-bind="$attrs"
        class="nut-input-number__text--input"
        :style="inputStyles"
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
        v-model="inputValue"
        class="nut-input-number__text--input"
        :style="inputStyles"
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
      :class="increaseClasses"
      @click="handleIncrease"
    >
      <slot v-if="slots.rightIcon" name="rightIcon" />

      <NutIcon v-else name="plus" :size="props.buttonSize" />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
