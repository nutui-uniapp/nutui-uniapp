<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import { computed, defineComponent, provide } from 'vue'
import { PREFIX, SELECT_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import NutPopup from '../popup/popup.vue'
import { useTranslate } from '../../locale'
import { getMainClass } from '../_utils'
import { timeselectEmits, timeselectProps } from './timeselect'

const props = defineProps(timeselectProps)
const emit = defineEmits(timeselectEmits)
const classes = computed(() => {
  return getMainClass(props, componentName)
})

const popStyle = computed(() => {
  return {
    width: '100%',
    height: props.height,
  }
})

const currentKey = computed(() => props.currentKey)

const currentTime = computed(() => props.currentTime)

const muti = computed(() => props.muti)

function close() {
  emit(UPDATE_VISIBLE_EVENT, false)
  emit(SELECT_EVENT, currentTime.value)
}

provide('currentKey', currentKey)
provide('currentTime', currentTime)
provide('muti', muti)
</script>

<script lang="ts">
const componentName = `${PREFIX}-time-select`
const { translate } = useTranslate(componentName)

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
  <NutPopup
    position="bottom" closeable round :visible="visible" :custom-style="popStyle" :lock-scroll="lockScroll"
    @click-overlay="close" @click-close-icon="close"
  >
    <view :class="classes" :style="customStyle">
      <view class="nut-time-select__title">
        <view class="nut-time-select__title__fixed">
          <span v-if="!$slots.title">{{ title || translate('pickupTime') }}</span>
          <slot v-else name="title" />
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
@import './index';
</style>
