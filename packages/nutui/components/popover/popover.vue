<script setup lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import type { CSSProperties, ComponentInternalInstance } from 'vue'
import { isArray } from '../_utils'
import { PREFIX, refRandomId } from '../_constants'
import { useRect } from '../_hooks'
import NutIcon from '../icon/icon.vue'
import NutPopup from '../popup/popup.vue'

import { popoverEmits, popoverProps } from './popover'

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)

const instance = getCurrentInstance() as ComponentInternalInstance
const popoverID = `popoverRef${refRandomId}`
const popoverContentID = `popoverContentRef${refRandomId}`
const popoverContentCopyID = `popoverContentRefCopy${refRandomId}`
const popoverbox = ref()
const showPopup = ref(props.visible)
const popoverstyles = ref<any>({})

const rootRect = ref<any>()

let conentRootRect: {
  height: number
  width: number
}

const popoverArrow = computed(() => {
  const prefixCls = 'nut-popover-arrow'
  const loca = props.location
  const direction = loca.split('-')[0]
  return `${prefixCls} ${prefixCls}-${direction} ${prefixCls}--${loca}`
})
const popoverArrowStyle = computed(() => {
  const styles: CSSProperties = {}
  const { bgColor, arrowOffset, location } = props
  const direction = location.split('-')[0]
  const skew = location.split('-')[1]
  const base = 16

  if (bgColor)
    styles[`border${upperCaseFirst(direction)}Color` as any] = bgColor

  if (props.arrowOffset !== 0) {
    if (['bottom', 'top'].includes(direction)) {
      if (!skew)
        styles.left = `calc(50% + ${arrowOffset}px)`

      if (skew === 'start')
        styles.left = `${base + arrowOffset}px`

      if (skew === 'end')
        styles.right = `${base - arrowOffset}px`
    }

    if (['left', 'right'].includes(direction)) {
      if (!skew)
        styles.top = `calc(50% - ${arrowOffset}px)`

      if (skew === 'start')
        styles.top = `${base - arrowOffset}px`

      if (skew === 'end')
        styles.bottom = `${base + arrowOffset}px`
    }
  }
  return styles
})

function upperCaseFirst(str: string) {
  str = str.toLowerCase().replace(/\b\w+\b/g, word => word.substring(0, 1).toUpperCase() + word.substring(1))
  return str
}

function getRootPosition() {
  if (!rootRect.value || !conentRootRect)
    return {}

  const conentWidth = conentRootRect.width
  const conentHeight = conentRootRect.height
  const { width, height, left, top } = rootRect.value

  const { location, offset } = props
  const direction = location.split('-')[0]
  const skew = location.split('-')[1]
  let cross = 0
  let parallel = 0
  if (isArray(offset) && offset.length === 2) {
    cross += +offset[1]
    parallel += +offset[0]
  }

  if (width) {
    if (['bottom', 'top'].includes(direction)) {
      let h
      // #ifdef H5
      h = 0
      // #endif
      // #ifndef H5
      h = direction === 'bottom' ? height + cross : -(conentHeight + cross)
      // #endif

      popoverstyles.value.top = `${top + h}px`
      if (!skew)
        popoverstyles.value.left = `${-(conentWidth - width) / 2 + left + parallel}px`

      if (skew === 'start')
        popoverstyles.value.left = `${left + parallel}px`

      if (skew === 'end')
        popoverstyles.value.left = `${rootRect.value.right + parallel}px`
    }
    if (['left', 'right'].includes(direction)) {
      const contentW = direction === 'left' ? -(conentWidth + cross) : width + cross
      popoverstyles.value.left = `${left + contentW}px`
      if (!skew)
        popoverstyles.value.top = `${top - conentHeight / 2 + height / 2 - 4 + parallel}px`

      if (skew === 'start')
        popoverstyles.value.top = `${top + parallel}px`

      if (skew === 'end')
        popoverstyles.value.top = `${top + height + parallel}px`
    }
  }
}

