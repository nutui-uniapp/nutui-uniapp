<script setup lang="ts">
import { defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { transitionEmits, transitionProps } from './transition'
import { useTransition } from './use-transition'

const props = defineProps(transitionProps)
const emits = defineEmits(transitionEmits)
const { display, classes, clickHandler, styles } = useTransition(props, emits)
</script>

<script lang="ts">
const componentName = `${PREFIX}-transition`
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
  <div
    v-if="display" :class="classes"
    :style="styles"
    @click="clickHandler"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@import './index';
</style>
