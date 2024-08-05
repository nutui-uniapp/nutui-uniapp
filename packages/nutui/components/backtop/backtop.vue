<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { ScrollViewOnScrollEvent } from '@uni-helper/uni-app-types'
import { CLICK_EVENT } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { getMainClass, getMainStyle } from '../_utils'
import { backtopEmits, backtopProps } from './backtop'

const COMPONENT_NAME = 'nut-backtop'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(backtopProps)

const emit = defineEmits(backtopEmits)

const scrollTop = ref(1)
const backTop = ref(false)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    show: backTop.value,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    right: `${props.right}px`,
    bottom: `${props.bottom}px`,
    zIndex: props.zIndex,
  })
})

function handleScroll(e: ScrollViewOnScrollEvent) {
  scrollTop.value = 2
  backTop.value = e.detail.scrollTop >= props.distance
}

function handleClick(e: any) {
  scrollTop.value = 1

  emit(CLICK_EVENT, e as MouseEvent)
}
</script>

<template>
  <view>
    <scroll-view
      :style="{ height: props.height }"
      :scroll-y="true"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      @scroll="handleScroll"
    >
      <slot name="content" />
    </scroll-view>

    <view :class="classes" :style="styles" @click.stop="handleClick">
      <slot name="icon">
        <NutIcon
          custom-class="nut-backtop-main"
          name="top"
          :size="19"
          :custom-color="props.customColor"
        />
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
