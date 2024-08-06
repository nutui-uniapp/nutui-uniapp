<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { CLICK_EVENT } from '../_constants'
import { useInject } from '../_hooks'
import type { SideNavbarProps } from '../sidenavbar'
import { SIDE_NAVBAR_KEY } from '../sidenavbar'
import { getMainClass, getMainStyle } from '../_utils'
import { sidenavbaritemEmits, sidenavbaritemProps } from './sidenavbaritem'

const COMPONENT_NAME = 'nut-side-navbar-item'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(sidenavbaritemProps)

const emit = defineEmits(sidenavbaritemEmits)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const { parent } = useInject<{ props: Required<SideNavbarProps> }>(SIDE_NAVBAR_KEY)

const styles = computed(() => {
  const value: CSSProperties = {}

  if (parent != null) {
    value.paddingLeft = `${Number(parent.props.offset) * 2}px`
  }

  return getMainStyle(props, value)
})

function handleClick() {
  emit(CLICK_EVENT)
}
</script>

<template>
  <view
    :class="classes"
    :style="styles"
    :ikey="props.ikey"
    @click.stop="handleClick"
  >
    <text class="nut-side-navbar-item__title">
      {{ props.title }}
    </text>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
