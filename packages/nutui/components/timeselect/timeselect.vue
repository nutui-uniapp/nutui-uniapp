<script lang="ts" setup>
import { computed, provide, useSlots } from 'vue'
import NutPopup from '../popup/popup.vue'
import { useTranslate } from '../../locale'
import { SELECT_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { timeselectEmits, timeselectProps } from './timeselect'

const COMPONENT_NAME = 'nut-time-select'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(timeselectProps)

const emit = defineEmits(timeselectEmits)

const slots = useSlots()

const { translate } = useTranslate(COMPONENT_NAME)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const popupStyles = computed(() => {
  return {
    width: '100%',
    height: props.height,
  }
})

const currentKey = computed(() => props.currentKey)
const currentTime = computed(() => props.currentTime)

provide('currentKey', currentKey)
provide('currentTime', currentTime)

function handleClose() {
  emit(UPDATE_VISIBLE_EVENT, false)

  emit(SELECT_EVENT, currentTime.value)
}
</script>

<template>
  <NutPopup
    :custom-style="popupStyles"
    :visible="props.visible"
    position="bottom"
    closeable
    round
    :lock-scroll="props.lockScroll"
    @click-overlay="handleClose"
    @click-close-icon="handleClose"
  >
    <view :class="classes" :style="props.customStyle">
      <view class="nut-time-select__title">
        <view class="nut-time-select__title__fixed">
          <slot v-if="slots.title" name="title" />

          <text v-else>{{ props.title || translate('pickupTime') }}</text>
        </view>
      </view>

      <view class="nut-time-select__content">
        <view class="nut-time-select__content__pannel">
          <slot name="pannel" />
        </view>

        <view class="nut-time-select__content__detail">
          <slot name="detail" />
        </view>
      </view>
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import "./index";
</style>
