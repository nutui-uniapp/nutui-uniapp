<!-- eslint-disable padded-blocks -->
<script lang="ts" setup>
import { type ComputedRef, computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { PREFIX, isH5 } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { inputEmits, inputProps } from './input'
import { formatNumber } from './util'
import type { InputFormatTrigger, InputTarget, InputType } from '.'

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

function inputType(type: InputType) {
  if (type === 'number')
    return 'text'

  if (type === 'digit')
    return 'tel'

  return type
}

function onInput(event: any) {
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
  // #2178 & Taro #2642
  emit('update:modelValue', value)
  if (props.maxLength && value.length > Number(props.maxLength))
    value = value.slice(0, Number(props.maxLength))

  if (props.type === 'digit')
    value = formatNumber(value, false, false)

  if (props.type === 'number')
    value = formatNumber(value, true, true)

  if (props.formatter && trigger === props.formatTrigger)
    value = props.formatter(value)

  if (value !== props.modelValue)
    emit('update:modelValue', value)
  // emit('change', value);

}

function onFocus(event: any) {
  if (props.disabled || props.readonly)
    return

  const input = event.detail as HTMLInputElement
  const value = input.value
  active.value = true
  emit('focus', event)
  // emit('update:modelValue', value);
}

function onBlur(event: any) {
  if (props.disabled || props.readonly)
    return

  setTimeout(() => {
    active.value = false
  }, 200)

  const input = event.detail as HTMLInputElement
  let value = input.value
  if (props.maxLength && value.length > Number(props.maxLength))
    value = value.slice(0, Number(props.maxLength))

  updateValue(getModelValue(), 'onBlur')
  emit('blur', event)
  // emit('update:modelValue', value);
}

function clear(event: Event) {
  event.stopPropagation()
  if (props.disabled)
    return
  emit('update:modelValue', '', event)
  // emit('change', '', event);
  emit('clear', '', event)
}

function resetValidation() {
  if (state.validateFailed) {
    state.validateFailed = false
    state.validateMessage = ''
  }
}

function onClickInput(event: MouseEvent) {
  if (props.disabled)
    return

  emit('clickInput', event)
}

function onClick(event: MouseEvent) {
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
  if (props.autofocus)
    inputRef.value.focus()

  updateValue(getModelValue(), props.formatTrigger)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-input`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
</script>

<template>
  <view :class="[classes, customClass]" @click="onClick">
    <view class="nut-input-value">
      <view class="nut-input-inner">
        <view class="nut-input-left-box">
          <slot name="left" />
        </view>
        <view class="nut-input-box">
          <input
            ref="inputRef"
            :type="inputType(type) as any"
            class="input-text"
            :style="styles"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxLength ? +maxLength : -1"
            :value="modelValue"
            :format-trigger="formatTrigger"
            :auto-blur="autofocus ? true : undefined"
            :confirm-type="confirmType"
            :adjust-position="adjustPosition"
            :always-system="alwaysSystem"
            :input-mode="inputMode"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur"
            @click="onClickInput"
            @change="endComposing"
            @compositionend="endComposing"
            @compositionstart="startComposing"
          >
          <view v-if="readonly" class="nut-input-disabled-mask" @click="onClickInput" />
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
          @click="clear"
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
