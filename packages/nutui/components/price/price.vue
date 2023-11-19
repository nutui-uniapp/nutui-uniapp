<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { priceProps } from './price'

const props = defineProps(priceProps)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--strike`]: props.strikeThrough,
  })
})
function replaceSpecialChar(url: string) {
  url = url.replace(/&quot;/g, '"')
  url = url.replace(/&amp;/g, '&')
  url = url.replace(/&lt;/g, '<')
  url = url.replace(/&gt;/g, '>')
  url = url.replace(/&nbsp;/g, ' ')
  url = url.replace(/&yen;/g, '￥')
  return url
}
const showSymbol = computed(() => {
  const symbol = props.needSymbol ? replaceSpecialChar(props.symbol) : ''
  return symbol
})
function checkPoint(price: string | number) {
  return String(price).indexOf('.') > 0
}

function formatThousands(num: any) {
  if (Number(num) === 0)
    num = 0

  if (checkPoint(num)) {
    num = Number(num).toFixed(props.decimalDigits)
    num = typeof num.split('.') === 'string' ? num.split('.') : num.split('.')[0]
  }
  else {
    num = num.toString()
  }
  if (props.thousands)
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  else
    return num
}
function formatDecimal(decimalNum: any) {
  if (Number(decimalNum) === 0)
    decimalNum = 0

  if (checkPoint(decimalNum)) {
    decimalNum = Number(decimalNum).toFixed(props.decimalDigits)
    decimalNum
          = typeof decimalNum.split('.') === 'string' ? 0 : decimalNum.split('.')[1] ? decimalNum.split('.')[1] : 0
  }
  else {
    decimalNum = 0
  }
  const result = `0.${decimalNum}`
  const resultFixed = Number(result).toFixed(props.decimalDigits)
  return String(resultFixed).substring(2, resultFixed.length)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-price`

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
  <view :class="classes" :style="customStyle">
    <rich-text
      v-if="needSymbol && position === 'before'"
      class="nut-price--symbol"
      :class="`nut-price--symbol-${size}`"
      :nodes="showSymbol"
    />
    <view :class="`nut-price--${size}`">
      {{ formatThousands(price) }}
    </view>
    <view v-if="decimalDigits !== 0" :class="`nut-price--decimal-${size}`">
      .
    </view>
    <view :class="`nut-price--decimal-${size}`">
      {{ formatDecimal(price) }}
    </view>
    <rich-text
      v-if="needSymbol && position === 'after'"
      class="nut-price--symbol"
      :class="`nut-price--symbol-${size}`"
      :nodes="showSymbol"
    />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
