<script setup lang="ts">
import { defineComponent } from 'vue'
import NutButton from '../button/button.vue'
import { useTranslate } from '../../locale'
import { signatureEmits, signatureProps } from './signature'
import { componentName, useSignature } from './use-signature'

const props = defineProps(signatureProps)

const emit = defineEmits(signatureEmits)
const {
  classes,
  spcanvas,
  canvasSetId,
  startEventHandler,
  moveEventHandler,
  endEventHandler,
  leaveEventHandler,
  clear,
  confirm,
} = useSignature(props, emit)
</script>

<script lang="ts">
const { translate } = useTranslate(componentName)
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
  <div :class="classes" :style="customStyle">
    <div class="nut-signature-inner spcanvas_WEAPP">
      <canvas
        :id="canvasSetId" ref="spcanvas" class="spcanvas" :canvasId="canvasSetId" :disable-scroll="true"
        @touchstart="startEventHandler" @touchmove="moveEventHandler" @touchend="endEventHandler"
        @touchleave="leaveEventHandler"
      />
    </div>
    <NutButton custom-class="nut-signature-btn" type="default" @click="clear()">
      {{ translate('reSign') }}
    </NutButton>
    <NutButton custom-class="nut-signature-btn" type="primary" @click="confirm()">
      {{ translate('confirm') }}
    </NutButton>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
