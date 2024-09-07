<script lang="ts" setup>
import type { ComputedRef, CSSProperties } from 'vue'
import { computed } from 'vue'
import { useInject } from '../_hooks'
import { getMainClass, getMainStyle } from '../_utils'
import { TAB_KEY } from '../tabs'
import { tabpaneProps } from './tabpane'

const COMPONENT_NAME = 'nut-tab-pane'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tabpaneProps)

const { parent } = useInject<{
  activeKey: ComputedRef<string>
  autoHeight: ComputedRef<boolean>
  animatedTime: ComputedRef<string | number>
}>(TAB_KEY)

const classes = computed(() => {
  const value: Record<string, boolean> = {}

  if (parent != null) {
    value.inactive = String(props.paneKey) !== parent.activeKey.value && parent.autoHeight.value
  }

  return getMainClass(props, COMPONENT_NAME, value)
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (parent != null) {
    if (parent.animatedTime.value === 0 && props.paneKey !== parent.activeKey.value) {
      value.display = 'none'
    }
  }

  return getMainStyle(props, value)
})
</script>

<template>
  <view :class="classes" :style="styles">
    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
