<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { clientHeight, listEmits, listProps } from './list'

const COMPONENT_NAME = 'nut-list'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(listProps)

const emit = defineEmits(listEmits)

const state = reactive({
  startOffset: 0,
  start: 0,
  list: props.listData.slice(),
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const styles = computed(() => {
  return getMainStyle(props, {
    height: `${pxCheck(props.containerHeight)}`,
  })
})

const getContainerHeight = computed(() => {
  return Math.min(+props.containerHeight!, clientHeight)
})

const visibleCount = computed(() => {
  return Math.ceil(getContainerHeight.value / props.height)
})

const end = computed(() => {
  return state.start + visibleCount.value
})

const getTransform = computed(() => {
  return `translate3d(0, ${state.startOffset}px, 0)`
})

const listHeight = computed(() => {
  return state.list.length * props.height
})

const visibleData = computed(() => {
  return state.list.slice(state.start, Math.min(end.value, state.list.length))
})

async function handleScrollEvent(e: any) {
  const { scrollTop } = e.detail
  state.start = Math.floor(scrollTop / props.height)
  if (end.value > state.list.length)
    emit('scrollBottom')
  emit('scroll')

  state.startOffset = scrollTop - (scrollTop % props.height)
}

watch(
  () => props.listData,
  () => {
    state.list = props.listData.slice()
  },
)
</script>

<template>
  <scroll-view
    :class="classes"
    :style="styles"
    :scroll-y="true"
    scroll-top="0"
    @scroll="handleScrollEvent"
  >
    <view class="nut-list-phantom" :style="{ height: `${listHeight}px` }" />

    <view class="nut-list-container" :style="{ transform: getTransform }">
      <view
        v-for="(item, index) in visibleData"
        :id="`list-item-${Number(index + state.start)}`"
        :key="index"
        class="nut-list-item"
        :style="{ height: `${props.height}px` }"
      >
        <slot :item="item" :index="index + state.start" />
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss">
@import "./index";
</style>
