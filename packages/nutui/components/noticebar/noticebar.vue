<script setup lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref, useSlots, watch } from 'vue'
import { pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { useSelectorQuery } from '../_hooks'
import type { stateProps } from './noticebar'
import { noticebarEmits, noticebarProps } from './noticebar'

const props = defineProps(noticebarProps)

const emit = defineEmits(noticebarEmits)
const slots = useSlots()
const instance = getCurrentInstance() as ComponentInternalInstance
const { getSelectorNodeInfo } = useSelectorQuery(instance)

const wrap = ref<null | HTMLElement>(null)
const content = ref<null | HTMLElement>(null)

const state = reactive<stateProps>({
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
  showNotica: true,
  id: Math.round(Math.random() * 100000),
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

const isEllipsis = computed(() => {
  if (state.isCanScroll == null)
    return false && !props.wrapable

  else
    return !state.isCanScroll && !props.wrapable
})

const wrapContentClass = computed(() => {
  return {
    'nut-noticebar__page-wrap-content': true,
    'nut-ellipsis': isEllipsis.value,
    [`content${state.id}`]: true,
    [state.animationClass]: true,
  }
})

const barStyle = computed(() => {
  const style: {
    [props: string]: any
  } = {}

  props.customColor && (style.color = props.customColor)
  props.background && (style.background = props.background)

  if (props.direction === 'vertical')
    style.height = `${props.height}px`

  return style
})

const contentStyle = computed(() => {
  return {
    animationDelay: `${state.firstRound ? props.delay : 0}s`,
    animationDuration: `${state.duration}s`,
    transform: `translateX(${state.firstRound ? 0 : `${state.wrapWidth}px`})`,
  }
})
const horseLampStyle = computed(() => {
  let styles = {}
  if (props.complexAm) {
    styles = {
      transform: `translateY(${state.distance}px)`,
    }
  }
  else {
    if (state.animate) {
      styles = {
        'transition': `all ${~~(props.height / props.speed / 4)}s`,
        'margin-top': `-${props.height}px`,
      }
    }
  }
  return styles
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
function handleClick(event: Event) {
  emit('click', event)
}

function onClickIcon(event: Event) {
  if (props.closeMode)
    state.showNoticebar = !props.closeMode

  emit('close', event)
}

function onAnimationEnd(event: Event) {
  state.firstRound = false
  emit('acrossEnd', event)
  setTimeout(() => {
    state.duration = (state.offsetWidth + state.wrapWidth) / props.speed
    state.animationClass = 'play-infinite'
  }, 0)
}

/**
 * 利益点滚动方式一
 */
function startRollEasy() {
  showhorseLamp();
  (state.timer as any) = setInterval(showhorseLamp, ~~(props.height / props.speed / 4) * 1000 + props.standTime)
}
function showhorseLamp() {
  state.animate = true
  setTimeout(() => {
    state.scrollList.push(state.scrollList[0])
    state.scrollList.shift()
    state.animate = false
  }, ~~(props.height / props.speed / 4) * 1000)
}

function startRoll() {
  (state.timer as any) = setInterval(() => {
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
  emit('click', item)
}

function handleClickIcon() {
  if (props.closeMode)
    state.showNoticebar = !props.closeMode

  emit('close', state.scrollList[0])
}

onMounted(() => {
  if (props.direction === 'vertical') {
    if (slots.default) {

      // // #ifdef H5
      // updateSlotChild()
      // watchSlots()
      // // #endif
    }
    else {
      state.scrollList = [].concat(props.list as any)
    }

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
  clearInterval(state.timer as any)
})

onUnmounted(() => {
  clearInterval(state.timer as any)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-noticebar`

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
    <view
      v-show="state.showNoticebar"
      v-if="direction === 'across'"
      class="nut-noticebar__page"
      :class="{
        'nut-noticebar__page--withicon': closeMode,
        'nut-noticebar__page--close': closeMode,
        'nut-noticebar__page--wrapable': wrapable,
      }"
      :style="barStyle"
      @click="(handleClick as any)"
    >
      <view class="nut-noticebar__page-lefticon">
        <slot name="left-icon">
          <NutIcon v-if="leftIcon" name="notice" size="16px" />
        </slot>
      </view>
      <view ref="wrap" :class="`nut-noticebar__page-wrap wrap${state.id}`">
        <view
          ref="content"
          :class="wrapContentClass"
          :style="contentStyle"
          @animationend="(onAnimationEnd as any)"
          @webkitAnimationEnd="(onAnimationEnd as any)"
        >
          <slot>{{ text }}</slot>
        </view>
      </view>
      <view v-if="closeMode || $slots['right-icon']" class="nut-noticebar__page-righticon" @click.stop="(onClickIcon as any)">
        <slot name="right-icon">
          <NutIcon name="circle-close" />
        </slot>
      </view>
    </view>
    <!-- TODO uniapp拿不到 slots -->

    <view
      v-if="state.scrollList.length > 0 && direction === 'vertical' && state.showNoticebar"
      class="nut-noticebar__vertical"
      :style="barStyle"
    >
      <template v-if="slots.default">
        <view class="horseLamp_list" :style="horseLampStyle">
          <view
            v-for="(item, index) in state.scrollList"
            :key="index"
            :style="{ 'height': `${height}px`, 'line-height': `${height}px` }"
          >
            {{ item }}
          </view>
        </view>
      </template>
      <template v-else>
        <ul class="nut-noticebar__vertical-list" :style="horseLampStyle">
          <li
            v-for="(item, index) in state.scrollList"
            :key="index"
            class="nut-noticebar__vertical-item"
            :style="{ height: pxCheck(height), lineHeight: pxCheck(height) }"
            @click="go(item)"
          >
            {{ item }}
          </li>
        </ul>
      </template>

      <view class="go" @click="handleClickIcon()">
        <slot name="right-icon">
          <NutIcon v-if="closeMode" name="circle-close" :custom-color="customColor" size="11px" />
        </slot>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
