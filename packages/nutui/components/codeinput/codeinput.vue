<script setup lang="ts">
import { type CSSProperties, nextTick } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { getPx } from '../_utils'
import { PREFIX } from '../_constants'
import { codeinputEmits, codeinputProps } from './codeinput'

const props = defineProps(codeinputProps)

const emit = defineEmits(codeinputEmits)
const inputValue = ref('')
const isFocus = ref(props.focus)

const codeLength = computed(() => {
  return Array.from({ length: Number(props.maxlength) })
})
const itemStyle = computed(() => {
  return (index: number) => {
    const style: CSSProperties = {
      width: `${props.size}px`,
      height: `${props.size}px`,
    }
    // 盒子模式下，需要额外进行处理
    if (props.mode === 'box') {
      // 设置盒子的边框，如果是细边框，则设置为0.5px宽度
      style.border = `${props.hairline ? 0.5 : 1}px solid ${props.borderColor}`
      // 如果盒子间距为0的话
      if (getPx(props.space) === 0) {
        // 给第一和最后一个盒子设置圆角
        if (index === 0) {
          style.borderTopLeftRadius = '3px'
          style.borderBottomLeftRadius = '3px'
        }
        if (index === codeLength.value.length - 1) {
          style.borderTopRightRadius = '3px'
          style.borderBottomRightRadius = '3px'
        }
        // 最后一个盒子的右边框需要保留
        if (index !== codeLength.value.length - 1)
          style.borderRight = 'none'
      }
    }
    if (index !== codeLength.value.length - 1) {
      // 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
      style.marginRight = `${props.space}px`
    }
    else {
      // 最后一个盒子的有边框需要保留
      style.marginRight = 0
    }

    return style
  }
})
const codeArray = computed(() => {
  return String(inputValue.value).split('')
})
const lineStyle = computed(() => {
  const style: CSSProperties = {}
  style.height = props.hairline ? '2px' : '4px'
  style.width = `${props.size}px`
  // 线条模式下，背景色即为边框颜色
  style.backgroundColor = props.borderColor
  return style
})

watch(() => props.modelValue, (val) => {
  // 转为字符串，超出部分截掉
  inputValue.value = String(val).substring(0, +props.maxlength)
}, {
  immediate: true,
})

function inputHandler(e: { detail: { value: string } }) {
  const value = e.detail.value
  emit('update:modelValue', value)

  inputValue.value = value
  // 是否允许输入“.”符号
  if (props.disabledDot) {
    nextTick(() => {
      inputValue.value = value.replace('.', '')
    })
  }
  // 未达到maxlength之前，发送change事件，达到后发送finish事件
  emit('change', value)
  // 修改通过v-model双向绑定的值
  emit('input', value)
  // 达到用户指定输入长度时，发出完成事件
  if (String(value).length >= Number(props.maxlength))
    emit('finish', value)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-code-input`

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
  <view class="nut-code-input">
    <view v-for="(item, index) in codeLength" :key="index" class="nut-code-input__item" :style="[itemStyle(index)]">
      <view v-if="dot && codeArray.length > index" class="nut-code-input__item__dot" />
      <text
        v-else :style="{
          fontSize: `${props.fontSize}px`,
          fontWeight: bold ? 'bold' : 'normal',
          color: customColor,
        }"
      >
        {{ codeArray[index] }}
      </text>
      <view v-if="mode === 'line'" class="nut-code-input__item__line" :style="[lineStyle]" />
      <!-- #ifndef APP-PLUS -->
      <view
        v-if="isFocus && codeArray.length === index" :style="{ backgroundColor: customColor }"
        class="nut-code-input__item__cursor"
      />
      <!-- #endif -->
    </view>
    <input
      :disabled="disabledKeyboard" type="number" :focus="focus" :value="inputValue" :maxlength="+maxlength"
      :adjustPosition="adjustPosition" class="nut-code-input__input" :style="{
        height: `${props.size}px`,
      }" @input="inputHandler" @focus="isFocus = true" @blur="isFocus = false"
    >
  </view>
</template>

<style lang="scss">
@import './index';
</style>
