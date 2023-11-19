<script setup lang="ts">
import { computed, defineComponent, provide, ref } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { swipegroupProps } from './swipegroup'

const props = defineProps(swipegroupProps)
const name = ref('')

const classes = computed(() => {
  return getMainClass(props, componentName)
})
function update(n: string) {
  name.value = n
}
provide('swipeGroup', {
  update,
  lock: props.lock,
  name,
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-swipe-group`

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
  <div :class="classes" :style="customStyle">
    <slot />
  </div>
</template>

<style lang="scss">
@import './index';
</style>
