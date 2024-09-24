<script lang="ts" setup>
import { computed, defineComponent, ref, useSlots, watch } from 'vue'
import {
  CHANGE_EVENT,
  CLOSE_EVENT,
  CLOSED_EVENT,
  OPEN_EVENT,
  OPENED_EVENT,
  PREFIX,
  UPDATE_MODEL_EVENT,
  UPDATE_VISIBLE_EVENT,
} from '../_constants'
import { getMainClass } from '../_utils'
import NutCascaderItem from '../cascaderitem/cascaderitem.vue'
import NutPopup from '../popup/popup.vue'
import { cascaderEmits, cascaderProps } from './cascader'
import type { CascaderOption, CascaderValue } from './types'

const props = defineProps(cascaderProps)

const emit = defineEmits(cascaderEmits)

const slots = useSlots()

const innerValue = ref(props.modelValue as CascaderValue)

const innerVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit(UPDATE_VISIBLE_EVENT, value)
  },
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const popClasses = computed(() => {
  return `${componentName}__popup ${props.popClass}`
})

const overlayClasses = computed(() => {
  return `${componentName}__overlay ${props.overlayClass}`
})

function handleChange(value: CascaderValue, pathNodes: CascaderOption[]) {
  innerValue.value = value
  innerVisible.value = false

  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value, pathNodes)
}

function handlePathChange(pathNodes: CascaderOption[]) {
  emit('pathChange', pathNodes)
}

function handleOpen() {
  emit(OPEN_EVENT)
}

function handleOpened() {
  emit(OPENED_EVENT)
}

function handleClose() {
  emit(CLOSE_EVENT)
}

function handleClosed() {
  emit(CLOSED_EVENT)
}

watch(() => props.modelValue, (value) => {
  if (value !== innerValue.value) {
    innerValue.value = value as CascaderValue
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-cascader`

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
    <template v-if="props.poppable">
      <NutPopup
        v-model:visible="innerVisible"
        :custom-class="popClasses"
        :custom-style="props.popStyle"
        :overlay-class="overlayClasses"
        :overlay-style="props.overlayStyle"
        position="bottom"
        round
        :closeable="props.closeable"
        :close-icon="props.closeIcon"
        :close-icon-position="props.closeIconPosition"
        :z-index="props.zIndex"
        :lock-scroll="props.lockScroll"
        :overlay="props.overlay"
        :close-on-click-overlay="props.closeOnClickOverlay"
        :destroy-on-close="false"
        @open="handleOpen"
        @opened="handleOpened"
        @close="handleClose"
        @closed="handleClosed"
      >
        <slot v-if="slots.title" name="title" />

        <template v-else>
          <rich-text v-if="props.title" class="nut-cascader__bar" :nodes="props.title" />
        </template>

        <NutCascaderItem
          :model-value="innerValue"
          :visible="innerVisible"
          :options="props.options"
          :lazy="props.lazy"
          :lazy-load="props.lazyLoad"
          :value-key="props.valueKey"
          :text-key="props.textKey"
          :children-key="props.childrenKey"
          :convert-config="props.convertConfig"
          :title-type="props.titleType"
          :title-size="props.titleSize"
          :title-gutter="props.titleGutter"
          :title-ellipsis="props.titleEllipsis"
          @change="handleChange"
          @path-change="handlePathChange"
        />
      </NutPopup>
    </template>

    <template v-else>
      <NutCascaderItem
        :model-value="innerValue"
        :visible="innerVisible"
        :options="props.options"
        :lazy="props.lazy"
        :lazy-load="props.lazyLoad"
        :value-key="props.valueKey"
        :text-key="props.textKey"
        :children-key="props.childrenKey"
        :convert-config="props.convertConfig"
        :title-type="props.titleType"
        :title-size="props.titleSize"
        :title-gutter="props.titleGutter"
        :title-ellipsis="props.titleEllipsis"
        @change="handleChange"
        @path-change="handlePathChange"
      />
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
@import "../popup/index";
</style>
