<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutPopUp from '../popup/popup.vue'
import { getMainClass, getMainStyle } from '../_utils'
import { notifyEmits, notifyProps } from './notify'
import { useNotify } from './use-notify'

const props = defineProps(notifyProps)

const emit = defineEmits(notifyEmits)

const safeHeight = props.safeHeight ? props.safeHeight : uni.getSystemInfoSync().statusBarHeight

const { isShowPopup, clickCover, notifyStatus, showNotify, hideNotify } = useNotify(props, emit)

defineExpose({ showNotify, hideNotify })

const styles = computed(() => {
  return getMainStyle(props, {
    color: notifyStatus.value.customColor || props.customColor,
    background: notifyStatus.value.background || props.background,
  })
})
const classes = computed(() => {
  return getMainClass(props, componentName, {
    [props.className]: true,
    [`nut-notify--${notifyStatus.value.type || props.type}`]: true,
  })
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-notify`
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
  <NutPopUp v-model:visible="isShowPopup" :custom-style="notifyStatus.safeAreaInsetTop ? `top:${safeHeight}px` : ''" safe-area-inset-bottom safe-area-inset-top :z-index="99999999" :position="notifyStatus.position" :overlay="false">
    <div
      :class="classes"
      :style="styles"
      @click="clickCover"
    >
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        {{ notifyStatus.msg }}
      </template>
    </div>
  </NutPopUp>
</template>

<style lang="scss">
@import './index';
</style>
