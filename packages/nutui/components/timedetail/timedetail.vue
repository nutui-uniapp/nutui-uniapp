<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import { computed, defineComponent, inject, reactive } from 'vue'
import { PREFIX, SELECT_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { timedetailEmits, timedetailProps } from './timedetail'

const props = defineProps(timedetailProps)
const emit = defineEmits(timedetailEmits)
/* eslint-disable eqeqeq */

const currentKey = inject('currentKey')
const currentTime = inject('currentTime')
const _muti = inject('muti')

const state = reactive({
  currentKey,
  currentTime: currentTime as any[],
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

function getClass(item: string) {
  const find = state.currentTime.find((item: any) => item.key == state.currentKey)
  if (find) {
    return {
      'nut-time-detail__detail__list__item': true,
      'nut-time-detail__detail__list__item--curr': find.list.filter((value: string) => value === item).length > 0,
    }
  }
}

const renderData = computed(() => {
  return props?.times?.find(time => time.key == state.currentKey).list
})

function handleTime(time: string) {
  emit(SELECT_EVENT, time)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-time-detail`

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
  <view :class="classes" :style="customStyle">
    <view class="nut-time-detail__detail nut-time-detail__detail--moring">
      <!-- <view class="nut-time-detail__detail__time">上午</view> -->
      <view class="nut-time-detail__detail__list">
        <view v-for="item in renderData" :key="item" :class="getClass(item)" @click="handleTime(item)">
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
