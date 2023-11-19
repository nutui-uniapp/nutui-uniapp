<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { funInterceptor, getMainClass } from '../_utils'
import { CLOSE_EVENT, PREFIX } from '../_constants'
import NutPopup from '../popup/popup.vue'

import NutSwiper from '../swiper/swiper.vue'
import NutSwiperItem from '../swiperitem/swiperitem.vue'

import NutIcon from '../icon/icon.vue'
import type { ImageInterface } from './types'
import { imagepreviewEmits, imagepreviewProps } from './imagepreview'

const props = defineProps(imagepreviewProps)

const emit = defineEmits(imagepreviewEmits)

const state = reactive({
  showPop: false,
  active: 0,
  options: {
    muted: true,
    controls: true,
  },
  eleImg: null as HTMLElement | null,
  store: {
    scale: 1,
    moveable: false,
    originScale: 1,
    oriDistance: 1,
  },
  lastTouchEndTime: 0, // 用来辅助监听双击
})

const styles = computed(() => {
  const style: CSSProperties = {

  }
  if (props.closeIconPosition === 'top-right')
    style.right = '10px'

  else
    style.left = '10px'

  return style
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

// 设置当前选中第几个
function setActive(active: number) {
  if (active !== state.active) {
    state.active = active
    emit('change', state.active)
  }
}

function closeOnImg() {
  if (props.contentClose)
    onClose()
}

function onClose() {
  funInterceptor(props.beforeClose, {
    args: [state.active],
    done: () => closeDone(),
  })
}
// 执行关闭
function closeDone() {
  state.showPop = false
  state.store.scale = 1
  scaleNow()
  emit(CLOSE_EVENT)
}

// 计算两个点的距离
function getDistance(first: { x: number; y: number }, second: { x: number; y: number }) {
  return Math.hypot(Math.abs(second.x - first.x), Math.abs(second.y - first.y))
}

function scaleNow() {
  if (state.eleImg != null)
    state.eleImg.style.transform = `scale(${state.store.scale})`
}

function onTouchStart(event: TouchEvent) {
  const curTouchTime = new Date().getTime()
  if (curTouchTime - state.lastTouchEndTime < 300) {
    const store = state.store
    if (store.scale > 1)
      store.scale = 1
    else if (store.scale === 1)
      store.scale = 2

    scaleNow()
  }

  const touches = event.touches
  const events = touches[0]
  const events2 = touches[1]

  const store = state.store
  store.moveable = true

  if (events2) {
    store.oriDistance = getDistance(
      {
        x: events.pageX,
        y: events.pageY,
      },
      {
        x: events2.pageX,
        y: events2.pageY,
      },
    )
  }

  store.originScale = store.scale || 1
}

function onTouchMove(event: TouchEvent) {
  if (!state.store.moveable)
    return

  const store = state.store
  // event.preventDefault();
  const touches = event.touches
  const events = touches[0]
  const events2 = touches[1]
  // 双指移动
  if (events2) {
    // 获得当前两点间的距离
    const curDistance = getDistance(
      {
        x: events.pageX,
        y: events.pageY,
      },
      {
        x: events2.pageX,
        y: events2.pageY,
      },
    )

    /**
     * 此处计算倍数，距离放大（缩小） k 倍则 scale 也 扩大（缩小） k 倍。距离放大（缩小）倍数 = 结束时两点距离 除以 开始时两点距离
     * 注意此处的 scale 变化是基于 store.scale 的。
     * store.scale 是一个暂存值，比如第一次放大 2 倍，则 store.scale 为 2。
     * 再次两指触碰的时候，store.originScale 就为 store.scale 的值，基于此时的 store.scale 继续放大缩小。 *
     */
    const curScale = curDistance / store.oriDistance
    store.scale = store.originScale * curScale

    // 最大放大 3 倍，缩小后松手要弹回原比例
    if (store.scale > 3)
      store.scale = 3

    scaleNow()
  }
}

function onTouchEnd() {
  state.lastTouchEndTime = new Date().getTime()
  const store = state.store
  store.moveable = false
  if ((store.scale < 1.1 && store.scale > 1) || store.scale < 1) {
    store.scale = 1
    scaleNow()
  }
}

function longPress(image: ImageInterface) {
  emit('longPress', image)
}

function init() {
  document.addEventListener('touchmove', onTouchMove)
  document.addEventListener('touchend', onTouchEnd)
  document.addEventListener('touchcancel', onTouchEnd)
}

watch(
  () => props.show,
  (val) => {
    state.showPop = val
    if (val) {
      setActive(props.initNo)
      // #ifdef H5
      init()
      // #endif
    }
  },
)

watch(
  () => props.initNo,
  (val) => {
    if (val !== state.active)
      setActive(val)
  },
)

onMounted(() => {
  setActive(props.initNo)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-image-preview`

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
  <NutPopup v-model:visible="state.showPop" :lock-scroll="true" pop-class="nut-image-preview-custom-pop">
    <view :class="classes" :style="customStyle" @touchstart.capture="(onTouchStart as any)">
      <NutSwiper
        v-if="state.showPop"
        :auto-play="autoplay"
        custom-class="nut-image-preview-swiper"
        :loop="isLoop"
        :is-prevent-default="false"
        direction="horizontal"
        :init-page="initNo"
        :pagination-visible="paginationVisible"
        :pagination-color="paginationColor"
        @change="setActive"
      >
        <NutSwiperItem v-for="(item, index) in images" :key="index">
          <movable-area class="nut-image-movable-area">
            <movable-view :disabled="!scale" inertia scale-area class="nut-image-preview-img" :scale="scale" direction="all">
              <image
                mode="aspectFit"
                :src="item.src"
                class="nut-image-preview-img"
                @longPress="longPress(item)"
                @longTap="longPress(item)"
                @click.stop="closeOnImg"
              />
            </movable-view>
          </movable-area>
        </NutSwiperItem>
      </NutSwiper>
    </view>

    <view v-if="showIndex" class="nut-image-preview-index">
      {{ state.active + 1 }} / {{ images.length }}
    </view>
    <view v-if="closeable" class="nut-image-preview-close-icon" :style="styles" @click="onClose">
      <NutIcon name="circle-close" custom-color="#ffffff" />
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import './index';
</style>
