<script lang="ts" setup>
import { computed } from 'vue'
import { getMainClass } from '../_utils'
import { priceProps } from './price'

const COMPONENT_NAME = 'nut-price'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(priceProps)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--strike`]: props.strikeThrough,
  })
})

const innerSymbol = computed(() => {
  if (!props.needSymbol)
    return ''

  return props.symbol.replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&yen;/g, '￥')
})

function roundTo(value: number, digits: number) {
  const factor = 10 ** digits

  return Math.round(value * factor) / factor
}

const innerValue = computed(() => {
  const stringValue = roundTo(Number(props.price), props.decimalDigits).toFixed(props.decimalDigits)

  let integer: string
  let decimal: string

  const existPoint = stringValue.includes('.')

  if (existPoint) {
    const fragments = stringValue.split('.')

    integer = fragments[0]
    decimal = fragments[1]
  }
  else {
    integer = stringValue
    decimal = ''
  }

  if (props.thousands)
    integer = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

  return {
    integer,
    decimal,
  }
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <rich-text
      v-if="props.needSymbol && props.position === 'before'"
      class="nut-price--symbol"
      :class="`nut-price--symbol-${props.size}`"
      :nodes="innerSymbol"
    />

    <text :class="`nut-price--${props.size}`">
      {{ innerValue.integer }}
    </text>

    <text v-if="innerValue.decimal.length > 0" :class="`nut-price--decimal-${props.size}`">
      .{{ innerValue.decimal }}
    </text>

    <rich-text
      v-if="props.needSymbol && props.position === 'after'"
      class="nut-price--symbol"
      :class="`nut-price--symbol-${props.size}`"
      :nodes="innerSymbol"
    />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
