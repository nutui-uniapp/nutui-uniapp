<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import NutPopUp from '../popup/popup.vue'
import NutCascaderItem from '../cascaderitem/cascaderitem.vue'
import { cascaderEmits, cascaderProps } from './cascader'
import type { CascaderOption, CascaderValue } from './types'

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)
const innerValue: Ref<CascaderValue> = ref(props.modelValue as CascaderValue)
const innerVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})

function onChange(value: CascaderValue, pathNodes: CascaderOption[]) {
  innerValue.value = value
  innerVisible.value = false
  emit('change', value, pathNodes)
  emit('update:modelValue', value)
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
  <template v-if="poppable">
    <NutPopUp
      v-model:visible="innerVisible"
      position="bottom"
      pop-class="nut-cascader__popup"
      round
      :closeable="closeable"
      :close-icon="closeIcon"
      :destroy-on-close="false"
      :close-icon-position="closeIconPosition"
      :lock-scroll="lockScroll"
    >
      <template v-if="title">
        <view class="nut-cascader__bar" v-html="title" />
      </template>

      <NutCascaderItem
        :model-value="innerValue"
        :options="options"
        :lazy="lazy"
        :lazy-load="lazyLoad"
        :value-key="valueKey"
        :text-key="textKey"
        :children-key="childrenKey"
        :convert-config="convertConfig"
        :visible="innerVisible"
        :title-ellipsis="titleEllipsis"
        :title-gutter="titleGutter"
        :title-size="titleSize"
        :title-type="titleType"
        @change="onChange"
        @path-change="onPathChange"
      />
    </NutPopUp>
  </template>

  <template v-else>
    <NutCascaderItem
      :model-value="innerValue"
      :options="options"
      :lazy="lazy"
      :lazy-load="lazyLoad"
      :value-key="valueKey"
      :text-key="textKey"
      :children-key="childrenKey"
      :convert-config="convertConfig"
      :visible="innerVisible"
      :title-ellipsis="titleEllipsis"
      :title-gutter="titleGutter"
      :title-size="titleSize"
      :title-type="titleType"
      @change="onChange"
      @path-change="onPathChange"
    />
  </template>
</template>

<style lang="scss">
@import './index';
@import '../popup/index';
</style>
