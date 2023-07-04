<script setup lang="ts">
import { defineComponent } from 'vue'
import { PREFIX } from '../_utils'
import NutPopUp from '../popup/popup.vue'
import { notifyEmits, notifyProps } from './notify'
import { useNotify } from './use-notify'

const props = defineProps(notifyProps)
const emit = defineEmits(notifyEmits)
const { isShowPopup, clickCover, notifyStatus, showNotify, hideNotify } = useNotify(props, emit)

defineExpose({ showNotify, hideNotify })
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
  <NutPopUp v-model:visible="isShowPopup" z-index="5000" :position="notifyStatus.position || props.position" :overlay="false">
    <div
      class="nut-notify" :class="[`nut-notify--${notifyStatus.type || props.type}`, className]"
      :style="{ color: notifyStatus.customColor || props.customColor, background: notifyStatus.background || props.background }"
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
