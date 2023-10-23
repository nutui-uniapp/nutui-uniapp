<script setup lang="ts">
import { defineComponent } from 'vue'
import NutTransition from '../transition/transition.vue'
import NutOverlay from '../overlay/overlay.vue'
import NutIcon from '../icon/icon.vue'
import { PREFIX } from '../_constants'
import { popupEmits, popupProps } from './popup'
import { usePopup } from './use-popup'

const props = defineProps(popupProps)
const emit = defineEmits(popupEmits)
function toMoveHandle() {

}
const { onClickOverlay, showSlot, onClickCloseIcon, closed, transitionName, onOpened, onClosed, classes, popStyle, onClick } = usePopup(props, emit)
</script>

<script lang="ts">
const componentName = `${PREFIX}-popup`
export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
</script>

<template>
  <NutOverlay
    v-if="overlay"
    :visible="visible"
    :close-on-click-overlay="closeOnClickOverlay"
    :z-index="zIndex"
    :lock-scroll="lockScroll"
    :duration="duration"
    :overlay-class="overlayClass"
    :overlay-style="overlayStyle"
    v-bind="$attrs"
    @click="onClickOverlay"
  />
  <NutTransition
    :name="transitionName"
    :custom-class="[classes, customClass]"
    :show="visible"
    :custom-style="[popStyle, customStyle]"
    :duration="Number(duration)"
    @after-enter="onOpened"
    @after-leave="onClosed"
    @click="onClick"
    @touchmove.stop.prevent="props.lockScroll ? toMoveHandle : ''"
  >
    <slot v-if="showSlot" />
    <view
      v-if="closed"
      class="nut-popup__close-icon"
      :class="`nut-popup__close-icon--${closeIconPosition}`"
      @click="(onClickCloseIcon as any)"
    >
      <slot name="closeIcon">
        <NutIcon name="close" height="12px" />
      </slot>
    </view>
  </NutTransition>
</template>

<style lang="scss">
@import './index';
</style>
