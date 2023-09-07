<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import { computed, defineComponent, inject, reactive } from 'vue'
import { PREFIX } from '../_constants'
import { timepannelEmits, timepannelProps } from './timepannel'

const props = defineProps(timepannelProps)
const emit = defineEmits(timepannelEmits)
const currentKey = inject('currentKey')
/* eslint-disable eqeqeq */

const state = reactive({
  currentKey,
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    'nut-time-pannel--curr': state.currentKey == props.pannelKey,
  }
})

function handlePannel(pannelKey: number | string) {
  emit('change', pannelKey)
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
  <view :class="classes" @click="handlePannel(pannelKey)">
    {{ name }}
  </view>
</template>

<style lang="scss">
@import './index';
</style>
