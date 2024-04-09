<script lang="ts" setup>
import { computed, defineComponent, nextTick, onMounted, ref, toRef, watch } from 'vue'
import type { InputOnBlurEvent, InputOnConfirmEvent, InputOnFocusEvent, InputOnInputEvent } from '@uni-helper/uni-app-types'
import { getMainClass, isH5 } from '../_utils'
import { BLUR_EVENT, CLEAR_EVENT, CLICK_EVENT, CONFIRM_EVENT, FOCUS_EVENT, INPUT_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { useFormDisabled } from '../form/form'
import { inputEmits, inputProps } from './input'
import { formatNumber } from './util'
import type { InputFormatTrigger, InputTarget } from './type'

const props = defineProps(inputProps)

const emit = defineEmits(inputEmits)

const formDisabled = useFormDisabled(toRef(props, 'disabled'))

function stringModelValue() {
  if (props.modelValue == null)
    return ''

  return String(props.modelValue)
}

const innerValue = computed<string>(() => {
  return stringModelValue()
})

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--disabled`]: formDisabled.value,
    [`${componentName}--required`]: props.required,
    [`${componentName}--error`]: props.error,
    [`${componentName}--border`]: props.border,
    [`${componentName}-text`]: true,
  })
})

const inputStyles = computed(() => {
  return [props.inputStyle, {
    textAlign: props.inputAlign,
  }]
})

const innerMaxLength = computed<number>(() => {
  return props.maxLength ? Number(props.maxLength) : -1
})

function updateValue(value: string, trigger: InputFormatTrigger = 'onChange') {
  if (props.maxLength && value.length > Number(props.maxLength))
    value = value.slice(0, Number(props.maxLength))

  if (props.type === 'number')
    value = formatNumber(value, false, false)

  if (props.type === 'digit')
    value = formatNumber(value, true, true)

  if (props.formatter && trigger === props.formatTrigger)
    value = props.formatter(value)

  emit(UPDATE_MODEL_EVENT, value)
}

function _onInput(evt: InputOnInputEvent) {
  updateValue(evt.detail.value)

  nextTick(() => {
    emit(INPUT_EVENT, innerValue.value, evt)
  })
}

function handleInput(evt: InputOnInputEvent) {
  if (isH5) {
    const target = evt.target as InputTarget

    if (!target.composing)
      _onInput(evt)
  }
  else {
    _onInput(evt)
  }
}

function handleClick(evt: any) {
  emit(CLICK_EVENT, evt)
}

function handleClickInput(evt: any) {
  if (formDisabled.value)
    return

  emit('clickInput', evt)
}

const active = ref<boolean>(false)

function handleFocus(evt: InputOnFocusEvent) {
  if (formDisabled.value || props.readonly)
    return

  active.value = true

  emit(FOCUS_EVENT, evt)
}

function handleBlur(evt: InputOnBlurEvent) {
  if (formDisabled.value || props.readonly)
    return

  setTimeout(() => {
    active.value = false
  }, 200)

  updateValue(evt.detail.value, 'onBlur')

  emit(BLUR_EVENT, evt)
}

function handleConfirm(evt: InputOnConfirmEvent) {
  emit(CONFIRM_EVENT, evt)
}

function handleClear(evt: any) {
  if (formDisabled.value)
    return

  emit(UPDATE_MODEL_EVENT, '', evt)
  emit(CLEAR_EVENT)
}

function startComposing(evt: any) {
  if (isH5) {
    const target = evt.target as InputTarget

    target.composing = true
  }
}

function endComposing(evt: any) {
  if (isH5) {
    const target = evt.target as InputTarget

    if (target.composing) {
      target.composing = false
      target.dispatchEvent(new Event('input'))
    }
  }
}

watch(
  () => props.modelValue,
  (value) => {
    if (value === innerValue.value)
      return

    updateValue(stringModelValue())
  },
)

onMounted(() => {
  updateValue(stringModelValue(), props.formatTrigger)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-input`

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
  <view :class="classes" :style="props.customStyle" @click="handleClick">
    <view class="nut-input-value">
      <view class="nut-input-inner">
        <view v-if="$slots.left" class="nut-input-left-box">
          <slot name="left" />
        </view>
        <view class="nut-input-box">
          <input
            class="input-text"
            :class="props.inputClass"
            :style="inputStyles"
            :value="innerValue"
            :type="props.type as any"
            :placeholder="props.placeholder"
            :placeholder-style="props.placeholderStyle"
            :placeholder-class="props.placeholderClass"
            :disabled="formDisabled"
            :readonly="props.readonly"
            :focus="props.autofocus"
            :maxlength="innerMaxLength"
            :format-trigger="props.formatTrigger"
            :auto-blur="props.autofocus ? true : undefined"
            :confirm-type="props.confirmType"
            :adjust-position="props.adjustPosition"
            :always-system="props.alwaysSystem"
            :inputmode="props.inputMode"
            :cursor-spacing="props.cursorSpacing"
            :always-embed="props.alwaysEmbed"
            :confirm-hold="props.confirmHold"
            :cursor="props.cursor"
            :selection-start="props.selectionStart"
            :selection-end="props.selectionEnd"
            :hold-keyboard="props.holdKeyboard"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @click="handleClickInput"
            @change="endComposing"
            @compositionstart="startComposing"
            @compositionend="endComposing"
            @confirm="handleConfirm"
          >
          <view v-if="props.readonly" class="nut-input-disabled-mask" @click="handleClickInput" />
          <view v-if="props.showWordLimit && props.maxLength" class="nut-input-word-limit">
            <text class="nut-input-word-num">
              {{ innerValue.length }}
            </text>/{{ props.maxLength }}
          </view>
        </view>
        <view
          v-if="props.clearable && !props.readonly"
          class="nut-input-clear-box"
          :class="{ 'nut-hidden': !((active || props.showClearIcon) && innerValue.length > 0) }"
          @click.stop="handleClear"
        >
          <slot name="clear">
            <NutIcon
              name="mask-close"
              custom-class="nut-input-clear"
              :size="props.clearSize"
              :width="props.clearSize"
              :height="props.clearSize"
            />
          </slot>
        </view>
        <view class="nut-input-right-box">
          <slot name="right" />
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
