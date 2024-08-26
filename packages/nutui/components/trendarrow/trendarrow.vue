<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, reactive, useSlots, watch } from 'vue'
import NutIcon from '../icon/icon.vue'
import { getMainClass, myFixed } from '../_utils'
import { trendarrowProps } from './trendarrow'

const COMPONENT_NAME = 'nut-trend-arrow'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(trendarrowProps)

const slots = useSlots()

const state = reactive({
  rateTrend: props.rate > 0,
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const innerText = computed(() => {
  if (!props.showZero && props.rate === 0)
    return '--'

  const sign = props.showSign && props.rate !== 0 ? (state.rateTrend ? '+' : '-') : ''

  const value = myFixed(Math.abs(props.rate), props.digits)

  return `${sign}${value}%`
})

const innerStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.rate === 0) {
    value.color = props.textColor
  }
  else {
    if (props.syncTextColor) {
      if (state.rateTrend) {
        value.color = props.riseColor
      }
      else {
        value.color = props.dropColor
      }
    }
    else {
      value.color = props.textColor
    }
  }

  return value
})

watch(() => props.rate, (value) => {
  state.rateTrend = value > 0
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <text
      v-if="!props.arrowLeft"
      class="nut-trend-arrow-icon-before nut-trend-arrow-rate"
      :style="innerStyles"
    >{{ innerText }}</text>

    <template v-if="props.rate !== 0">
      <template v-if="state.rateTrend">
        <slot v-if="slots.upIcon" name="upIcon" />

        <NutIcon v-else name="triangle-up" :custom-color="props.riseColor" />
      </template>

      <template v-else>
        <slot v-if="slots.downIcon" name="downIcon" />

        <NutIcon v-else name="triangle-down" :custom-color="props.dropColor" />
      </template>
    </template>

    <text
      v-if="props.arrowLeft"
      class="nut-trend-arrow-icon-after nut-trend-arrow-rate"
      :style="innerStyles"
    >{{ innerText }}</text>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
