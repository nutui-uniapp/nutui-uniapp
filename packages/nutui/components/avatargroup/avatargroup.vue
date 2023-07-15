<script setup lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, unref } from 'vue'
import { PREFIX, isH5 } from '../_utils'
import { useProvide } from '../_hooks'
import NutAvatar from '../avatar/avatar.vue'
import { AVATAR_KEY, avatargroupProps } from './avatargroup'

const props = defineProps(avatargroupProps)

const avatarGroupRef = ref(null)

const index = ref(0)

const foldCount = ref(99)
const observer = ref<MutationObserver>()
const styles = computed(() => {
  return {
    marginLeft: `${-1 * Number(props.span)}px`,
  }
})

// 折叠头像
function foldAvatar(element: any) {
  let count = 0

  const children = element.children
  if (props.zIndex === 'right') {
    for (let i = 0; i < Number(props.maxCount); i++) {
      const child = children[i]
      child.style.zIndex = `${99 - i}`
    }
  }
  for (let i = Number(props.maxCount); i < children.length; i++) {
    const child = children[i] as any
    let className
    if (isH5)
      className = child.className

    else
      className = child.props.class

    if (className.includes('avater-fold'))
      continue

    child.style.display = 'none'
    count++
  }
  foldCount.value = count
}

// 监听 default slot
function watchDefaultSlot(element: any) {
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: false, childList: true, subtree: true }

  // 当观察到变动时执行的回调函数
  const callback = function (mutations: MutationRecord[]) {
    let sig = false
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        sig = true
        break
      }
    }
    if (sig)
      foldAvatar(element)
  }

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback)
  // 以上述配置开始观察目标节点
  observer.observe(element, config)
  return observer
}

onMounted(() => {
  if (props.maxCount) {
    nextTick(() => {
      let element: any = unref(avatarGroupRef)
      // #ifdef H5
      if (element && element.$el)
        element = element.$el
      // #endif
      foldAvatar(element)
      observer.value = watchDefaultSlot(element)
    })
  }
})

onUnmounted(() => {
  // 之后，可停止观察
  observer.value?.disconnect()
})

// const sizeValue = ['large', 'normal', 'small'];
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

useProvide(AVATAR_KEY, `${PREFIX}-avatar`)({ props, avatarGroupRef, index })
</script>

<script lang="ts">
const componentName = `${PREFIX}-avatar-group`

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
  <view ref="avatarGroupRef" :class="classes">
    <slot />
    <NutAvatar
      v-if="foldCount > 0"
      class="avater-fold"
      :color="maxColor"
      :bg-color="maxBgColor"
      :size="size"
      :shape="shape"
      :style="{ magrinLeft: `${span}px` }"
    >
      {{ maxContent || foldCount }}
    </NutAvatar>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
