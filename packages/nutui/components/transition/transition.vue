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
  <block v-if="!props.destroyOnClose">
    <view
      v-if="display"
      :class="classes"
      :style="styles"
      @click="clickHandler"
    >
      <slot />
    </view>
  </block>
  <block v-else>
    <view
      v-show="display"
      :class="classes"
      :style="styles"
      @click="clickHandler"
    >
      <slot />
    </view>
  </block>
</template>

<style lang="scss">
@import './index';
</style>
