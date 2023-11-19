<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { ScrollViewOnScrollEvent } from '@uni-helper/uni-app-types'
import { CLICK_EVENT, PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { getMainClass, getMainStyle } from '../_utils'
import { backtopEmits, backtopProps } from './backtop'

const props = defineProps(backtopProps)

const emit = defineEmits(backtopEmits)

const backTop = ref(false)
const scrollTop = ref(1)
const classes = computed(() => {
  return getMainClass(props, componentName, {
    show: backTop.value,
  })
})
const style = computed(() => {
  return getMainStyle(props, {
    right: `${props.right}px`,
    bottom: `${props.bottom}px`,
    zIndex: props.zIndex,
  })
})

function scroll(e: ScrollViewOnScrollEvent) {
  scrollTop.value = 2
  backTop.value = e.detail.scrollTop >= props.distance
}

function click(e: unknown) {
  scrollTop.value = 1
  emit(CLICK_EVENT, e as MouseEvent)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-backtop`

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
  <view>
    <scroll-view
      :scroll-y="true"
      :style="{ height }"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      @scroll="scroll"
    >
      <slot name="content" />
    </scroll-view>
    <view :class="classes" :style="style" @click.stop="click">
      <slot name="icon">
        <NutIcon :custom-color="customColor" name="top" :size="19" custom-class="nut-backtop-main" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
