<script setup lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { PREFIX } from '../_constants'
import { swipegroupProps } from './swipegroup'

const props = defineProps(swipegroupProps)
const name = ref('')
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
  <div class="nut-swipe-group">
    <slot />
  </div>
</template>

<style lang="scss">
@import './index';
</style>
