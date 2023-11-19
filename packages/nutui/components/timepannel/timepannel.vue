<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import { computed, defineComponent, inject, reactive } from 'vue'
import { CHANGE_EVENT, PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { timepannelEmits, timepannelProps } from './timepannel'

const props = defineProps(timepannelProps)
const emit = defineEmits(timepannelEmits)
const currentKey = inject('currentKey')
/* eslint-disable eqeqeq */

const state = reactive({
  currentKey,
})

const classes = computed(() => {
  return getMainClass(props, componentName, {
    'nut-time-pannel--curr': state.currentKey == props.pannelKey,
  })
})

function handlePannel(pannelKey: number | string) {
  emit(CHANGE_EVENT, pannelKey)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-time-pannel`

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
  <view :class="classes" :style="customStyle" @click="handlePannel(pannelKey)">
    {{ name }}
  </view>
</template>

<style lang="scss">
@import './index';
</style>
