<script lang="ts" setup>
import { computed, watchEffect } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import { getMainClass } from '../_utils'
import { paginationEmits, paginationProps } from './pagination'

const COMPONENT_NAME = 'nut-pagination'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(paginationProps)

const emit = defineEmits(paginationEmits)

const { translate } = useTranslate(COMPONENT_NAME)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const pagesCount = computed(() => {
  return Math.max(1, Number(props.pageCount) || Math.ceil(Number(props.totalItems) / Number(props.itemsPerPage)))
})

function select(curPage: number, isSelect: boolean) {
  if (curPage > pagesCount.value || curPage < 1)
    return

  if (curPage !== props.modelValue)
    emit(UPDATE_MODEL_EVENT, curPage)

  if (isSelect)
    emit(CHANGE_EVENT, curPage)
}

function getPageObject(number: number, text: string | number, active = false) {
  return { number, text, active }
}

const pages = computed(() => {
  if (props.mode === 'simple')
    return
  const items = []
  const pageCount = pagesCount.value
  const pageSize = Number(props.showPageSize)
  let startPage = 1
  let endPage = pageCount
  const partialShow = pageCount > pageSize
  if (partialShow) {
    // 选中的page在展示的page中间
    startPage = Math.max(props.modelValue - Math.floor(pageSize / 2), 1)
    endPage = startPage + +pageSize - 1
    if (endPage > pageCount) {
      endPage = pageCount
      startPage = endPage - +pageSize + 1
    }
  }
  // 遍历生成数组
  for (let i = startPage; i <= endPage; i++) {
    const page = getPageObject(i, i, props.modelValue === i)
    items.push(page)
  }
  // 判断是否有折叠
  if (partialShow && pageSize > 0 && props.forceEllipses) {
    if (startPage > 1) {
      const prevPage = getPageObject(startPage - 1, '...')
      items.unshift(prevPage)
    }
    if (endPage < pageCount) {
      const nextPage = getPageObject(endPage + 1, '...')
      items.push(nextPage)
    }
  }

  return items
})

watchEffect(() => {
  select(props.modelValue, false)
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view
      class="nut-pagination-prev"
      :class="{ 'simple-border': props.mode !== 'multi', 'disabled': props.modelValue <= 1 }"
      @click="select(props.modelValue - 1, true)"
    >
      <slot name="prevText">
        {{ props.prevText || translate('prev') }}
      </slot>
    </view>

    <view v-if="props.mode === 'multi'" class="nut-pagination-contain">
      <view
        v-for="(item, index) of pages"
        :key="`${index}pagination`"
        class="nut-pagination-item"
        :class="{ active: item.active }"
        @click="select(item.number, true)"
      >
        <slot name="page" :item="item">
          {{ item.text }}
        </slot>
      </view>
    </view>

    <view v-if="props.mode === 'simple'" class="nut-pagination-contain">
      <view class="nut-pagination-simple">
        {{ props.modelValue }}/{{ pagesCount }}
      </view>
    </view>

    <view
      class="nut-pagination-next"
      :class="{ disabled: props.modelValue >= pagesCount }"
      @click="select(props.modelValue + 1, true)"
    >
      <slot name="nextText">
        {{ props.nextText || translate('next') }}
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
