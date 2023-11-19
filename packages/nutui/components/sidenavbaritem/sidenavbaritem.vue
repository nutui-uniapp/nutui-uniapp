<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import { SIDEN_NAVBAR_KEY, type SidenavbarProps } from '../sidenavbar'
import { getMainClass, getMainStyle } from '../_utils'
import { sidenavbaritemEmits, sidenavbaritemProps } from './sidenavbaritem'

const props = defineProps(sidenavbaritemProps)

const emit = defineEmits(sidenavbaritemEmits)

const classes = computed(() => {
  return getMainClass(props, componentName)
})
const Parent = useInject<{ props: Required<SidenavbarProps> }>(SIDEN_NAVBAR_KEY)

const styles = computed(() => {
  return getMainStyle(props, {
    paddingLeft: `${Number(Parent.parent?.props?.offset) * 2}px`,
  })
})

function handleClick() {
  emit(CLICK_EVENT)
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
  <view :class="classes" :style="styles" :ikey="ikey" @click.stop="handleClick">
    <text class="nut-side-navbar-item__title">
      {{ title }}
    </text>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
