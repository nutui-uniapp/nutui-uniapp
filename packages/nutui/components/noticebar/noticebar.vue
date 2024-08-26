<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import {
  computed,
  getCurrentInstance,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useSlots,
  watch,
} from 'vue'
import { getMainClass, isObject, pxCheck } from '../_utils'
import { CLICK_EVENT, CLOSE_EVENT } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { useSelectorQuery } from '../_hooks'
import { noticebarEmits, noticebarProps } from './noticebar'
import type { NoticebarState } from './types'

const COMPONENT_NAME = 'nut-noticebar'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(noticebarProps)

const emit = defineEmits(noticebarEmits)

const slots = useSlots()

const instance = getCurrentInstance()!

const { getSelectorNodeInfo } = useSelectorQuery(instance)

const wrap = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

const state: NoticebarState = reactive({
  wrapWidth: 0,
  firstRound: true,
  duration: 0,
  offsetWidth: 0,
  showNoticebar: true,
  animationClass: '',
  animate: false,
  scrollList: [],
  distance: 0,
  timer: null,
  keepAlive: false,
  isCanScroll: null,
  showNotice: true,
  id: Math.round(Math.random() * 100000),
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const isEllipsis = computed(() => {
  if (state.isCanScroll == null)
    return false && !props.wrapable

  else
    return !state.isCanScroll && !props.wrapable
})

const wrapContentClasses = computed(() => {
  return {
    'nut-noticebar__page-wrap-content': true,
    'nut-ellipsis': isEllipsis.value,
    [`content${state.id}`]: true,
    [state.animationClass]: true,
  }
})

const barStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.customColor)
    value.color = props.customColor

  if (props.background)
    value.background = props.background

  if (props.direction === 'vertical')
    value.height = `${props.height}px`

  return value
})

const contentStyles = computed(() => {
  return {
    animationDelay: `${state.firstRound ? props.delay : 0}s`,
    animationDuration: `${state.duration}s`,
    transform: `translateX(${state.firstRound ? 0 : `${state.wrapWidth}px`})`,
  }
})

const marqueeStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.complexAm) {
    Object.assign(value, {
      transform: `translateY(${state.distance}px)`,
    })
  }
  else {
    if (state.animate) {
      Object.assign(value, {
        transition: `all ${~~(props.height / props.speed / 4)}s`,
        marginTop: `-${props.height}px`,
      })
    }
  }

  return value
})

watch(
  () => props.text,
  () => {
    initScrollWrap()
  },
)

watch(
  () => props.list,
  (value) => {
    state.scrollList = [].concat(value as any)
  },
)

function initScrollWrap() {
  if (state.showNoticebar === false)
    return

  setTimeout(() => {
    if (state.showNoticebar === false)
      return

    let wrapWidth = 0
    let offsetWidth = 0

    getSelectorNodeInfo(`.wrap${state.id}`).then((rect) => {
      if (rect.width! > 0)
        wrapWidth = rect.width!

      getSelectorNodeInfo(`.content${state.id}`).then((rect) => {
        if (rect.width! > 0)
          offsetWidth = rect.width!

        state.isCanScroll = props.scrollable == null ? offsetWidth > wrapWidth : props.scrollable

        if (state.isCanScroll) {
          state.wrapWidth = wrapWidth
          state.offsetWidth = offsetWidth

          state.duration = offsetWidth / props.speed
          state.animationClass = 'play'
        }
        else {
          state.animationClass = ''
        }
      })
    })
  }, 100)
}

function handleClick(event: any) {
  emit('click', event)
}

function onClickIcon(event: any) {
  if (props.closeMode)
    state.showNoticebar = !props.closeMode

  emit('close', event)
}

function onAnimationEnd(event: any) {
  state.firstRound = false
  emit('acrossEnd', event)

  setTimeout(() => {
    state.duration = (state.offsetWidth + state.wrapWidth) / props.speed
    state.animationClass = 'play-infinite'
  }, 0)
}

