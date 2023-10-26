<script setup lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, onMounted, reactive } from 'vue'
import { PREFIX } from '../_constants'
import { useTranslate } from '../../locale'
import NutIcon from '../icon/icon.vue'
import { useSelectorQuery } from '../_hooks'
import { infiniteloadingEmits, infiniteloadingProps } from './infiniteloading'

const props = defineProps(infiniteloadingProps)

const emit = defineEmits(infiniteloadingEmits)

const instance = getCurrentInstance() as ComponentInternalInstance
const { query } = useSelectorQuery(instance)

const state = reactive({
  scrollHeight: 0,
  scrollTop: 0,
  isInfiniting: false,
  direction: 'down',
  isTouching: false,
  refreshMaxH: 0,
  y: 0,
  x: 0,
  distance: 0,
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

const getStyle = computed(() => {
  return {
    height: state.distance < 0 ? '0px' : `${state.distance}px`,
    transition: state.isTouching
      ? 'height 0s cubic-bezier(0.25,0.1,0.25,1)'
      : 'height 0.2s cubic-bezier(0.25,0.1,0.25,1)',
  }
})
function getParentElement(el: string) {
  return query.select(props.containerId ? `#${props.containerId} #${el}` : `#${el}`)
}
/** 获取需要滚动的距离 */
function getScrollHeight() {
  const parentElement = getParentElement('scroller')

  parentElement
    .boundingClientRect((rect: Record<string, any>) => {
      state.scrollHeight = rect?.height || 0
    })
    .exec()
}

/** 滚动到底部 */
function lower() {
  if (state.direction === 'up' || !props.hasMore || state.isInfiniting) {
    return false
  }
  else {
    state.isInfiniting = true
    emit('loadMore', infiniteDone)
  }
}

function scroll(e: { detail: { scrollTop: number } }) {
  // 滚动方向
  if (e.detail.scrollTop <= 0) {
    // 滚动到最顶部
    e.detail.scrollTop = 0
  }
  else if (e.detail.scrollTop >= state.scrollHeight) {
    // 滚动到最底部
    e.detail.scrollTop = state.scrollHeight
  }
  if (e.detail.scrollTop > state.scrollTop || e.detail.scrollTop >= state.scrollHeight)
    state.direction = 'down'
  else
    state.direction = 'up'

  state.scrollTop = e.detail.scrollTop

  emit('scrollChange', e.detail.scrollTop)
}

function infiniteDone() {
  state.isInfiniting = false
}

function touchStart(event: TouchEvent) {
  if (state.scrollTop === 0 && !state.isTouching && props.isOpenRefresh) {
    state.y = event.touches[0].pageY
    state.isTouching = true
  }
}

function touchMove(event: TouchEvent) {
  state.distance = event.touches[0].pageY - state.y

  if (state.distance > 0 && state.isTouching) {
    event.preventDefault()
    if (state.distance >= state.refreshMaxH)
      state.distance = state.refreshMaxH
  }
  else {
    state.distance = 0
    state.isTouching = false
  }
}

function touchEnd() {
  if (state.distance < state.refreshMaxH)
    state.distance = 0
  else
    emit('refresh', refreshDone)
}

function refreshDone() {
  state.distance = 0
  state.isTouching = false
}

onMounted(() => {
  state.refreshMaxH = props.upperThreshold
  setTimeout(() => {
    getScrollHeight()
  }, 200)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-infiniteloading`
export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
const { translate } = useTranslate(componentName)
</script>

<template>
  <scroll-view
    id="scroller"
    :class="classes"
    :scroll-y="true"
    style="height: 100%"
    @scrolltolower="lower"
    @scroll="scroll"
    @touchstart="(touchStart as any)"
    @touchmove="(touchMove as any)"
    @touchend="touchEnd"
  >
    <view class="nut-infinite-top" :style="getStyle">
      <view id="refreshTop" class="top-box">
        <NutIcon custom-class="top-img" :name="pullIcon" />
        <view class="top-text">
          {{ pullTxt || translate('pullTxt') }}
        </view>
      </view>
    </view>

    <view class="nut-infinite-container">
      <slot />
    </view>

    <view class="nut-infinite-bottom">
      <template v-if="state.isInfiniting">
        <view class="bottom-box">
          <NutIcon custom-class="bottom-img" :name="loadIcon" />
          <view class="bottom-text">
            {{ loadTxt || translate('loading') }}
          </view>
        </view>
      </template>
      <template v-else-if="!hasMore">
        <view class="tips">
          {{ loadMoreTxt || translate('loadMoreTxt') }}
        </view>
      </template>
    </view>
  </scroll-view>
</template>

<style lang="scss">
@import './index';
</style>
