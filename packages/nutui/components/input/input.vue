<script lang="ts" setup>
import { type ComputedRef, computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import type { InputOnBlurEvent, InputOnConfirmEvent, InputOnFocusEvent } from '@uni-helper/uni-app-types'
import { isH5 } from '../_utils'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { inputEmits, inputProps } from './input'
import { formatNumber } from './util'
import type { InputFormatTrigger, InputMode, InputTarget, InputType } from '.'

const props = defineProps(inputProps)

const emit = defineEmits(inputEmits)

const active = ref(false)

const inputRef = ref()
const getModelValue = () => String(props.modelValue ? props.modelValue : '')

const state = reactive({
  focused: false,
  validateFailed: false, // 校验失败
  validateMessage: '', // 校验信息
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}--disabled`]: props.disabled,
    [`${prefixCls}--required`]: props.required,
    [`${prefixCls}--error`]: props.error,
    [`${prefixCls}--border`]: props.border,
  }
})

const styles: ComputedRef = computed(() => {
  return {
    textAlign: props.inputAlign,
  }
})

function getInputType(type: InputType): InputType {
  // #ifdef H5
  if (type === 'number')
    return 'tel'

  if (type === 'digit')
    return 'text'
  // #endif
  return type
}

function getInputMode(type: InputType, mode: InputMode): InputMode {
  // #ifdef H5
  if (type === 'digit')
    return 'decimal'
  if (type === 'number')
    return 'numeric'
  // #endif
  return mode
}

function handleInput(event: any) {
  if (isH5) {
    if (!(event.detail as InputTarget)!.composing)
      _onInput(event)
  }
  else {
    _onInput(event)
  }
}
function _onInput(event: any) {
  const input = event.detail as HTMLInputElement
  const value = input.value
  updateValue(value)
}

function updateValue(value: string, trigger: InputFormatTrigger = 'onChange') {
  emit('update:modelValue', value)
  if (props.maxLength && value.length > Number(props.maxLength))
    value = value.slice(0, Number(props.maxLength))

  if (props.type === 'number')
    value = formatNumber(value, false, false)

  if (props.type === 'digit')
    value = formatNumber(value, true, true)

  if (props.formatter && trigger === props.formatTrigger)
    value = props.formatter(value)

  if (value !== props.modelValue)
    emit('update:modelValue', value)
}

function resetValidation() {
  if (state.validateFailed) {
    state.validateFailed = false
    state.validateMessage = ''
  }
}

function handleClickInput(event: MouseEvent) {
  if (props.disabled)
    return

  emit('clickInput', event)
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}

function startComposing({ target }: Event) {
  if (isH5)
    (target as InputTarget)!.composing = true
}

function endComposing({ target }: Event) {
  if (isH5) {
    if ((target as InputTarget)!.composing) {
      (target as InputTarget)!.composing = false;
      (target as InputTarget)!.dispatchEvent(new Event('input'))
    }
  }
}
watch(
  () => props.modelValue,
  () => {
    updateValue(getModelValue())
    resetValidation()
  },
)

onMounted(() => {
  updateValue(getModelValue(), props.formatTrigger)
})

function handleFocus(evt: InputOnFocusEvent) {
  if (props.disabled || props.readonly)
    return

  active.value = true
  emit('focus', evt)
}

function handleBlur(evt: InputOnBlurEvent) {
  if (props.disabled || props.readonly)
    return

  setTimeout(() => {
    active.value = false
  }, 200)

  const input = evt.detail as HTMLInputElement
  let value = input.value
  if (props.maxLength && value.length > Number(props.maxLength))
    value = value.slice(0, Number(props.maxLength))

  updateValue(getModelValue(), 'onBlur')
  emit('blur', evt)
}

function handleClear(event: Event) {
  event.stopPropagation()
  if (props.disabled)
    return
  emit('update:modelValue', '', event)
  emit('clear')
}

function handleConfirm(event: InputOnConfirmEvent) {
  emit('confirm', event)
}
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
  <view :class="[classes, customClass]" @click="(handleClick as any)">
    <view class="nut-input-value">
      <view class="nut-input-inner">
        <view v-if="$slots.left" class="nut-input-left-box">
          <slot name="left" />
        </view>
        <view class="nut-input-box">
          <input
            ref="inputRef"
            :type="getInputType(props.type) as any"
            class="input-text"
            :style="[styles, props.customStyle]"
            :placeholder="placeholder"
            :placeholder-style="placeholderStyle"
            :placeholder-class="placeholderClass"
            :disabled="disabled"
            :readonly="readonly"
            :focus="autofocus"
            :maxlength="maxLength ? +maxLength : -1"
            :value="modelValue"
            :format-trigger="formatTrigger"
            :auto-blur="autofocus ? true : undefined"
            :confirm-type="confirmType"
            :adjust-position="adjustPosition"
            :always-system="alwaysSystem"
            :input-mode="getInputMode(props.type, props.inputMode)"
            :cursor-spacing="cursorSpacing"
            :always-embed="alwaysEmbed"
            :confirm-hold="confirmHold"
            :cursor="cursor"
            :selection-start="selectionStart"
            :selection-end="selectionEnd"
            :hold-keyboard="holdKeyboard"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @click="(handleClickInput as any)"
            @change="(endComposing as any)"
            @compositionend="(endComposing as any)"
            @compositionstart="(startComposing as any)"
            @confirm="handleConfirm"
          >
          <view v-if="props.readonly" class="nut-input-disabled-mask" @click="(handleClickInput as any)" />
          <view v-if="showWordLimit && maxLength" class="nut-input-word-limit">
            <text class="nut-input-word-num">
              {{ modelValue ? modelValue.length : 0 }}
            </text>/{{ maxLength }}
          </view>
        </view>
        <view
          v-if="clearable && !readonly"
          v-show="(active || showClearIcon) && modelValue.length > 0"
          class="nut-input-clear-box"
          @click="(handleClear as any)"
        >
          <slot name="clear">
            <NutIcon name="mask-close" custom-class="nut-input-clear" :size="clearSize" :width="clearSize" :height="clearSize" />
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
