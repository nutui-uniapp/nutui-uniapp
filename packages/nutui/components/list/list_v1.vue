<script setup lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, reactive, watch } from 'vue'
import type { ComponentInternalInstance, ComputedRef } from 'vue'
import { PREFIX } from '../_constants'
import { useRect } from '../_hooks'
import { clientHeight, listEmits, listProps } from './list'
import type { CachedPosition } from './type'
import { CompareResult, binarySearch } from './type'

// TODO 小程序插槽会有问题，
const props = defineProps(listProps)

const emit = defineEmits(listEmits)
const instance = getCurrentInstance() as ComponentInternalInstance

const state = reactive({
  start: 0,
  originStartIndex: 0,
  scrollTop: 0,
  list: props.listData.slice(),
  cachePositions: [] as CachedPosition[],
  phantomHeight: props.estimateRowHeight * props.listData.length,
})

const getContainerHeight = computed(() => {
  return Math.min(props.containerHeight!, clientHeight)
})

const visibleCount = computed(() => {
  return Math.ceil(getContainerHeight.value / props.estimateRowHeight)
})

const end = computed(() => {
  return Math.min(state.originStartIndex + visibleCount.value + props.bufferSize, state.list.length)
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

const visibleData: ComputedRef = computed(() => {
  return state.list.slice(state.start, end.value)
})

function getTransform() {
  return `translate3d(0, ${state.start >= 1 ? state.cachePositions[state.start - 1].bottom : 0}px, 0)`
}

function initCachedPosition() {
  state.cachePositions = []
  for (let i = 0; i < state.list.length; ++i) {
    state.cachePositions[i] = {
      index: i,
      height: props.estimateRowHeight,
      top: i * props.estimateRowHeight,
      bottom: (i + 1) * (props.estimateRowHeight + props.margin),
      dValue: 0,
    }
  }
}

function updateCachedPosition() {
  visibleData.value.forEach(async (_: any, index: number) => {
    const id = `list-item-${Number(index + state.start)}`
    const rect = await useRect(id, instance)
    if (rect && rect.height) {
      const { height } = rect
      const oldHeight = state.cachePositions[index + state.start]
        ? state.cachePositions[index + state.start].height
        : props.height
      const dValue = oldHeight - height

      if (dValue && state.cachePositions[index + state.start]) {
        state.cachePositions[index + state.start].bottom -= dValue
        state.cachePositions[index + state.start].height = height
        state.cachePositions[index + state.start].dValue = dValue
      }
    }
  })

  let startIndex = 0
  startIndex = state.start

  const cachedPositionsLen = state.cachePositions.length
  let cumulativeDiffHeight = state.cachePositions[startIndex].dValue
  state.cachePositions[startIndex].dValue = 0

  for (let i = startIndex + 1; i < cachedPositionsLen; ++i) {
    const item = state.cachePositions[i]

    state.cachePositions[i].top = state.cachePositions[i - 1].bottom
    state.cachePositions[i].bottom = state.cachePositions[i].bottom - cumulativeDiffHeight

    if (item.dValue !== 0) {
      cumulativeDiffHeight += item.dValue
      item.dValue = 0
    }
  }

  const height = state.cachePositions[cachedPositionsLen - 1].bottom

  state.phantomHeight = height
}

function getStartIndex(scrollTop = 0) {
  let idx = binarySearch<CachedPosition, number>(
    state.cachePositions,
    scrollTop,
    (currentValue: CachedPosition, targetValue: number) => {
      const currentCompareValue = currentValue.bottom
      if (currentCompareValue === targetValue)
        return CompareResult.eq

      if (currentCompareValue < targetValue)
        return CompareResult.lt

      return CompareResult.gt
    },
  ) as number

  const targetItem = state.cachePositions[idx]

  if (targetItem.bottom < scrollTop)
    idx += 1

  return idx
}

function resetAllVirtualParam() {
  state.originStartIndex = 0
  state.start = 0
  state.scrollTop = 0
  initCachedPosition()
  state.phantomHeight = props.estimateRowHeight * state.list.length
}

async function handleScrollEvent(e: any) {
  const scrollTop = Math.max(e.detail ? e.detail.scrollTop : e.target.scrollTop, 0.1)
  const { originStartIndex } = state
  const currentIndex = getStartIndex(scrollTop)
  if (currentIndex !== originStartIndex) {
    state.originStartIndex = currentIndex
    state.start = Math.max(state.originStartIndex - props.bufferSize, 0)
    if (end.value >= state.list.length - 1)
      emit('scrollBottom')
  }
  // if (scrollTop > state.scrollTop)
  //   emit('scrollUp', scrollTop)

  // else
  //   emit('scrollDown', scrollTop)

  state.scrollTop = scrollTop
}

watch(
  () => props.listData,
  (val: any[]) => {
    state.list = val.slice()
    if (state.list.length === val.length) {
      setTimeout(() => {
        initCachedPosition()
        updateCachedPosition()
      }, 200)
    }
    else {
      resetAllVirtualParam()
    }
  },
)

watch(
  () => state.start,
  () => {
    if (state.list.length > 0) {
      nextTick(() => {
        setTimeout(() => {
          updateCachedPosition()
        }, 200)
      })
    }
  },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-list`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
})
</script>

<template>
  <scroll-view
    :class="classes"
    :scroll-y="true"
    :style="{ height: `${getContainerHeight}px` }"
    scroll-top="0"
    @scroll="handleScrollEvent"
  >
    <div
      class="nut-list-phantom"
      :style="{ height: `${state.phantomHeight}px` }"
    />
    <div
      class="nut-list-container"
      :style="{ transform: getTransform() }"
    >
      <div
        v-for="(item, index) in visibleData"
        :id="`list-item-${Number(index + state.start)}`"
        :key="item"
        class="nut-list-item"
      >
        <slot :item="item" :index="index + state.start" />
      </div>
    </div>
  </scroll-view>
</template>

<style lang="scss">
@import './index';
</style>
