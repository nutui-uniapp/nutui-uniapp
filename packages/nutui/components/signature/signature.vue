<script lang="ts" setup>
import NutButton from '../button/button.vue'
import { useTranslate } from '../../locale'
import { signatureEmits, signatureProps } from './signature'
import { useSignature } from './use-signature'

const COMPONENT_NAME = 'nut-signature'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(signatureProps)

const emit = defineEmits(signatureEmits)

const { translate } = useTranslate(COMPONENT_NAME)

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

<template>
  <div :class="classes" :style="props.customStyle">
    <div class="nut-signature-inner spcanvas_WEAPP">
      <canvas
        :id="canvasSetId"
        ref="spcanvas"
        class="spcanvas"
        :canvasId="canvasSetId"
        :disable-scroll="true"
        @touchstart="startEventHandler"
        @touchmove="moveEventHandler"
        @touchend="endEventHandler"
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
@import "./index";
</style>
