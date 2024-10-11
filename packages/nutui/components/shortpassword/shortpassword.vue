<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { CLOSE_EVENT, FOCUS_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { useTranslate } from '../../locale'
import NutIcon from '../icon/icon.vue'
import NutPopup from '../popup/popup.vue'
import { shortpasswordEmits, shortpasswordProps } from './shortpassword'

const props = defineProps(shortpasswordProps)

const emit = defineEmits(shortpasswordEmits)

const innerVisible = ref(props.visible)
const inputValue = ref(props.modelValue)

const innerValue = computed(() => String(inputValue.value))

const finalLength = computed(() => {
  const numberLength = Number(props.length)

  return Math.min(Math.max(4, numberLength), 6)
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const popupStyles: CSSProperties = {
  top: '45%',
  padding: '30px 24px 20px 24px',
  textAlign: 'center',
  borderRadius: '12px',
}

watch(() => props.visible, (value) => {
  innerVisible.value = value
})

watch(() => props.modelValue, (value) => {
  inputValue.value = value

  if (String(value).length >= finalLength.value)
    emit('complete', value!)
})

function focus() {
  emit(FOCUS_EVENT)
}

function close() {
  emit(UPDATE_VISIBLE_EVENT, false)
  emit(CLOSE_EVENT)
}

function onTipsClick() {
  emit('tips')
}
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
  },
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <NutPopup
      v-model:visible="innerVisible"
      :custom-style="popupStyles"
      :closeable="true"
      :close-on-click-overlay="props.closeOnClickOverlay"
      @close="close"
    >
      <view class="nut-short-password-title">
        {{ props.title || translate('title') }}
      </view>

      <view class="nut-short-password-subtitle">
        {{ props.desc || translate('desc') }}
      </view>

      <view class="nut-short-password-wrapper">
        <view class="nut-short-password__list" @tap="focus">
          <view v-for="it in finalLength" :key="it" class="nut-short-password__item">
            <view v-if="it <= innerValue.length" class="nut-short-password__item-icon" />
          </view>
        </view>
      </view>

      <view class="nut-short-password__message">
        <view class="nut-short-password--error">
          {{ props.errorMsg }}
        </view>

        <view
          v-if="props.tips || translate('tips')"
          class="nut-short-password--forget"
          @click="onTipsClick"
        >
          <NutIcon custom-class="icon" name="tips" size="11px" />

          <view>{{ props.tips || translate('tips') }}</view>
        </view>
      </view>
    </NutPopup>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
