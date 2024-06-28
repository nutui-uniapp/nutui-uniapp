<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import NutPopup from '../popup/popup.vue'
import NutCascaderItem from '../cascaderitem/cascaderitem.vue'
import { cascaderEmits, cascaderProps } from './cascader'
import type { CascaderOption, CascaderValue } from './types'

const COMPONENT_NAME = 'nut-cascader'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(cascaderProps)

const emit = defineEmits(cascaderEmits)

const innerValue = ref<CascaderValue>(props.modelValue as CascaderValue)

const innerVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit(UPDATE_VISIBLE_EVENT, value)
  },
})

function onChange(value: CascaderValue, pathNodes: CascaderOption[]) {
  innerValue.value = value
  innerVisible.value = false

  emit(CHANGE_EVENT, value, pathNodes)
  emit(UPDATE_MODEL_EVENT, value)
}

function onPathChange(pathNodes: CascaderOption[]) {
  emit('pathChange', pathNodes)
}

watch(
  () => props.modelValue,
  (value) => {
    if (value !== innerValue.value)
      innerValue.value = value as CascaderValue
  },
)
</script>

<template>
  <template v-if="props.poppable">
    <NutPopup
      v-model:visible="innerVisible"
      :custom-class="props.customClass"
      :custom-style="props.customStyle"
      position="bottom"
      :z-index="props.zIndex"
      pop-class="nut-cascader__popup"
      round
      :closeable="props.closeable"
      :close-icon="props.closeIcon"
      :destroy-on-close="false"
      :close-icon-position="props.closeIconPosition"
      :lock-scroll="props.lockScroll"
    >
      <slot name="title">
        <template v-if="props.title">
          <rich-text class="nut-cascader__bar" :nodes="props.title" />
        </template>
      </slot>

      <NutCascaderItem
        :model-value="innerValue"
        :options="props.options"
        :lazy="props.lazy"
        :lazy-load="props.lazyLoad"
        :value-key="props.valueKey"
        :text-key="props.textKey"
        :children-key="props.childrenKey"
        :convert-config="props.convertConfig"
        :visible="innerVisible"
        :title-ellipsis="props.titleEllipsis"
        :title-gutter="props.titleGutter"
        :title-size="props.titleSize"
        :title-type="props.titleType"
        @change="onChange"
        @path-change="onPathChange"
      />
    </NutPopup>
  </template>

  <template v-else>
    <NutCascaderItem
      :model-value="innerValue"
      :options="props.options"
      :lazy="props.lazy"
      :lazy-load="props.lazyLoad"
      :value-key="props.valueKey"
      :text-key="props.textKey"
      :children-key="props.childrenKey"
      :convert-config="props.convertConfig"
      :visible="innerVisible"
      :title-ellipsis="props.titleEllipsis"
      :title-gutter="props.titleGutter"
      :title-size="props.titleSize"
      :title-type="props.titleType"
      @change="onChange"
      @path-change="onPathChange"
    />
  </template>
</template>

<style lang="scss">
@import "./index";
@import "../popup/index";
</style>
