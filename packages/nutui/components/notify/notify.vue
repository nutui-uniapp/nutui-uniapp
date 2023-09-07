<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutPopUp from '../popup/popup.vue'
import { notifyEmits, notifyProps } from './notify'
import { useNotify } from './use-notify'

const props = defineProps(notifyProps)

const emit = defineEmits(notifyEmits)

const safeHeight = props.safeHeight ? props.safeHeight : uni.getSystemInfoSync().statusBarHeight

const { isShowPopup, clickCover, notifyStatus, showNotify, hideNotify } = useNotify(props, emit)

defineExpose({ showNotify, hideNotify })

const styles = computed(() => {
  return {
    color: notifyStatus.value.customColor || props.customColor,
    background: notifyStatus.value.background || props.background,
  }
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
  <NutPopUp v-model:visible="isShowPopup" :custom-style="notifyStatus.safeAreaInsetTop ? `top:${safeHeight}px` : ''" safe-area-inset-bottom safe-area-inset-top :z-index="99999999" :position="notifyStatus.position || props.position" :overlay="false">
    <div
      class="nut-notify" :class="[`nut-notify--${notifyStatus.type || props.type}`, className]"
      :style="styles"
      @click="clickCover"
    >
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        {{ notifyStatus.msg || props.msg }}
      </template>
    </div>
  </NutPopUp>
</template>

<style lang="scss">
@import './index';
</style>