function destroyTimer() {
  if (state.timer == null)
    return

  clearInterval(state.timer)
  state.timer = null
}

/**
 * 利益点滚动方式一
 */
function startRollEasy() {
  showMarquee()

  state.timer = setInterval(showMarquee, ~~(props.height / props.speed / 4) * 1000 + props.standTime)
}

function showMarquee() {
  state.animate = true
  setTimeout(() => {
    state.scrollList.push(state.scrollList[0])
    state.scrollList.shift()
    state.animate = false
  }, ~~(props.height / props.speed / 4) * 1000)
}

function startRoll() {
  state.timer = setInterval(() => {
    const chunk = 100
    for (let i = 0; i < chunk; i++)
      scroll(i, !(i < chunk - 1))
  }, props.standTime + 100 * props.speed)
}

function scroll(n: number, last: boolean) {
  setTimeout(() => {
    state.distance -= props.height / 100
    if (last) {
      state.scrollList.push(state.scrollList[0])
      state.scrollList.shift()
      state.distance = 0
    }
  }, n * props.speed)
}

/**
 * 点击滚动单元
 */
function go(item: any) {
  emit(CLICK_EVENT, item)
}

function handleClickIcon() {
  if (props.closeMode)
    state.showNoticebar = !props.closeMode

  emit(CLOSE_EVENT, state.scrollList[0] as any)
}

onMounted(() => {
  if (props.direction === 'vertical') {
    state.scrollList = [].concat(props.list as any)

    setTimeout(() => {
      props.complexAm ? startRoll() : startRollEasy()
    }, props.standTime)
  }
  else {
    initScrollWrap()
  }
})

onActivated(() => {
  if (state.keepAlive)
    state.keepAlive = false
})

onDeactivated(() => {
  state.keepAlive = true

  destroyTimer()
})

onUnmounted(() => {
  destroyTimer()
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view
      v-if="props.direction === 'across'"
      class="nut-noticebar__page"
      :class="{
        'nut-noticebar__page--withicon': props.closeMode,
        'nut-noticebar__page--close': props.closeMode,
        'nut-noticebar__page--wrapable': props.wrapable,
        'nut-hidden': !state.showNoticebar,
      }"
      :style="barStyles"
      @click="handleClick"
    >
      <view v-if="props.leftIcon" class="nut-noticebar__page-lefticon">
        <slot name="leftIcon">
          <NutIcon name="notice" size="16px" />
        </slot>
      </view>

      <view ref="wrap" :class="`nut-noticebar__page-wrap wrap${state.id}`">
        <view
          ref="content"
          :class="wrapContentClasses"
          :style="contentStyles"
          @animationend="onAnimationEnd"
          @webkit-animation-end="onAnimationEnd"
        >
          <slot>{{ props.text }}</slot>
        </view>
      </view>

      <view
        v-if="props.closeMode || slots.rightIcon"
        class="nut-noticebar__page-righticon"
        @click.stop="onClickIcon"
      >
        <slot name="rightIcon">
          <NutIcon name="circle-close" />
        </slot>
      </view>
    </view>

    <view
      v-if="state.scrollList.length > 0 && props.direction === 'vertical' && state.showNoticebar"
      class="nut-noticebar__vertical"
      :style="barStyles"
    >
      <view class="nut-noticebar__vertical-list" :style="marqueeStyles">
        <view
          v-for="(item, index) in state.scrollList"
          :key="index"
          class="nut-noticebar__vertical-item"
          :style="{ height: pxCheck(height), lineHeight: pxCheck(height) }"
          @click="go(item)"
        >
          {{ props.fieldName && isObject(item) ? item[props.fieldName] : item }}
        </view>
      </view>

      <view class="go" @click="handleClickIcon()">
        <slot name="rightIcon">
          <NutIcon
            v-if="props.closeMode"
            name="circle-close"
            :custom-color="props.customColor"
            size="11px"
          />
        </slot>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
