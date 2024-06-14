<script lang="ts" setup>
import { type ComponentInternalInstance, computed, getCurrentInstance, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import { getMainClass, pxCheck } from '../_utils'
import { elevatorEmits, elevatorProps } from './elevator'
import type { ElevatorData } from './types'

const COMPONENT_NAME = 'nut-elevator'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(elevatorProps)

const emit = defineEmits(elevatorEmits)

const instance = getCurrentInstance() as ComponentInternalInstance

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
  return getMainClass(props, COMPONENT_NAME)
})

// const fixedStyle = computed(() => {
//   return {
//     pointerEvents: 'none',
//     height: `${state.listHeight[state.listGroup.length - 1]}px`,
//   } as CSSProperties
// })

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

function queryItemHeight(index: number) {
  return new Promise((resolve) => {
    uni.createSelectorQuery()
      .in(instance)
      .selectAll(`#elevator__item__${index}`)
      .boundingClientRect((res: any) => {
        resolve(res)
      })
      .exec()
  })
}

async function calculateHeight() {
  state.listHeight = []
  let height = 0
  state.listHeight.push(height)
  try {
    const nodeList: any = await Promise.all(
      state.listGroup.map(async (_, index) => {
        return await queryItemHeight(index)
      }),
    )
    nodeList.forEach((_: any, index: number) => {
      height += Math.floor((nodeList[index][0] as any).height)
      state.listHeight.push(height)
    })
  }
  catch (err) {
    state.listHeight = [0]
    throw err
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

function touchStart(e: any) {
  state.scrollStart = true
  const index = getData(e.target as HTMLElement)
  const firstTouch = e.touches[0]
  state.touchState.y1 = firstTouch.pageY
  state.anchorIndex = +index
  state.codeIndex = +index
  scrollTo(+index)
}

function touchMove(e: any) {
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

function queryItemHeightFields(index: number) {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery()
      .in(instance)
      .select(`#elevator__item__${index}`)
    query.fields({
      size: true,
      scrollOffset: true,
      rect: true,
      id: true,
    }, (data) => {
      resolve(data)
    }).exec()
  })
}

onMounted(async () => {
  try {
    await Promise.all(
      props.indexList.map(async (_, index) => {
        const data = await queryItemHeightFields(index)
        setListGroup(data)
      }),
    )
    calculateHeight()
  }
  catch (err) {
    calculateHeight()
    throw err
  }
})

watch(
  () => state.currentIndex,
  (newVal: number) => {
    emit('change', newVal)
  },
)

const { scrollTop, scrollY, currentIndex, scrollStart, codeIndex, currentData, currentKey } = toRefs(state)

defineExpose({
  scrollTo,
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <scroll-view
      id="listview"
      class="nut-elevator__list nut-elevator__list--mini"
      :style="{ height: pxCheck(props.height) }"
      :scroll-y="true"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      :scroll-anchoring="true"
      @scroll="listViewScroll"
    >
      <view id="elevator__item-wrap">
        <view
          v-for="(item, index) in props.indexList"
          :id="[`elevator__item__${index}`]"
          :key="item[props.acceptKey]"
          class="nut-elevator__list__item"
        >
          <view class="nut-elevator__list__item__code">
            {{ item[props.acceptKey] }}
          </view>

          <view
            v-for="subitem in item.list"
            :key="subitem.id"
            class="nut-elevator__list__item__name"
            :class="{
              'nut-elevator__list__item__name--highcolor': currentData.id === subitem.id && currentKey === item[props.acceptKey],
            }"
            @click="handleClickItem(item[props.acceptKey], subitem)"
          >
            <rich-text v-if="!$slots.default" :nodes="subitem.name" />

            <slot v-else :item="subitem" />
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="nut-elevator__list__fixed" :class="{ 'nut-hidden': !(scrollY > 2 && props.isSticky) }">
      <view class="nut-elevator__list__fixed-title">
        {{ props.indexList[currentIndex][props.acceptKey] }}
      </view>
    </view>

    <view
      v-if="props.indexList.length > 0"
      class="nut-elevator__code--current"
      :class="{ 'nut-hidden': !scrollStart }"
    >
      {{ props.indexList[codeIndex][props.acceptKey] }}
    </view>

    <view
      class="nut-elevator__bars"
      @touchstart="touchStart"
      @touchmove.stop.prevent="touchMove"
      @touchend="touchEnd"
    >
      <view class="nut-elevator__bars__inner">
        <view
          v-for="(item, index) in props.indexList"
          :key="item[props.acceptKey]"
          class="nut-elevator__bars__inner__item"
          :class="{ active: item?.[props.acceptKey] === props.indexList?.[currentIndex]?.[props.acceptKey] }"
          :data-index="index"
          @click="handleClickIndex(item[props.acceptKey])"
        >
          {{ item[props.acceptKey] }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
