<script setup lang="ts">
import { type CSSProperties, computed, defineComponent, reactive } from 'vue'
import { PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import { SIDEN_NAVBAR_KEY, type SidenavbarProps } from '../sidenavbar'
import { sidenavbaritemEmits, sidenavbaritemProps } from './sidenavbaritem'

const props = defineProps(sidenavbaritemProps)

const emit = defineEmits(sidenavbaritemEmits)

const state = reactive({
  count: 1,
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})
const Parent = useInject<{ props: Required<SidenavbarProps> }>(SIDEN_NAVBAR_KEY)

const style = computed(() => {
  return {
    paddingLeft: `${Number(Parent.parent?.props?.offset) * 2}px`,
  } as CSSProperties
})

function handleClick() {
  emit('click')
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-side-navbar-item`

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
  <view :class="classes" :style="[style]" :ikey="ikey" @click.stop="handleClick">
    <text class="nut-side-navbar-item__title">
      {{ title }}
    </text>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
