<script lang="ts" setup>
import type { CSSProperties, Ref, VNode } from 'vue'
import { computed, getCurrentInstance, nextTick, onActivated, onMounted, ref, useSlots, watch } from 'vue'
import { CHANGE_EVENT, CLICK_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { useProvide, useRect, useSelectorQuery } from '../_hooks'
import { getMainClass, getRandomId, pxCheck, TypeOfFun } from '../_utils'
import raf from '../_utils/raf'
import NutIcon from '../icon/icon.vue'
import { useTabContentTouch } from './hooks'
import { TAB_KEY, tabsEmits, tabsProps, Title } from './tabs'

const COMPONENT_NAME = 'nut-tabs'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tabsProps)

const emit = defineEmits(tabsEmits)

const slots = useSlots()

const instance = getCurrentInstance()!

const { getSelectorNodeInfo, getSelectorNodeInfos } = useSelectorQuery(instance)

const elId = getRandomId()

const container = ref(null)

const { internalChildren } = useProvide(TAB_KEY, 'nut-tabs')({
  activeKey: computed(() => props.modelValue || 0),
  autoHeight: computed(() => props.autoHeight),
  animatedTime: computed(() => props.animatedTime),
})

const titles: Ref<Title[]> = ref([])

function renderTitles(vnodes: VNode[]) {
  vnodes.forEach((vnode, index) => {
    let type = vnode.type
    type = (type as any).name || type

    if (type === 'nut-tab-pane') {
      const title = new Title()

      if (vnode.props?.title || vnode.props?.['pane-key'] || vnode.props?.paneKey) {
        const paneKeyType = TypeOfFun(vnode.props?.['pane-key'])
        const paneIndex
              = paneKeyType === 'number' || paneKeyType === 'string' ? String(vnode.props?.['pane-key']) : null
        const camelPaneKeyType = TypeOfFun(vnode.props?.paneKey)
        const camelPaneIndex
              = camelPaneKeyType === 'number' || camelPaneKeyType === 'string' ? String(vnode.props?.paneKey) : null

        title.title = vnode.props?.title
        title.paneKey = paneIndex || camelPaneIndex || String(index)
        title.disabled = vnode.props?.disabled
      }

      titles.value.push(title)
    }
    else {
      if (vnode.children === ' ')
        return

      renderTitles(vnode.children as VNode[])
    }
  })
}

const currentIndex = ref((props.modelValue as number) || 0)

function findTabsIndex(value: string | number) {
  currentIndex.value = titles.value.findIndex(item => item.paneKey === String(value))
}

const innerScrollX = computed(() => {
  return props.titleScroll && props.direction === 'horizontal'
})

const innerScrollY = computed(() => {
  return props.titleScroll && props.direction === 'vertical'
})

const scrollLeft = ref(0)
const scrollTop = ref(0)
const scrollWithAnimation = ref(false)

const navRectRef = ref()
const titleRectRef = ref<UniApp.NodeInfo[]>([])

const canShowLabel = ref(false)

function scrollIntoView() {
  if (!props.titleScroll || slots.titles)
    return

  raf(() => {
    Promise.all([
      getSelectorNodeInfo(`#nut-tabs__titles_${elId}`),
      getSelectorNodeInfos(`#nut-tabs__titles_${elId} .nut-tabs__titles-item`),
    ]).then(([navRect, titleRects]) => {
      navRectRef.value = navRect
      titleRectRef.value = titleRects

      if (navRectRef.value) {
        if (props.direction === 'vertical') {
          const titlesTotalHeight = titleRects.reduce((prev, curr) => prev + curr.height!, 0)

          canShowLabel.value = titlesTotalHeight > navRectRef.value?.height
        }
        else {
          const titlesTotalWidth = titleRects.reduce((prev, curr) => prev + curr.width!, 0)

          canShowLabel.value = titlesTotalWidth > navRectRef.value?.width
        }
      }

      const titleRect = titleRectRef.value[currentIndex.value]

      let to: number
      if (props.direction === 'vertical') {
        const top = titleRects
          .slice(0, currentIndex.value)
          .reduce((prev, curr) => prev + curr.height!, 0)

        to = top - (navRectRef.value?.height - titleRect.height!) / 2
      }
      else {
        const left = titleRects
          .slice(0, currentIndex.value)
          .reduce((prev, curr) => prev + curr.width!, 0)

        // eslint-disable-next-line ts/no-non-null-asserted-optional-chain
        to = left - (navRectRef.value?.width - titleRect?.width!) / 2
      }

      nextTick(() => {
        scrollWithAnimation.value = true
      })

      scrollDirection(to, props.direction)
    })
  })
}

function scrollDirection(to: number, direction: 'horizontal' | 'vertical') {
  let count = 0

  const from = direction === 'horizontal' ? scrollLeft.value : scrollTop.value
  const frames = 1

  function animate() {
    if (direction === 'horizontal')
      scrollLeft.value += (to - from) / frames
    else
      scrollTop.value += (to - from) / frames

    if (++count < frames)
      raf(animate)
  }

  animate()
}

function init(vnodes: VNode[] = internalChildren.map(item => item.vnode)) {
  titles.value = []

  vnodes = vnodes?.filter(item => typeof item.children !== 'string')

  if (vnodes && vnodes.length)
    renderTitles(vnodes)

  findTabsIndex(props.modelValue)

  setTimeout(() => {
    scrollIntoView()
  }, 500)
}