const customStyle = computed(() => {
  const styles: CSSProperties = {}
  if (props.bgColor)
    styles.background = props.bgColor

  return styles
})
// 获取宽度
async function getContentWidth() {
  let rect
  if (props.targetId) {
    // #ifdef MP-WEIXIN
    // TODO 联动 tour  uniapp微信小程序无法实现，获取不到组件外节点的信息
    // 父节点可以拿到，根节点拿不动
    rect = await useRect(props.targetId, instance.parent!)

    if (rect.left! < 0)
      rect.left = 200

    if (rect.top! < 0)
      rect.top = 200

    // #endif
    // #ifndef MP-WEIXIN
    rect = await useRect(props.targetId)
    // #endif
  }

  else {
    rect = await useRect(popoverID, instance)
  }

  if (!(rootRect.value && rect.top === rootRect.value.top && rect.width === rootRect.value.width)) {
    setTimeout(() => {
      getContentWidth()
    }, 100)
  }
  rootRect.value = rect

  getRootPosition()
}

async function getPopoverContentW(type = 1) {
  const el = type === 1 ? popoverContentID : popoverContentCopyID

  const rectContent = await useRect(el, instance)

  conentRootRect = {
    height: rectContent.height!,
    width: rectContent.width!,
  }

  getRootPosition()
}
watch(
  () => props.visible,
  (value) => {
    showPopup.value = value
    if (value) {
      getContentWidth()

      setTimeout(() => {
        getPopoverContentW()
      }, 300)
    }
  },
)

watch(
  () => props.location,
  (value) => {
    getRootPosition()
  },
)
function update(val: boolean) {
  emit('update', val)
  emit('update:visible', val)
}
function openPopover() {
  update(!props.visible)
  emit('open')
}
function closePopover() {
  emit('update:visible', false)
  emit('close')
}
function chooseItem(item: any, index: number) {
  emit('choose', item, index)
  if (props.closeOnClickAction)
    closePopover()
}
function clickAway() {
  props.closeOnClickOutside && closePopover()
}

onMounted(() => {
  setTimeout(() => {
    getContentWidth()
    getPopoverContentW(0)
  }, 600)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-popover`

export default defineComponent({
  name: componentName,
  inheritAttrs: false,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view
    v-if="!targetId"
    :id="popoverID"
    :class="customClass"
    class="nut-popover-wrapper"
    @click="openPopover"
  >
    <slot name="reference" />
  </view>
  <view ref="popoverbox" class="nut-popover" :class="[`nut-popover--${theme}`, `${customClass}`]" :style="[popoverstyles, customStyle]">
    <NutPopup
      v-model:visible="showPopup"
      :pop-class="`nut-popover-content nut-popover-content--${location}`"
      :custom-style="customStyle"
      :position="`` as any"
      :transition="`nut-popover` as any"
      :overlay="overlay"
      :duration="+duration"
      :overlay-style="overlayStyle"
      :overlay-class="overlayClass"
      :close-on-click-overlay="closeOnClickOverlay"
      lock-scroll
      z-index="5000"
    >
      <view :id="popoverContentID" class="nut-popover-content-group">
        <view v-if="showArrow" :class="popoverArrow" :style="popoverArrowStyle" />
        <slot name="content" />
        <view
          v-for="(item, index) in list"
          :key="index"
          class="nut-popover-menu-item nut-popover-menu-taroitem" :class="[
            item.className,
            item.disabled && 'nut-popover-menu-disabled',
          ]"
          @click.stop="chooseItem(item, index)"
        >
          <NutIcon v-if="item.icon" :name="item.icon" custom-class="nut-popover-item-img" />
          <view class="nut-popover-menu-item-name">
            {{ item.name }}
          </view>
        </view>
      </view>
    </NutPopup>

    <view v-if="showPopup" class="nut-popover-content-bg" @touchmove="clickAway" @click="clickAway" />
  </view>
  <!-- 用于计算大小 -->
  <!-- TODO -->
  <view class="nut-popover-content nut-popover-content-copy">
    <view :id="popoverContentCopyID" class="nut-popover-content-group">
      <view v-if="showArrow" :class="popoverArrow" :style="popoverArrowStyle" />
      <slot name="content" />
      <view
        v-for="(item, index) in list"
        :key="index"
        class="nut-popover-menu-item nut-popover-menu-taroitem" :class="[
          item.className,
          item.disabled && 'nut-popover-menu-disabled',
        ]"
      >
        <NutIcon v-if="item.icon" :name="item.icon" custom-class="nut-popover-item-img" />
        <view class="nut-popover-menu-item-name">
          {{ item.name }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
