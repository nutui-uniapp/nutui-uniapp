<script lang="ts" setup>
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import NutOverlay from '../overlay/overlay.vue'
import NutTransition from '../transition/transition.vue'
import { popupEmits, popupProps } from './popup'
import { usePopup } from './use-popup'

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

const innerDuration = computed(() => {
  return Number(props.duration)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-popup`

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
  <NutOverlay
    v-if="props.overlay"
    :overlay-class="props.overlayClass"
    :overlay-style="props.overlayStyle"
    :visible="props.visible"
    :z-index="innerIndex"
    :duration="innerDuration"
    :lock-scroll="props.lockScroll"
    :close-on-click-overlay="props.closeOnClickOverlay"
    :destroy-on-close="props.destroyOnClose"
    @click="onClickOverlay"
  />

  <NutTransition
    :custom-class="classes"
    :custom-style="popStyle"
    :name="transitionName"
    :show="props.visible"
    :duration="innerDuration"
    :destroy-on-close="props.destroyOnClose"
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