watch(() => internalChildren.map(item => item.props), () => {
  init(internalChildren as any)
}, { deep: true, immediate: true })

watch(() => props.modelValue, (value) => {
  findTabsIndex(value)

  scrollIntoView()
})

onMounted(() => {
  init()
})

onActivated(() => {
  init()
})

const tabMethods = {
  isBegin: () => {
    return currentIndex.value === 0
  },
  isEnd: () => {
    return currentIndex.value === titles.value.length - 1
  },
  next: () => {
    currentIndex.value += 1

    const nextDisabled = titles.value[currentIndex.value].disabled

    if (tabMethods.isEnd() && nextDisabled) {
      tabMethods.prev()
      return
    }

    if (nextDisabled && currentIndex.value < titles.value.length - 1) {
      tabMethods.next()
      return
    }

    tabMethods.updateValue(titles.value[currentIndex.value])
  },
  prev: () => {
    currentIndex.value -= 1

    const prevDisabled = titles.value[currentIndex.value].disabled

    if (tabMethods.isBegin() && prevDisabled) {
      tabMethods.next()
      return
    }

    if (prevDisabled && currentIndex.value > 0) {
      tabMethods.prev()
      return
    }

    tabMethods.updateValue(titles.value[currentIndex.value])
  },
  updateValue: (item: Title) => {
    emit(UPDATE_MODEL_EVENT, item.paneKey)
    emit(CHANGE_EVENT, item)
  },
  tabChange: (item: Title, index: number) => {
    emit(CLICK_EVENT, item)

    if (item.disabled || currentIndex.value === index)
      return

    currentIndex.value = index
    tabMethods.updateValue(item)
  },
}

const { tabChange } = tabMethods
const {
  touchState,
  touchMethods,
  tabsContentID,
  tabsContentRef,
} = useTabContentTouch(props, tabMethods, instance, useRect)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [props.direction]: true,
  })
})

const tabsNavClasses = computed(() => {
  return {
    [props.type]: true,
    [props.size]: true,
    scrollable: props.titleScroll,
  }
})

const tabsNavStyles = computed(() => {
  return {
    background: props.background,
  }
})

const tabsInnerClasses = computed(() => {
  return {
    'nut-tabs__titles-left': props.align === 'left',
  }
})

function getTitleClasses(item: Title) {
  return {
    'nut-tabs-active': item.paneKey === String(props.modelValue),
    'disabled': item.disabled,
    'nut-tabs__titles-item-left': props.align === 'left',
  }
}

const titleStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.titleGutter) {
    const finalValue = pxCheck(props.titleGutter)

    if (props.direction === 'vertical') {
      value.paddingTop = finalValue
      value.paddingBottom = finalValue
    }
    else {
      value.paddingLeft = finalValue
      value.paddingRight = finalValue
    }
  }

  return value
})

const titleTextClasses = computed(() => {
  return {
    ellipsis: props.ellipsis,
  }
})

const tabsActiveStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.type === 'smile') {
    value.color = props.customColor
  }

  if (props.type === 'line') {
    value.background = props.customColor
  }

  return value
})

const contentStyles = computed(() => {
  const value: CSSProperties = {}

  const offset = currentIndex.value * 100 + (touchState.moving ? touchState.offset : 0)

  if (props.animatedTime !== 0) {
    value.transform = props.direction === 'horizontal'
      ? `translate3d(-${offset}%, 0, 0)`
      : `translate3d( 0,-${offset}%, 0)`

    if (!touchState.moving) {
      value.transitionDuration = `${props.animatedTime}ms`
    }
  }

  return value
})
</script>

<template>
  <view ref="container" :class="classes" :style="props.customStyle">
    <scroll-view
      :id="`nut-tabs__titles_${elId}`"
      class="nut-tabs__titles"
      :class="tabsNavClasses"
      :style="tabsNavStyles"
      :enable-flex="true"
      :scroll-x="innerScrollX"
      :scroll-y="innerScrollY"
      :scroll-left="scrollLeft"
      :scroll-top="scrollTop"
      :scroll-with-animation="scrollWithAnimation"
    >
      <view class="nut-tabs__list" :class="tabsInnerClasses">
        <slot v-if="slots.titles" name="titles" />

        <template v-else>
          <view
            v-for="(item, index) in titles"
            :key="item.paneKey"
            class="nut-tabs__titles-item uni"
            :class="getTitleClasses(item)"
            :style="titleStyles"
            @click="tabChange(item, index)"
          >
            <view v-if="props.type === 'line'" class="nut-tabs__titles-item__line" :style="tabsActiveStyles" />

            <view v-if="props.type === 'smile'" class="nut-tabs__titles-item__smile" :style="tabsActiveStyles">
              <NutIcon name="joy-smile" :custom-color="props.customColor" />
            </view>

            <view class="nut-tabs__titles-item__text" :class="titleTextClasses">
              {{ item.title }}
            </view>
          </view>

          <view v-if="canShowLabel && props.titleScroll" class="nut-tabs__titles-placeholder" />
        </template>
      </view>
    </scroll-view>

    <view
      :id="tabsContentID"
      ref="tabsContentRef"
      class="nut-tabs__content"
      :style="contentStyles"
      @touchstart="touchMethods.onTouchStart"
      @touchmove="touchMethods.onTouchMove"
      @touchend="touchMethods.onTouchEnd"
      @touchcancel="touchMethods.onTouchEnd"
    >
      <slot name="default" />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
