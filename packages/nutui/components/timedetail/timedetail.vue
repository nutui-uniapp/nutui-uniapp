<script lang="ts" setup>
import { computed, inject, reactive } from 'vue'
import { SELECT_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { timedetailEmits, timedetailProps } from './timedetail'

const COMPONENT_NAME = 'nut-time-detail'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(timedetailProps)

const emit = defineEmits(timedetailEmits)

const currentKey = inject('currentKey')
const currentTime = inject('currentTime')

const state = reactive({
  currentKey,
  currentTime: currentTime as any[],
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

/* eslint-disable eqeqeq */
function getItemClasses(item: string) {
  const target = state.currentTime?.find(item => item.key == state.currentKey)

  if (target == null) {
    return {}
  }

  return {
    'nut-time-detail__detail__list__item': true,
    'nut-time-detail__detail__list__item--curr': target.list.filter((value: string) => value === item).length > 0,
  }
}

const renderData = computed(() => {
  return props.times.find(item => item.key == state.currentKey)?.list || []
})
/* eslint-enable eqeqeq */

function handleItemClick(time: string) {
  emit(SELECT_EVENT, time)
}
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view class="nut-time-detail__detail">
      <view class="nut-time-detail__detail__list">
        <view
          v-for="item in renderData"
          :key="item"
          :class="getItemClasses(item)"
          @click="handleItemClick(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
