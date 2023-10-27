<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import type { CSSProperties, ComponentInternalInstance } from 'vue'
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import type { TextareaConfirmType } from '@uni-helper/uni-app-types'
import { isH5, isMpAlipay } from '../_utils'
import { PREFIX } from '../_constants'
import { useTranslate } from '../../locale'
import { useSelectorQuery } from '../_hooks'
import { textareaEmits, textareaProps } from './textarea'

export interface InputTarget extends HTMLInputElement {
  composing?: boolean
}
const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)
const instance = getCurrentInstance() as ComponentInternalInstance
const { getSelectorNodeInfo } = useSelectorQuery(instance)

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}--disabled`]: props.disabled,
  }
})

const styles: any = computed(() => {
  const styleObj: { textAlign: string; height?: string } = {
    textAlign: props.textAlign,
  }
  if (props.autosize)
    styleObj.height = heightSet.value

  return styleObj
})

const copyTxtStyle = ref<CSSProperties>({
  wordBreak: 'break-all',
  width: '0',
})

function emitChange(value: string, event: Event) {
  if (props.maxLength && value.length > Number(props.maxLength))
    value = value.substring(0, Number(props.maxLength))

  emit('update:modelValue', value, event)
  emit('change', value, event)
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
  emit('focus', event)
}

function blur(event: any) {
  if (props.disabled)
    return
  if (props.readonly)
    return
  const input = event.detail as HTMLInputElement
  const value = input.value
  emitChange(value, event)
  emit('blur', event)
}

function _confirm(event: any) {
  emit('confirm', event)
}

const textareaHeight = ref(20)
const heightSet = ref('auto')
function getContentHeight() {
  heightSet.value = 'auto'
  let height = textareaHeight.value
  if (typeof props.autosize === 'object') {
    const { maxHeight, minHeight } = props.autosize
    if (maxHeight !== undefined)
      height = Math.min(height, maxHeight)

    if (minHeight !== undefined)
      height = Math.max(height, minHeight)
  }
  if (height)
    heightSet.value = `${height}px`
}
watch(
  () => props.modelValue,
  () => {
    if (props.autosize) {
      setTimeout(() => {
        copyHeight()
      }, 100)
    }
  },
)

function copyHeight() {
  getSelectorNodeInfo('#nut-textarea__cpoytext').then((res) => {
    if (res) {
      if (props.modelValue === '')
        textareaHeight.value = 20
      else
        textareaHeight.value = res.height || 20

      nextTick(getContentHeight)
    }
  })
}

function getRefWidth() {
  const query = uni.createSelectorQuery().in(instance)
  query.select('#nut-textarea__textarea').boundingClientRect()
  query.exec((res: any) => {
    if (res[0])
      copyTxtStyle.value.width = `${res[0].width}px`
  })
}
onMounted(() => {
  if (props.autosize) {
    nextTick(() => {
      setTimeout(() => {
        getRefWidth()
        copyHeight()
      }, 300)
    })
  }
})
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
  <view :class="classes">
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
    <view v-if="autosize" id="nut-textarea__cpoytext" class="nut-textarea__cpoytext" :style="copyTxtStyle">
      {{ modelValue }}
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
