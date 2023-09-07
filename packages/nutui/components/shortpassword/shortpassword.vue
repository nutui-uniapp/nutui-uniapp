<script setup lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import NutPopUp from '../popup/popup.vue'
import { useTranslate } from '../../locale'
import { shortpasswordEmits, shortpasswordProps } from './shortpassword'

const props = defineProps(shortpasswordProps)
const emit = defineEmits(shortpasswordEmits)
// const instance = getCurrentInstance() as any
// const eventChannel = instance?.ctx.getOpenerEventChannel()
const realInput = ref(props.modelValue)
const comLen = computed(() => range(Number(props.length)))
const show = ref(props.visible)
function focus(event: any) {
  event.stopPropagation()
  emit('focus')
}
watch(
  () => props.visible,
  (value) => {
    show.value = value
  },
)
watch(
  () => props.modelValue,
  (value) => {
    realInput.value = value

    if (String(value).length === comLen.value)
      emit('complete', value)
  },
)
function close() {
  emit('update:visible', false)
  emit('close')
}
function range(val: number) {
  return Math.min(Math.max(4, val), 6)
}
function onTips() {
  emit('tips')
}
// onMounted(() => {
//   eventChannel.once((getCurrentInstance() as any).router.onReady, () => {})
// })
</script>

<script lang="ts">
const componentName = `${PREFIX}-short-password`
const { translate } = useTranslate(componentName)
export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  }
  ,
})
</script>

<template>
  <view class="nut-short-password">
    <NutPopUp
      v-model:visible="show"
      :custom-style="{
        padding: '30px 24px 20px 24px',
        borderRadius: '12px',
        textAlign: 'center',
        top: '45%',
      }"
      :closeable="true"
      :close-on-click-overlay="closeOnClickOverlay"
      @click-close-icon="close"
      @click-overlay="close"
    >
      <view class="nut-short-password-title">
        {{ title || translate('title') }}
      </view>
      <view class="nut-short-password-subtitle">
        {{ desc || translate('desc') }}
      </view>
      <view class="nut-short-password-wrapper">
        <view class="nut-short-password__list" @touchstart="focus">
          <view v-for="(sublen, index) in new Array(comLen)" :key="index" class="nut-short-password__item">
            <view v-if="String(realInput).length > index" class="nut-short-password__item-icon" />
          </view>
        </view>
      </view>
      <view class="nut-short-password__message">
        <view class="nut-short-password--error">
          {{ errorMsg }}
        </view>
        <view v-if="tips || translate('tips')" class="nut-short-password--forget" @click="onTips">
          <NutIcon name="tips" custom-class="icon" size="11px" />
          <view>{{ tips || translate('tips') }}</view>
        </view>
      </view>
    </NutPopUp>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
