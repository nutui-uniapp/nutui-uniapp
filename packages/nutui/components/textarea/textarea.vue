<script setup lang="ts">
import type { TextareaConfirmType, TextareaOnBlurEvent, TextareaOnConfirmEvent, TextareaOnFocusEvent, TextareaOnInputEvent } from '@uni-helper/uni-app-types'
import type { CSSProperties } from 'vue'
import { computed, defineComponent, nextTick, toRef } from 'vue'
import { BLUR_EVENT, CHANGE_EVENT, CONFIRM_EVENT, FOCUS_EVENT, INPUT_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass, isH5, isMpAlipay, pxCheck } from '../_utils'
import { useTranslate } from '../../locale'
import { useFormDisabled } from '../form/form'
import type { InputTarget } from '../input/type'
import { textareaEmits, textareaProps } from './textarea'

const props = defineProps(textareaProps)

const emit = defineEmits(textareaEmits)

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
  })
})

const textareaClasses = computed(() => {
  return [props.textareaClass, {
    'nut-textarea__ali': isMpAlipay,
  }]
})

const textareaStyles = computed(() => {
  const style: CSSProperties = {
    textAlign: props.textAlign,
  }

  if (typeof props.autosize === 'object') {
    const { minHeight, maxHeight } = props.autosize

    if (minHeight != null)
      style.minHeight = pxCheck(minHeight)

    if (maxHeight != null)
      style.maxHeight = pxCheck(maxHeight)
  }

  return [props.textareaStyle, style]
})

const innerMaxLength = computed(() => {
  if (props.maxLength == null)
    return -1

  return Number(props.maxLength)
})

function updateValue(value: string, evt: any) {
  if (innerMaxLength.value > 0 && value.length > innerMaxLength.value)
    value = value.slice(0, innerMaxLength.value)

  emit(UPDATE_MODEL_EVENT, value, evt)
  emit(CHANGE_EVENT, value, evt)
}

function _onInput(evt: TextareaOnInputEvent) {
  updateValue(evt.detail.value, evt)

  nextTick(() => {
    emit(INPUT_EVENT, innerValue.value, evt)
  })
}

function handleInput(evt: any) {
  if (isH5) {
    const target = evt.target as InputTarget

    if (!target.composing)
      _onInput(evt)
  }
  else {
    _onInput(evt)
  }
}

function handleFocus(evt: TextareaOnFocusEvent) {
  if (formDisabled.value || props.readonly)
    return

  emit(FOCUS_EVENT, evt)
}

function handleBlur(evt: TextareaOnBlurEvent) {
  if (formDisabled.value || props.readonly)
    return

  updateValue(evt.detail.value, evt)

  emit(BLUR_EVENT, evt)
}

function handleConfirm(evt: TextareaOnConfirmEvent) {
  emit(CONFIRM_EVENT, evt)
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
</script>

<script lang="ts">
const componentName = `${PREFIX}-textarea`
const { translate } = useTranslate(componentName)

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
  <view :class="classes" :style="props.customStyle">
    <textarea
      v-if="props.readonly"
      class="nut-textarea__textarea nut-textarea__textarea__readonly"
      :class="textareaClasses"
      :style="textareaStyles"
      :value="innerValue"
      :rows="props.rows"
      :disabled="true"
      :show-count="false"
      :placeholder="props.placeholder || translate('placeholder')"
      :placeholder-style="props.placeholderStyle"
      :placeholder-class="props.placeholderClass"
      :auto-height="!!props.autosize"
      :disable-default-padding="props.disableDefaultPadding"
    />
    <textarea
      v-else
      class="nut-textarea__textarea"
      :class="textareaClasses"
      :style="textareaStyles"
      :value="innerValue"
      :rows="props.rows"
      :disabled="formDisabled || props.readonly"
      :show-count="false"
      :maxlength="innerMaxLength"
      :placeholder="props.placeholder || translate('placeholder')"
      :placeholder-style="props.placeholderStyle"
      :placeholder-class="props.placeholderClass"
      :auto-focus="props.autofocus"
      :auto-height="!!props.autosize"
      :cursor-spacing="props.cursorSpacing"
      :cursor="props.cursor"
      :show-confirm-bar="props.showConfirmBar"
      :selection-start="props.selectionStart"
      :selection-end="props.selectionEnd"
      :adjust-position="props.adjustPosition"
      :hold-keyboard="props.holdKeyboard"
      :disable-default-padding="props.disableDefaultPadding"
      :confirm-type="props.confirmType as TextareaConfirmType"
      :confirm-hold="props.confirmHold"
      :adjust-keyboard-to="props.adjustKeyboardTo"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="endComposing"
      @compositionstart="startComposing"
      @compositionend="endComposing"
      @confirm="handleConfirm"
    />
    <view v-if="props.limitShow && innerMaxLength > 0" class="nut-textarea__limit">
      {{ innerValue.length }}/{{ innerMaxLength }}
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
