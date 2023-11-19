<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type * as CSS from 'csstype'
import { computed, defineComponent, ref } from 'vue'
import type { TextareaConfirmType, TextareaOnConfirmEvent } from '@uni-helper/uni-app-types'
import { getMainClass, isH5, isMpAlipay, pxCheck } from '../_utils'
import { BLUR_EVENT, CHANGE_EVENT, CONFIRM_EVENT, FOCUS_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import { textareaEmits, textareaProps } from './textarea'

export interface InputTarget extends HTMLInputElement {
  composing?: boolean
}

const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--disabled`]: props.disabled,
  })
})

const styles = computed<CSSProperties>(() => {
  const styleObj: CSSProperties = {
    textAlign: props.textAlign as CSS.TextAlignProperty,
  }

  if (typeof props.autosize === 'object') {
    const { minHeight, maxHeight } = props.autosize

    if (minHeight != null)
      styleObj.minHeight = pxCheck(minHeight)

    if (maxHeight != null)
      styleObj.maxHeight = pxCheck(maxHeight)
  }

  return styleObj
})

function emitChange(value: string, event: Event) {
  if (props.maxLength && value.length > Number(props.maxLength))
    value = value.substring(0, Number(props.maxLength))

  emit(UPDATE_MODEL_EVENT, value, event)
  emit(CHANGE_EVENT, value, event)
}

function change(event: any) {
  if (isH5) {
    if (!composing.value)
      _onInput(event)
  }
  else {
    _onInput(event)
  }
}

function _onInput(event: any) {
  const input = event.detail as HTMLInputElement
  let value = input.value
  if (props.maxLength && value.length > Number(props.maxLength))
    value = value.slice(0, Number(props.maxLength))

  emitChange(value, event)
}

function focus(event: any) {
  if (props.disabled)
    return
  if (props.readonly)
    return
  emit(FOCUS_EVENT, event)
}

function blur(event: any) {
  if (props.disabled)
    return
  if (props.readonly)
    return
  const input = event.detail as HTMLInputElement
  const value = input.value
  emitChange(value, event)
  emit(BLUR_EVENT, event)
}

function confirm(event: TextareaOnConfirmEvent) {
  emit(CONFIRM_EVENT, event)
}

const composing = ref(false)
function startComposing(event: Event) {
  if (isH5)
    composing.value = true
}

function endComposing({ target }: Event) {
  if (isH5) {
    if (composing.value) {
      composing.value = false;
      (target as InputTarget).dispatchEvent(new Event('input'))
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
  <view :class="classes" :style="customStyle">
    <textarea v-if="props.readonly" id="nut-textarea__textarea" v-model="modelValue" :disabled="true" class="nut-textarea__textarea nut-textarea__textarea__readonly" />
    <textarea
      v-else
      id="nut-textarea__textarea"
      class="nut-textarea__textarea" :class="[isMpAlipay && 'nut-textarea__ali']"
      :style="styles"
      :rows="rows"
      :disabled="disabled || readonly"
      :value="modelValue"
      :show-count="false"
      :maxlength="maxLength ? +maxLength : -1"
      :placeholder="placeholder || translate('placeholder')"
      :auto-focus="autofocus"
      :auto-height="!!autosize"
      :cursor-spacing="cursorSpacing"
      :cursor="cursor"
      :show-confirm-bar="showConfirmBar"
      :selection-start="selectionStart"
      :selection-end="selectionEnd"
      :adjust-position="adjustPosition"
      :hold-keyboard="holdKeyboard"
      :disable-default-padding="disableDefaultPadding"
      :confirm-type="confirmType as TextareaConfirmType"
      :confirm-hold="confirmHold"
      :adjust-keyboard-to="adjustKeyboardTo"
      @confirm="confirm"
      @input="change"
      @blur="blur"
      @focus="focus"
      @change="(endComposing as any)"
      @compositionend="(endComposing as any)"
      @compositionstart="(startComposing as any)"
    />
    <view v-if="limitShow" class="nut-textarea__limit">
      {{ modelValue ? modelValue.length : 0 }}/{{ maxLength }}
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
