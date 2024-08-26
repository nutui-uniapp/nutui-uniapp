<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, nextTick, toRef } from 'vue'
import type {
  TextareaConfirmType,
  TextareaOnBlurEvent,
  TextareaOnConfirmEvent,
  TextareaOnFocusEvent,
  TextareaOnInputEvent,
} from '@uni-helper/uni-app-types'
import { useTranslate } from '../../locale'
import { BLUR_EVENT, CHANGE_EVENT, CONFIRM_EVENT, FOCUS_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass, isH5, isMpAlipay, pxCheck } from '../_utils'
import { useFormContext, useFormDisabled } from '../form'
import { useFormItemContext } from '../formitem'
import type { InputTarget } from '../input/types'
import { textareaEmits, textareaProps } from './textarea'

const COMPONENT_NAME = 'nut-textarea'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(textareaProps)

const emit = defineEmits(textareaEmits)

const { translate } = useTranslate(COMPONENT_NAME)

const formContext = useFormContext()
const formItemContext = useFormItemContext()
const formDisabled = useFormDisabled(formContext, toRef(props, 'disabled'))

function stringModelValue() {
  if (props.modelValue == null)
    return ''

  return String(props.modelValue)
}

const innerValue = computed(() => {
  return stringModelValue()
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--disabled`]: formDisabled.value,
  })
})

const textareaClasses = computed(() => {
  return [props.textareaClass, {
    'nut-textarea__ali': isMpAlipay,
  }]
})

const textareaStyles = computed(() => {
  const value: CSSProperties = {
    textAlign: props.textAlign,
  }

  if (typeof props.autosize === 'object') {
    const { minHeight, maxHeight } = props.autosize

    if (minHeight != null)
      value.minHeight = pxCheck(minHeight)

    if (maxHeight != null)
      value.maxHeight = pxCheck(maxHeight)
  }

  return [props.textareaStyle, value]
})

const innerMaxLength = computed(() => {
  if (props.maxLength == null)
    return -1

  return Number(props.maxLength)
})

function updateValue(value: string, event: any) {
  if (innerMaxLength.value > 0 && value.length > innerMaxLength.value)
    value = value.slice(0, innerMaxLength.value)

  emit(UPDATE_MODEL_EVENT, value, event)
  emit(CHANGE_EVENT, value, event)

  if (formItemContext !== undefined && formItemContext.triggers.value.change)
    formItemContext.validate('change')
}

function _onInput(event: TextareaOnInputEvent) {
  updateValue(event.detail.value, event)

  nextTick(() => {
    emit(INPUT_EVENT, innerValue.value, event)
  })
}

function handleInput(event: any) {
  if (isH5) {
    const target = event.target as InputTarget

    if (!target.composing)
      _onInput(event)
  }
  else {
    _onInput(event)
  }
}

function handleFocus(event: TextareaOnFocusEvent) {
  if (formDisabled.value || props.readonly)
    return

  emit(FOCUS_EVENT, event)
}

function handleBlur(event: TextareaOnBlurEvent) {
  if (formDisabled.value || props.readonly)
    return

  updateValue(event.detail.value, event)

  emit(BLUR_EVENT, event)

  if (formItemContext !== undefined && formItemContext.triggers.value.blur)
    formItemContext.validate('blur')
}

function handleConfirm(event: TextareaOnConfirmEvent) {
  emit(CONFIRM_EVENT, event)
}

function startComposing(event: any) {
  if (isH5) {
    const target = event.target as InputTarget

    target.composing = true
  }
}

function endComposing(event: any) {
  if (isH5) {
    const target = event.target as InputTarget

    if (target.composing) {
      target.composing = false
      target.dispatchEvent(new Event('input'))
    }
  }
}
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
@import "./index";
</style>
