<script lang="ts" setup>
import { computed, ref, useSlots, watch } from 'vue'
import NutIcon from '../icon/icon.vue'
import { useTranslate } from '../../locale'
import { getMainClass } from '../_utils'
import type { TableColumnProps } from './types'
import { tableEmits, tableProps } from './table'
import RenderColumn from './renderColumn'

const COMPONENT_NAME = 'nut-table'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tableProps)

const emit = defineEmits(tableEmits)

const slots = useSlots()

const { translate } = useTranslate(COMPONENT_NAME)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const mainClasses = computed(() => {
  return {
    'nut-table__main--striped': props.striped,
  }
})

const nodataClasses = computed(() => {
  return {
    'nut-table__nodata--border': props.bordered,
  }
})

const innerData = ref(props.data)

const innerRenders = computed(() => {
  return props.columns.map((columns) => {
    return [columns.key, columns.render]
  })
})

function getCellItemClasses(item: TableColumnProps) {
  return {
    'nut-table__main__head__tr--border': props.bordered,
    [`nut-table__main__head__tr--align${item.align || ''}`]: true,
  }
}

function getColumnItem(key: string) {
  return props.columns.find(item => item.key === key)!
}

function getColumnItemStyle(key: string) {
  return getColumnItem(key).stylecolumn || ''
}

function handleSorterClick(item: TableColumnProps) {
  if (!item.sorter) {
    return
  }

  emit('sorter', item)

  if (typeof item.sorter === 'function') {
    innerData.value.sort(item.sorter)
  }
  else if (item.sorter === 'default') {
    innerData.value.sort()
  }
}

watch(() => props.data, (value) => {
  innerData.value = value.slice()
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view class="nut-table__main" :class="mainClasses">
      <view class="nut-table__main__head">
        <view class="nut-table__main__head__tr">
          <view
            v-for="item in props.columns"
            :key="item.key"
            class="nut-table__main__head__tr__th"
            :class="getCellItemClasses(item)"
            :style="item.stylehead"
            @click="handleSorterClick(item)"
          >
            {{ item.title }}

            <NutIcon v-if="item.sorter" name="down-arrow" size="12px" />
          </view>
        </view>
      </view>

      <view class="nut-table__main__body">
        <view v-for="item in innerData" :key="item" class="nut-table__main__body__tr">
          <view
            v-for="[key, render] in innerRenders"
            :key="key as string"
            class="nut-table__main__body__tr__td"
            :class="getCellItemClasses(getColumnItem(key as string))"
            :style="getColumnItemStyle(key as string)"
          >
            <!-- #ifdef H5 -->
            <RenderColumn
              v-if="typeof item[key as string] === 'function' || typeof render === 'function'"
              :slots="[render, item[key as string]]"
              :record="item"
            />

            <view v-else>
              {{ item[key as string] }}
            </view>
            <!-- #endif -->

            <!-- #ifndef H5 -->
            <view>
              {{ item[key as string] }}
            </view>
            <!-- #endif -->
          </view>
        </view>
      </view>
    </view>

    <view v-if="props.summary" class="nut-table__summary">
      <rich-text class="nut-table__summary__text" :nodes="props.summary().value" />
    </view>

    <view v-if="innerData.length <= 0" class="nut-table__nodata" :class="nodataClasses">
      <slot v-if="slots.nodata" name="nodata" />

      <view v-else class="nut-table__nodata__text">
        {{ translate('noData') }}
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
