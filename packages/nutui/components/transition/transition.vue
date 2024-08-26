<script lang="ts" setup>
import { transitionEmits, transitionProps } from './transition'
import { useTransition } from './use-transition'

const COMPONENT_NAME = 'nut-transition'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(transitionProps)

const emit = defineEmits(transitionEmits)

const { display, classes, styles, clickHandler } = useTransition(props, emit)
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
