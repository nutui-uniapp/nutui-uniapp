<script lang="ts" setup>
import { computed } from 'vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { CLICK_EVENT } from '../_constants'
import { iconEmits, iconProps } from './icon'

const COMPONENT_NAME = 'nut-icon'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(iconProps)

const emit = defineEmits(iconEmits)

function handleClick(event: any) {
  emit(CLICK_EVENT, event)
}

const isImage = computed(() => {
  return props.name ? props.name.includes('/') : false
})

const classes = computed(() => {
  const obj: Record<string, boolean> = {}
  if (isImage.value) {
    obj[`${COMPONENT_NAME}__img`] = true
  }
  else {
    obj[props.fontClassName] = true
    obj[`${props.classPrefix}-${props.name}`] = true
    obj[props.popClass] = true
  }
  return getMainClass(props, COMPONENT_NAME, obj)
})

const styles = computed(() => {
  return getMainStyle(props, {
    color: props.customColor,
    fontSize: pxCheck(props.size),
    width: pxCheck(props.width),
    height: pxCheck(props.height),
  })
})
</script>

<template>
  <image
    v-if="isImage"
    :class="classes"
    :style="styles"
    :src="props.name"
    @click="handleClick"
  />
  <text
    v-else
    :class="classes"
    :style="styles"
    @click="handleClick"
  />
</template>

<style lang="scss">
@import "./index";
</style>
