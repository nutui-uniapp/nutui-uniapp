<script lang="ts" setup>
import { computed } from 'vue'
import NutPopup from '../popup/popup.vue'
import { getMainClass, getMainStyle } from '../_utils'
import { notifyEmits, notifyProps } from './notify'
import { useNotify } from './use-notify'

const COMPONENT_NAME = 'nut-notify'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(notifyProps)

const emit = defineEmits(notifyEmits)

const safeHeight = props.safeHeight ? props.safeHeight : uni.getSystemInfoSync().statusBarHeight

const { isShowPopup, clickCover, notifyStatus, showNotify, hideNotify } = useNotify(props, emit)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [props.className]: true,
    [`nut-notify--${notifyStatus.value.type || props.type}`]: true,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    color: notifyStatus.value.customColor || props.customColor,
    background: notifyStatus.value.background || props.background,
  })
})

defineExpose({
  showNotify,
  hideNotify,
})
</script>

<template>
  <NutPopup
    v-model:visible="isShowPopup"
    :custom-style="notifyStatus.safeAreaInsetTop ? `top:${safeHeight}px` : ''"
    :position="notifyStatus.position"
    :z-index="99999999"
    :overlay="false"
    safe-area-inset-top
    safe-area-inset-bottom
  >
    <view
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
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import "./index";
</style>
