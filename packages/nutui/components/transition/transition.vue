<script lang="ts" setup>
import { defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { transitionEmits, transitionProps } from './transition'
import { useTransition } from './use-transition'

const props = defineProps(transitionProps)

const emit = defineEmits(transitionEmits)

const { display, classes, styles, clickHandler } = useTransition(props, emit)
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
  <view
    v-if="!props.destroyOnClose || display"
    :class="classes"
    :style="styles"
    @click="clickHandler"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
