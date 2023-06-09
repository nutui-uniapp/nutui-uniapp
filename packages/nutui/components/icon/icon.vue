<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX, pxCheck } from '../_utils'
import { iconEmits, iconProps } from './icon'

const props = defineProps(iconProps)
const emits = defineEmits(iconEmits)

function handleClick(event: Event) {
  emits('click', event)
}

function isImage() {
  return props.name ? props.name.includes('/') : false
}

const classes = computed(() => {
  return isImage()
    ? `${componentName}__img`
    : `${props.fontClassName} ${componentName} ${props.classPrefix}-${props.name} ${props.popClass} ${props.class}`
})

const getStyle = computed(() => {
  const style = {
    color: props.color,
    fontSize: pxCheck(props.size),
    width: pxCheck(props.size),
    height: pxCheck(props.size),
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
  },
})
</script>

<template>
  <image v-if="isImage()" :class="classes" :style="getStyle" :src="name" @click="handleClick" />
  <text v-if="!isImage()" :class="classes" :style="getStyle" @click="handleClick" />
</template>

<style lang="scss">
@import './index.scss';
</style>
