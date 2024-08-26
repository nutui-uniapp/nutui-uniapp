<script lang="ts" setup>
import { computed, inject, reactive } from 'vue'
import { CHANGE_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { timepannelEmits, timepannelProps } from './timepannel'

const COMPONENT_NAME = 'nut-time-pannel'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(timepannelProps)

const emit = defineEmits(timepannelEmits)

const currentKey = inject('currentKey')

const state = reactive({
  currentKey,
})

/* eslint-disable eqeqeq */
const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    'nut-time-pannel--curr': props.pannelKey == state.currentKey,
  })
})
/* eslint-enable eqeqeq */

function handlePannelClick() {
  emit(CHANGE_EVENT, props.pannelKey)
}
</script>

<template>
  <view :class="classes" :style="props.customStyle" @click="handlePannelClick()">
    {{ props.name }}
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
