<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import { iconEmits, iconProps } from './icon'

const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)

function handleClick(event: Event) {
  emits('click', event)
}

const isImage = computed(() => {
  return props.name ? props.name.includes('/') : false
})

const classes = computed(() => {
  return isImage.value
    ? `${componentName}__img`
    : `${props.fontClassName} ${componentName} ${props.classPrefix}-${props.name}  ${props.customClass} ${props.popClass}`
})

const getStyle = computed(() => {
  const style = {
    color: props.customColor,
    fontSize: pxCheck(props.size),
    width: pxCheck(props.width),
    height: pxCheck(props.height),
  }
  return style
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
  <image v-if="isImage" :class="classes" :style="getStyle" :src="name" @click="(handleClick as any)" />
  <text v-else :class="classes" :style="[getStyle, customStyle]" @click="(handleClick as any)" />
</template>

<style lang="scss">
@import './index';
</style>
