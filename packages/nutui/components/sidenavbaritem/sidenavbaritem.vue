<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_utils'
import { sidenavbaritemEmits, sidenavbaritemProps } from './sidenavbaritem'

const props = defineProps(sidenavbaritemProps)
const emit = defineEmits(sidenavbaritemEmits)
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

function handleClick() {
  emit('click')
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-side-navbar-item`

export default defineComponent({
  name: componentName,
})
</script>

<template>
  <view :class="classes" :ikey="ikey" @click.stop="handleClick">
    <span class="nut-side-navbar-item__title">
      {{ title }}
    </span>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
