<script setup lang="ts">
import { type CSSProperties, type ComputedRef, computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import { TAB_KEY } from '../tabs'
import { getMainClass, getMainStyle } from '../_utils'
import { tabpaneEmits, tabpaneProps } from './tabpane'

const props = defineProps(tabpaneProps)
defineEmits(tabpaneEmits)
const { parent } = useInject<{ activeKey: ComputedRef<string>; autoHeight: ComputedRef<boolean>; animatedTime: ComputedRef<string | number> }>(TAB_KEY)

const paneStyle = computed(() => {
  const style: CSSProperties = {
    display:
      parent?.animatedTime.value === 0 && props.paneKey !== parent.activeKey.value ? 'none' : undefined,
  }
  return getMainStyle(props, style)
})
const classes = computed(() => {
  return getMainClass(props, componentName, {
    inactive: String(props.paneKey) !== parent?.activeKey.value && parent?.autoHeight.value,
  })
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-tab-pane`
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
  <view :style="paneStyle" :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
