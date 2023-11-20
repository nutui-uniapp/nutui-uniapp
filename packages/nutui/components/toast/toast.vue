<script setup lang="ts">
import { defineComponent } from 'vue'
import NutTransition from '../transition/transition.vue'
import NutIcon from '../icon/icon.vue'
import { PREFIX } from '../_constants'
import { toastEmits, toastProps } from './toast'
import { useToast } from './use-toast'

const props = defineProps(toastProps)
const emit = defineEmits(toastEmits)

const {
  clickCover,
  hasIcon,
  iconName,
  toastBodyClass,
  onAfterLeave,
  isShowToast,
  styles,
  showToast,
  hideToast,
  toastStatus,
} = useToast(props, emit)
defineExpose({ showToast, hideToast })
</script>

<script lang="ts">
const componentName = `${PREFIX}-toast`
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
  <NutTransition :custom-class="toastBodyClass" :custom-style="styles" :show="isShowToast" name="fade" @after-leave="onAfterLeave">
    <view
      v-show="isShowToast"
      :class="toastBodyClass"
      :style="styles"
      @click="clickCover"
    >
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <view
          class="nut-toast-inner"
          :style="{
            'text-align': textAlignCenter ? 'center' : 'left',
            'background-color': toastStatus.bgColor,
          }"
        >
          <view v-if="hasIcon" class="nut-toast-icon-wrapper">
            <NutIcon :size="toastStatus.iconSize" :name="iconName" custom-color="#ffffff" />
          </view>
          <div v-if="toastStatus.title" class="nut-toast-title">
            {{ toastStatus.title }}
          </div>
          <rich-text class="nut-toast-text" :nodes="toastStatus.msg" />
        </view>
      </template>
    </view>
  </NutTransition>
</template>

<style lang="scss">
@import './index';
</style>
