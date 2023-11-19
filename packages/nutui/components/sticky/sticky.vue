<script setup lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, onUnmounted, ref } from 'vue'
import type { ComponentInternalInstance, StyleValue } from 'vue'
import { PREFIX, refRandomId } from '../_constants'
import { getMainClass, getMainStyle, getPx, pxCheck } from '../_utils'
import { useRect } from '../_hooks'
import { stickyProps } from './sticky'

const props = defineProps(stickyProps)
const instance = getCurrentInstance() as ComponentInternalInstance
const rootId = `rootRef-${refRandomId}`
const cssSticky = ref(false)
const stickyTop = ref(0)
const left = ref(0)
const width = ref('auto')
const height = ref('auto')
const fixed = ref(false)
const observerList = ref<UniApp.IntersectionObserver[]>([])
const classes = computed(() => {
  return getMainClass(props, componentName)
})
const styles = computed(() => {
  const style: StyleValue = {}
  if (!props.disabled) {
    if (cssSticky.value) {
      style.position = 'sticky'
      style.zIndex = uZindex.value
      style.top = pxCheck(stickyTop.value)
    }
    else {
      style.height = fixed.value ? `${height.value}px` : 'auto'
    }
  }
  else {
    // 无需吸顶时，设置会默认的relative(nvue)和非nvue的static静态模式即可
    // #ifdef APP-NVUE
    style.position = 'relative'
    // #endif
    // #ifndef APP-NVUE
    style.position = 'static'
    // #endif
  }
  style.backgroundColor = props.bgColor

  return getMainStyle(props, style)
})
const uZindex = computed(() => {
  return props.zIndex ? +props.zIndex : 970
})

const stickyContent = computed(() => {
  const style: StyleValue = {}
  if (!cssSticky.value) {
    style.position = fixed.value ? 'fixed' : 'static'
    style.top = `${stickyTop.value}px`
    style.left = `${left.value}px`
    style.width = width.value === 'auto' ? 'auto' : `${width.value}px`
    style.zIndex = uZindex.value
  }
  return style
})

function initObserveContent() {
  // 获取吸顶内容的高度，用于在js吸顶模式时，给父元素一个填充高度，防止"塌陷"
  useRect(rootId, instance).then((res) => {
    height.value = res.height!.toString()
    left.value = res.left!
    width.value = res.width!.toString()
    nextTick(() => {
      observeContent()
    })
  })
}

function setFixed(top: number) {
  // 判断是否出于吸顶条件范围
  const tfixed = top <= stickyTop.value
  fixed.value = tfixed
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
  contentObserver.observe(`#${refRandomId}`, (res) => {
    setFixed(res.boundingClientRect.top)
  })
  observerList.value.push(contentObserver)
}

function disconnectObserver() {
  // 断掉观察，释放资源
  while (observerList.value.length !== 0)
    observerList.value.pop()!.disconnect()
}

function init() {
  getStickyTop()
  // 判断使用的模式
  checkSupportCssSticky()
  // 如果不支持css sticky，则使用js方案，此方案性能比不上css方案
  if (!cssSticky.value)
    !props.disabled && initObserveContent()
}

async function checkSupportCssSticky() {
  // #ifdef H5
  // H5，一般都是现代浏览器，是支持css sticky的，这里使用创建元素嗅探的形式判断
  if (checkCssStickyForH5())
    cssSticky.value = true

  // #endif

  // 如果安卓版本高于8.0，依然认为是支持css sticky的(因为安卓7在某些机型，可能不支持sticky)
  if (uni.getSystemInfoSync().platform.toLowerCase() === 'android' && Number(uni.getSystemInfoSync()) > 8)
    cssSticky.value = true

  // APP-Vue和微信平台，通过computedStyle判断是否支持css sticky
  // #ifdef APP-PLUS || MP-WEIXIN || MP-TOUTIAO
  cssSticky.value = await checkComputedStyle()
  // #endif

  // ios上，从ios6开始，都是支持css sticky的
  if (uni.getSystemInfoSync().platform.toLowerCase() === 'ios')
    cssSticky.value = true

  // nvue，是支持css sticky的
  // #ifdef APP-NVUE
  cssSticky.value = true
  // #endif
}

// 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
function checkComputedStyle(): Promise<boolean> {
  // 方法内进行判断，避免在其他平台生成无用代码
  // #ifdef APP-PLUS || MP-WEIXIN || MP-TOUTIAO
  return new Promise((resolve) => {
    uni.createSelectorQuery().in(instance).select('.nut-sticky').fields({
      computedStyle: ['position'],
    }, () => {}).exec((e) => {
      resolve(e[0].position === 'sticky')
    })
  })
  // #endif
}
// H5通过创建元素的形式嗅探是否支持css sticky
// 判断浏览器是否支持sticky属性
function checkCssStickyForH5() {
  // 方法内进行判断，避免在其他平台生成无用代码
  // #ifdef H5
  const vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-']
  const vendorListLength = vendorList.length
  const stickyElement = document.createElement('div')
  for (let i = 0; i < vendorListLength; i++) {
    stickyElement.style.position = `${vendorList[i]}sticky`
    if (stickyElement.style.position !== '')
      return true
  }
  return false
  // #endif
}

function getStickyTop() {
  stickyTop.value = +getPx(props.offsetTop) + +getPx(props.customNavHeight)
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
    :id="rootId"
    :class="classes"
    :style="[styles]"
  >
    <view
      :style="[stickyContent]"
      class="nut-sticky__content"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
