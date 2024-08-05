<script lang="ts" setup>
import { computed, ref } from 'vue'
import { giftboxEmits } from './giftbox'

const COMPONENT_NAME = 'nut-giftbox'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const emit = defineEmits(giftboxEmits)

const classes = computed(() => {
  return {
    [COMPONENT_NAME]: true,
    'gift-box': true,
  }
})

function gift(e?: any) {
  if (e?.target === e?.currentTarget)
    emit('endTurns')
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

defineExpose({
  init,
})
</script>

<template>
  <view class="giftbox-wraper">
    <view :class="classes" @click="handleClick">
      <view
        id="giftAnimate"
        class="gBox gift-box-1"
        :class="{ 'gift-box-1-open': openActive }"
        @transition-end="gift"
        @webkit-transition-end="gift"
      />

      <view class="gBox gift-box-2" />

      <view class="gBox gift-box-3" :class="{ 'gift-box-3-open': openActive }" />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
