<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { iconEmits, iconProps } from './icon'

const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)

function handleClick(event: unknown) {
  emits(CLICK_EVENT, event as Event)
}

const isImage = computed(() => {
  return props.name ? props.name.includes('/') : false
})

const classes = computed(() => {
  const obj: Record<string, boolean> = {}
  if (isImage.value) {
    obj[`${componentName}__img`] = true
  }
  else {
    obj[props.fontClassName] = true
    obj[`${props.classPrefix}-${props.name}`] = true
    obj[props.popClass] = true
  }
  return getMainClass(props, componentName, obj)
})

const getStyle = computed(() => {
  const style = {
    color: props.customColor,
    fontSize: pxCheck(props.size),
    width: pxCheck(props.width),
    height: pxCheck(props.height),
  }
  return getMainStyle(props, style)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-icon`

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
  <image v-if="isImage" :class="classes" :style="getStyle" :src="name" @click="handleClick" />
  <text v-else :class="classes" :style="getStyle" @click="handleClick" />
</template>

<style lang="scss">
@import './index';
</style>
