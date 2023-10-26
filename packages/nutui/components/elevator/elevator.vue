<script setup lang="ts">
import { type CSSProperties, type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import { PREFIX } from '../_constants'
import { elevatorEmits, elevatorProps } from './elevator'
import type { ElevatorData } from './type'

const props = defineProps(elevatorProps)

const emit = defineEmits(elevatorEmits)

const instance = getCurrentInstance() as ComponentInternalInstance

defineExpose({
  scrollTo,
})
const spaceHeight = 23

const state = reactive({
  anchorIndex: 0,
  codeIndex: 0,
  listHeight: [] as number[],
  listGroup: [] as HTMLLIElement[],
  touchState: {
    y1: 0,
    y2: 0,
  },
  scrollStart: false,
  currentIndex: 0,
  query: uni.createSelectorQuery(),
  scrollTop: 0,
  currentData: {} as ElevatorData,
  currentKey: '',
  scrollY: 0,
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

const fixedStyle = computed(() => {
  return {
    pointerEvents: 'none',
    height: `${state.listHeight[state.listGroup.length - 1]}px`,
  } as CSSProperties
})

function getData(el: HTMLElement): string | void {
  if (!el.dataset.index)
    return '0'

  return el.dataset.index as string
}

function setListGroup(el: any) {
  nextTick(() => {
    if (!state.listGroup.includes(el) && el != null)
      state.listGroup.push(el)
  })
}

function calculateHeight() {
  state.listHeight = []
  let height = 0
  state.listHeight.push(height)
  for (let i = 0; i < state.listGroup.length; i++) {
    state.query.in(instance).selectAll(`#elevator__item__${i}`).boundingClientRect()
    state.query.exec((res: { height: number }[][]) => {
      height += Math.floor(res[i][0].height)
      state.listHeight.push(height)
    })
  }
}

function scrollTo(index: number) {
  if (!index && index !== 0)
    return

  if (index < 0)
    index = 0
  if (index > state.listHeight.length - 2)
    index = state.listHeight.length - 2
  state.codeIndex = index
  state.scrollTop = state.listHeight[index]
}

function touchStart(e: TouchEvent) {
  state.scrollStart = true
  const index = getData(e.target as HTMLElement)
  const firstTouch = e.touches[0]
  state.touchState.y1 = firstTouch.pageY
  state.anchorIndex = +index
  state.codeIndex = +index
  scrollTo(+index)
}

function touchMove(e: TouchEvent) {
  const firstTouch = e.touches[0]
  state.touchState.y2 = firstTouch.pageY
  const delta = ((state.touchState.y2 - state.touchState.y1) / spaceHeight) | 0
  state.codeIndex = state.anchorIndex + delta
  scrollTo(state.currentIndex)
}

function touchEnd() {
  state.scrollStart = false
}

function handleClickItem(key: string, item: ElevatorData) {
  emit('clickItem', key, item)
  state.currentData = item
  state.currentKey = key
}

function handleClickIndex(key: string) {
  emit('clickIndex', key)
}

function listViewScroll(e: any) {
  const target = e.detail as Element
  const scrollTop = target.scrollTop
  const listHeight = state.listHeight
  state.scrollY = Math.floor(scrollTop)
  for (let i = 0; i < state.listHeight.length - 1; i++) {
    const height1 = listHeight[i]
    const height2 = listHeight[i + 1]

    if (state.scrollY >= height1 && state.scrollY < height2) {
      state.currentIndex = i
      return
    }
  }
}

onMounted(() => {
  props.indexList.forEach((item, index) => {
    const query = uni.createSelectorQuery()
      .in(instance)
      .select(`#elevator__item__${index}`)
    query.fields({
      size: true,
      scrollOffset: true,
      rect: true,
      id: true,
    }, (data) => {
      setListGroup(data)
    }).exec()
  })
})

watch(
  () => state.listGroup.length,
  (val) => {
    nextTick(calculateHeight)
  },
)

watch(
  () => state.currentIndex,
  (newVal: number) => {
    emit('change', newVal)
  },
)

const { scrollTop, scrollY, currentIndex, scrollStart, codeIndex, currentData, currentKey } = toRefs(state)
</script>

<script lang="ts">
const componentName = `${PREFIX}-elevator`

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
  <view :class="classes">
    <scroll-view
      id="listview"
      class="nut-elevator__list nut-elevator__list--mini"
      :scroll-top="scrollTop"
      :scroll-y="true"
      :scroll-with-animation="true"
      :scroll-anchoring="true"
      :style="{ height: isNaN(+height) ? height : `${height}px` }"
      @scroll="listViewScroll"
    >
      <view v-show="scrollY > 0 && isSticky" :style="fixedStyle" class="nut-elevator__list__fixed__wrapper">
        <view v-if="isSticky" class="nut-elevator__list__fixed nut-elevator__list__fixed--mini">
          <view class="nut-elevator__fixed-title">
            {{ indexList[currentIndex]?.[acceptKey] }}
          </view>
        </view>
      </view>
      <view id="elevator__item-wrap">
        <view
          v-for="(item, index) in indexList"
          :id="[`elevator__item__${index}`]"
          :key="item[acceptKey]"
          class="nut-elevator__list__item"
        >
          <view class="nut-elevator__list__item__code">
            {{ item[acceptKey] }}
          </view>
          <view
            v-for="subitem in item.list"
            :key="subitem.id"
            class="nut-elevator__list__item__name"
            :class="{
              'nut-elevator__list__item__name--highcolor': currentData.id === subitem.id && currentKey === item[acceptKey],
            }"
            @click="handleClickItem(item[acceptKey], subitem)"
          >
            <rich-text v-if="!$slots.default" :nodes="subitem.name" />
            <slot v-else :item="subitem" />
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-show="scrollStart" v-if="indexList.length > 0" class="nut-elevator__code--current">
      {{ indexList[codeIndex][acceptKey] }}
    </view>
    <view class="nut-elevator__bars" @touchstart="(touchStart as any)" @touchmove.stop.prevent="(touchMove as any)" @touchend="touchEnd">
      <view class="nut-elevator__bars__inner">
        <view
          v-for="(item, index) in indexList"
          :key="item[acceptKey]"
          class="nut-elevator__bars__inner__item"
          :class="{ active: item?.[acceptKey] === indexList?.[currentIndex]?.[acceptKey] }"
          :data-index="index"
          @click="handleClickIndex(item[acceptKey])"
        >
          {{ item[acceptKey] }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
