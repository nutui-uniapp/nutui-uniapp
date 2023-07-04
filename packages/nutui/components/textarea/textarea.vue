<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import type { CSSProperties, ComponentInternalInstance } from 'vue'
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { PREFIX, isH5, isMpAlipay } from '../_utils'
import { useTranslate } from '../../locale'
import { textareaEmits, textareaProps } from './textarea'

export interface InputTarget extends HTMLInputElement {
  composing?: boolean
}
const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)
const instance = getCurrentInstance() as ComponentInternalInstance

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

  const query = uni.createSelectorQuery().in(instance)
  query.select('#nut-textarea__cpoytext').boundingClientRect()
  query.exec((res) => {

    if (res[0]) {
      if (props.modelValue === '')
        textareaHeight.value = 20
      else
        textareaHeight.value = res[0].height || 20

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
    <view v-if="readonly" id="nut-textarea__textarea" class="nut-textarea__textarea nut-textarea__textarea__readonly">
      {{ modelValue }}
    </view>
    <textarea
      v-else
      id="nut-textarea__textarea"
      class="nut-textarea__textarea" :class="[isMpAlipay && 'nut-textarea__ali']"
      :style="styles"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      :value="modelValue"
      :show-count="false"
      :maxlength="maxLength ? +maxLength : -1"
      :placeholder="placeholder || translate('placeholder')"
      :auto-focus="autofocus"
      @input="change"
      @blur="blur"
      @focus="focus"
      @change="endComposing"
      @compositionend="endComposing"
      @compositionstart="startComposing"
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
