<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { PREFIX } from '../_constants'
import { giftboxEmits } from './giftbox'

const emit = defineEmits(giftboxEmits)
defineExpose({ init })
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    'gift-box': true,
  }
})

function gift(e?: any) {
  let transitionFlag = true
  if (e?.target === e?.currentTarget && transitionFlag) {
    transitionFlag = false
    emit('endTurns')
  }
}

const openActive = ref(false)

function handleClick() {
  if (openActive.value)
    return false

  emit('startTurns')
  openActive.value = true
  gift()
}

function init() {
  openActive.value = false
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-giftbox`

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
  <view class="giftbox-wraper">
    <view :class="classes" @click="handleClick">
      <view id="giftAnimate" class="gBox gift-box-1" :class="{ 'gift-box-1-open': openActive }" @transitionEnd="gift" @webkitTransitionEnd="gift" />
      <view class="gBox gift-box-2" />
      <view class="gBox gift-box-3" :class="{ 'gift-box-3-open': openActive }" />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
