<script lang="ts" setup>
import NutIcon from '../icon/icon.vue'
import NutOverlay from '../overlay/overlay.vue'
import NutTransition from '../transition/transition.vue'
import { popupEmits, popupProps } from './popup'
import { usePopup } from './use-popup'

const COMPONENT_NAME = 'nut-popup'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})

const props = defineProps(popupProps)

const emit = defineEmits(popupEmits)

const {
  classes,
  popStyle,
  innerIndex,
  showSlot,
  transitionName,
  onClick,
  onClickCloseIcon,
  onClickOverlay,
  onOpened,
  onClosed,
} = usePopup(props, emit)
</script>

<template>
  <NutOverlay
    v-if="props.overlay"
    v-bind="$attrs"
    :visible="props.visible"
    :close-on-click-overlay="props.closeOnClickOverlay"
    :z-index="innerIndex"
    :lock-scroll="props.lockScroll"
    :duration="props.duration"
    :overlay-class="props.overlayClass"
    :overlay-style="props.overlayStyle"
    :destroy-on-close="props.destroyOnClose"
    @click="onClickOverlay"
  />

  <NutTransition
    :name="transitionName"
    :custom-class="classes"
    :show="props.visible"
    :destroy-on-close="props.destroyOnClose"
    :custom-style="popStyle"
    :duration="Number(props.duration)"
    @after-enter="onOpened"
    @after-leave="onClosed"
    @click="onClick"
  >
    <slot v-if="showSlot" />

    <view
      v-if="props.closeable"
      class="nut-popup__close-icon"
      :class="`nut-popup__close-icon--${props.closeIconPosition}`"
      @click="onClickCloseIcon"
    >
      <slot name="closeIcon">
        <NutIcon name="close" height="12px" />
      </slot>
    </view>
  </NutTransition>
</template>

<style lang="scss">
@import "./index";
</style>
