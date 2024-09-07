<script setup lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import type { ComponentInternalInstance, CSSProperties } from 'vue'
import { CHOOSE_EVENT, CLOSE_EVENT, OPEN_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { useRect } from '../_hooks'
import { getMainClass, getMainStyle, getRandomId } from '../_utils'
import NutIcon from '../icon/icon.vue'
import NutPopup from '../popup/popup.vue'
import { popoverEmits, popoverProps } from './popover'
import type { PopoverRootPosition } from './type'

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)
const instance = getCurrentInstance() as ComponentInternalInstance
const popoverID = `popoverRef${getRandomId()}`
const popoverContentID = `popoverContentRef${getRandomId()}`
const showPopup = ref(props.visible)
const rootPosition = ref<PopoverRootPosition>()

const elRect = ref({
  width: 0,
  height: 0,
})
const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`nut-popover--${props.theme}`]: true,
  })
})
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
  str = str.toLowerCase()
  str = str.replace(/\b\w+\b/g, word => word.substring(0, 1).toUpperCase() + word.substring(1))
  return str
}

const getRootPosition = computed(() => {
  const styles: CSSProperties = {}
  if (!rootPosition.value) {
    styles.visibility = 'hidden'
    return styles
  }

  const contentWidth = elRect.value.width
  const contentHeight = elRect.value.height
  const { width, height, left, top, right } = rootPosition.value
  const { location, offset } = props
  const direction = location?.split('-')[0]
  const skew = location?.split('-')[1]
  let cross = 0
  let parallel = 0
  if (Array.isArray(offset) && offset?.length === 2) {
    cross += Number(offset[1])
    parallel += Number(offset[0])
  }
  if (width) {
    if (['bottom', 'top'].includes(direction)) {
      const h = direction === 'bottom' ? height + cross : -(contentHeight + cross)
      styles.top = `${top + h}px`

      if (!skew)
        styles.left = `${-(contentWidth - width) / 2 + left + parallel}px`

      if (skew === 'start')
        styles.left = `${left + parallel}px`

      if (skew === 'end')
        styles.left = `${right + parallel}px`
    }
    if (['left', 'right'].includes(direction)) {
      const contentW = direction === 'left' ? -(contentWidth + cross) : width + cross
      styles.left = `${left + contentW}px`
      if (!skew)
        styles.top = `${top - contentHeight / 2 + height / 2 - 4 + parallel}px`

      if (skew === 'start')
        styles.top = `${top + parallel}px`

      if (skew === 'end')
        styles.top = `${top + height + parallel}px`
    }
  }

  if (elRect.value.width === 0)
    styles.visibility = 'hidden'
  else
    styles.visibility = 'initial'

  return styles
})

const styles = computed(() => {
  const styles: CSSProperties = {}
  if (props.bgColor)
    styles.background = props.bgColor

  return getMainStyle(props, styles)
})

// 获取宽度
async function getContentWidth() {
  uni.createSelectorQuery().selectViewport().scrollOffset((res: any) => {
    const distance = res.scrollTop

    if (props.targetId) {
      useRect(props.targetId, instance.root).then((rect) => {
        rootPosition.value = {
          width: rect.width!,
          height: rect.height!,
          left: rect.left!,
          top: rect.top! + distance!,
          right: rect.right!,
        }
      })
    }
    else {
      useRect(popoverID, instance).then((rect) => {
        rootPosition.value = {
          width: rect.width!,
          height: rect.height!,
          left: rect.left!,
          top: rect.top! + distance!,
          right: rect.right!,
        }
      })
    }
  }).exec()

  setTimeout(() => {
    getPopoverContentW()
  }, 300)
}

async function getPopoverContentW() {
  useRect(popoverContentID, instance).then((rect) => {
    elRect.value = {
      width: rect.width!,
      height: rect.height!,
    }
  })
}
watch(
  () => props.visible,
  (value) => {
    showPopup.value = value
    if (value) {
      nextTick(() => {
        getContentWidth()
      })
    }
  },
)

watch(
  () => props.location,
  (value) => {
    getContentWidth()
  },
)
function update(val: boolean) {
  emit('update', val)
  emit(UPDATE_VISIBLE_EVENT, val)
}
function openPopover() {
  update(!props.visible)
  emit(OPEN_EVENT)
}
function closePopover() {
  emit(UPDATE_VISIBLE_EVENT, false)
  emit(CLOSE_EVENT)
}
function chooseItem(item: any, index: number) {
  !item.disabled && emit(CHOOSE_EVENT, item, index)
}
function clickContent() {
  if (props.closeOnClickAction)
    closePopover()
}
function clickAway() {
  props.closeOnClickOutside && closePopover()
}

onMounted(() => {
  setTimeout(() => {
    getContentWidth()
  }, 300)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-popover`

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
  <view
    v-if="!targetId"
    :id="popoverID"
    class="nut-popover-wrapper"
    @click="openPopover"
  >
    <slot name="reference" />
  </view>
  <view :class="classes" :style="getRootPosition">
    <NutPopup
      v-model:visible="showPopup"
      :destroy-on-close="false"
      :pop-class="`nut-popover-content nut-popover-content--${location}`"
      :custom-style="styles"
      :position="`` as any"
      :transition="`nut-popover` as any"
      :overlay="overlay"
      :duration="+duration"
      :overlay-style="overlayStyle"
      :overlay-class="overlayClass"
      :close-on-click-overlay="closeOnClickOverlay"
    >
      <view :id="popoverContentID" class="nut-popover-content-group" @click.stop="clickContent">
        <view v-if="showArrow" :class="popoverArrow" :style="popoverArrowStyle" />
        <slot name="content" />
        <view
          v-for="(item, index) in list"
          :key="index"
          class="nut-popover-menu-item"
          :class="[item.className, item.disabled && 'nut-popover-menu-disabled']"
          @click="chooseItem(item, index)"
        >
          <NutIcon v-if="item.icon" :name="item.icon" custom-class="nut-popover-item-img" />
          <view class="nut-popover-menu-item-name">
            {{ item.name }}
          </view>
        </view>
      </view>
    </NutPopup>

    <view
      class="nut-popover-content-bg"
      :class="{ 'nut-hidden': !showPopup }"
      @touchmove="clickAway"
      @click="clickAway"
    />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
