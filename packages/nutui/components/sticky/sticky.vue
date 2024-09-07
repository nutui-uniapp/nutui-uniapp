<script lang="ts" setup>
import type { ComponentInternalInstance, CSSProperties } from 'vue'
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { PREFIX } from '../_constants'
import { useRect } from '../_hooks'
import { getMainClass, getMainStyle, getPx, getRandomId, pxCheck } from '../_utils'
import { stickyProps } from './sticky'

const props = defineProps(stickyProps)

const instance = getCurrentInstance() as ComponentInternalInstance

// eslint-disable-next-line ts/no-use-before-define
const elementId = `${componentName}-${getRandomId()}`

const cssSticky = ref(false)

const left = ref(0)
const width = ref('auto')
const height = ref('auto')
const fixed = ref(false)

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const stickyTop = computed(() => {
  return Number(getPx(props.offsetTop)) + Number(getPx(props.customNavHeight))
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (!props.disabled) {
    if (cssSticky.value) {
      value.position = 'sticky'
      value.top = pxCheck(stickyTop.value)
      value.zIndex = props.zIndex
    }
    else {
      if (!fixed.value || height.value === 'auto') {
        value.height = 'auto'
      }
      else {
        value.height = `${height.value}px`
      }
    }
  }
  else {
    value.position = 'static'
  }

  value.backgroundColor = props.bgColor

  return getMainStyle(props, value)
})

const contentStyles = computed(() => {
  const value: CSSProperties = {}

  if (!cssSticky.value) {
    value.position = fixed.value ? 'fixed' : 'static'
    value.top = `${stickyTop.value}px`
    value.left = `${left.value}px`
    value.width = width.value === 'auto' ? 'auto' : `${width.value}px`
    value.zIndex = props.zIndex
  }

  return value
})

function setFixed(top: number) {
  // 判断是否出于吸顶条件范围
  fixed.value = top <= stickyTop.value
}

const observer = shallowRef<UniApp.IntersectionObserver | null>(null)

function disconnectObserver() {
  // 断掉观察，释放资源
  if (observer.value == null)
    return

  observer.value.disconnect()
  observer.value = null
}

function observeContent() {
  // 先断掉之前的观察
  disconnectObserver()

  const contentObserver = uni.createIntersectionObserver({
    // 检测的区间范围
    thresholds: [0.95, 0.98, 1],
  })

  // 到屏幕顶部的高度时触发
  contentObserver.relativeToViewport({
    top: -stickyTop.value,
  })

  // 绑定观察的元素
  contentObserver.observe(`#${elementId}`, (res) => {
    setFixed(res.boundingClientRect.top)
  })

  observer.value = contentObserver
}

function initObserveContent() {
  // 获取吸顶内容的高度，用于在js吸顶模式时，给父元素一个填充高度，防止"塌陷"
  useRect(elementId, instance).then((res) => {
    left.value = res.left!
    width.value = String(res.width)
    height.value = String(res.height)

    nextTick(() => {
      observeContent()
    })
  })
}

// H5通过创建元素的形式嗅探是否支持css sticky
// 判断浏览器是否支持sticky属性
function checkCssStickyForH5() {
  // 方法内进行判断，避免在其他平台生成无用代码
  // #ifdef H5
  const vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-']
  const stickyElement = document.createElement('div')
  for (let i = 0; i < vendorList.length; i++) {
    stickyElement.style.position = `${vendorList[i]}sticky`
    if (stickyElement.style.position !== '')
      return true
  }
  return false
  // #endif
}

// 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
function checkComputedStyle(): Promise<boolean> {
  // 方法内进行判断，避免在其他平台生成无用代码
  // #ifdef APP-VUE || MP-WEIXIN
  return new Promise((resolve) => {
    uni.createSelectorQuery()
      .in(instance)
      .select(`.${componentName}`)
      .fields({
        computedStyle: ['position'],
      }, () => {})
      .exec((res) => {
        resolve(res[0].position === 'sticky')
      })
  })
  // #endif
}

async function checkSupportCssSticky() {
  // #ifdef H5
  // H5，一般都是现代浏览器，是支持css sticky的，这里使用创建元素嗅探的形式判断
  if (checkCssStickyForH5())
    cssSticky.value = true
  // #endif

  // 如果安卓版本高于8.0，依然认为是支持css sticky的(因为安卓7在某些机型，可能不支持sticky)
  const systemInfo = uni.getSystemInfoSync()
  if (systemInfo.osName === 'android' && Number.parseInt(systemInfo.osVersion) > 8)
    cssSticky.value = true

  // APP-Vue和微信平台，通过computedStyle判断是否支持css sticky
  // #ifdef APP-VUE || MP-WEIXIN
  cssSticky.value = await checkComputedStyle()
  // #endif

  // ios上，从ios6开始，都是支持css sticky的
  if (systemInfo.osName === 'ios')
    cssSticky.value = true

  // nvue，是支持css sticky的
  // #ifdef APP-NVUE
  cssSticky.value = true
  // #endif
}

function init() {
  // 判断使用的模式
  checkSupportCssSticky()

  // 如果不支持css sticky，则使用js方案，此方案性能比不上css方案
  if (!cssSticky.value) {
    if (!props.disabled) {
      initObserveContent()
    }
  }
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  disconnectObserver()
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-sticky`

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
    :id="elementId"
    :class="classes"
    :style="[styles]"
  >
    <view
      class="nut-sticky__content"
      :style="[contentStyles]"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
