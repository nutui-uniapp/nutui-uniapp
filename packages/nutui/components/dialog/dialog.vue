<script lang="ts" setup>
import NutPopup from '../popup/popup.vue'
import NutButton from '../button/button.vue'
import { useTranslate } from '../../locale'
import { dialogEmits, dialogProps } from './dialog'
import { useDialog } from './use-dialog'

const COMPONENT_NAME = 'nut-dialog'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  inheritAttrs: false,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(dialogProps)

const emit = defineEmits(dialogEmits)

const { translate } = useTranslate(COMPONENT_NAME)

const {
  contentStyle,
  showPopup,
  onClickOverlay,
  onCancel,
  onOk,
  classes,
  closed,
  dialogStatus,
  showDialog,
} = useDialog(props, emit)

defineExpose({
  showDialog,
  onOk,
  onCancel,
})
</script>

<template>
  <NutPopup
    v-model:visible="showPopup"
    :close-on-click-overlay="false"
    :lock-scroll="props.lockScroll"
    :pop-class="props.popClass"
    :overlay-class="props.overlayClass"
    :overlay-style="props.overlayStyle"
    :custom-style="props.popStyle"
    :z-index="props.zIndex"
    round
    :transition="props.transition"
    @click-overlay="onClickOverlay"
    @click-close-icon="closed"
  >
    <view :class="classes" :style="props.customStyle">
      <view v-if="$slots.header || dialogStatus.title" class="nut-dialog__header">
        <slot v-if="$slots.header" name="header" />

        <template v-else>
          {{ dialogStatus.title || props.title }}
        </template>
      </view>

      <view class="nut-dialog__content" :style="contentStyle">
        <slot v-if="$slots.default" name="default" />
        <rich-text v-else-if="typeof content === 'string'" :nodes="dialogStatus.content || props.content" />
      </view>

      <view
        v-if="!dialogStatus.noFooter"
        class="nut-dialog__footer"
        :class="{ [props.footerDirection]: dialogStatus.footerDirection }"
      >
        <slot v-if="$slots.footer" name="footer" />

        <template v-else>
          <NutButton
            v-if="!dialogStatus.noCancelBtn"
            size="small"
            plain
            type="primary"
            custom-class="nut-dialog__footer-cancel"
            @click="onCancel"
          >
            {{ dialogStatus.cancelText || props.cancelText || translate('cancel') }}
          </NutButton>

          <NutButton
            v-if="!dialogStatus.noOkBtn"
            custom-class="nut-dialog__footer-ok"
            size="small"
            type="primary"
            @click="onOk"
          >
            {{ dialogStatus.okText || props.okText || translate('confirm') }}
          </NutButton>
        </template>
      </view>
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import "./index";
</style>
