<script setup lang="ts">
import { type CSSProperties, type ComputedRef, computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import { TAB_KEY } from '../tabs'
import { tabpaneEmits, tabpaneProps } from './tabpane'

const props = defineProps(tabpaneProps)
const emit = defineEmits(tabpaneEmits)
const { parent } = useInject<{ activeKey: ComputedRef<string>; autoHeight: ComputedRef<boolean>; animatedTime: ComputedRef<string | number> }>(TAB_KEY)

const paneStyle = computed(() => {
  return {
    display:
          parent?.animatedTime.value === 0 && props.paneKey !== parent.activeKey.value ? 'none' : undefined,
  } as CSSProperties
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
  <view class="nut-tab-pane" :style="[paneStyle, customStyle]" :class="[{ inactive: String(paneKey) !== parent?.activeKey.value && parent?.autoHeight.value }, customClass]">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
