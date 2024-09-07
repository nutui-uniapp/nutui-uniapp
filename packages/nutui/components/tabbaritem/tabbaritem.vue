<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, defineComponent, getCurrentInstance, inject, onBeforeUnmount, onMounted, ref, useSlots } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import NutBadge from '../badge/badge.vue'
import NutIcon from '../icon/icon.vue'
import { TABBAR_CONTEXT_KEY } from '../tabbar'
import type { TabbarContext } from '../tabbar/types'
import { tabbaritemProps } from './tabbaritem'

const props = defineProps(tabbaritemProps)

const slots = useSlots()

const instance = getCurrentInstance()

const tabbarContext = inject<TabbarContext>(TABBAR_CONTEXT_KEY)

const innerIndex = ref(-1)

const innerValue = computed(() => {
  if (props.name != null) {
    return props.name
  }

  return innerIndex.value
})

const isActive = computed(() => {
  if (tabbarContext == null) {
    return false
  }

  return innerValue.value === tabbarContext.modelValue
})

const classes = computed(() => {
  return getMainClass(props, componentName, {
    'nut-tabbar-item__icon--unactive': !isActive.value,
  })
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (tabbarContext != null) {
    value.color = isActive.value ? tabbarContext.activeColor : tabbarContext.unactiveColor
  }

  return getMainStyle(props, value)
})

function triggerChange() {
  if (tabbarContext == null) {
    return
  }

  tabbarContext.changeIndex(innerIndex.value, innerValue.value)
}

function bindContext() {
  if (tabbarContext == null || instance == null || instance.proxy == null) {
    return
  }

  tabbarContext.children.push(instance.proxy)

  innerIndex.value = tabbarContext.children.indexOf(instance.proxy)
}

function unbindContext() {
  if (tabbarContext == null) {
    return
  }

  tabbarContext.children.splice(innerIndex.value, 1)
}

onMounted(() => {
  bindContext()
})

onBeforeUnmount(() => {
  unbindContext()
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-tabbar-item`

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
  <view :class="classes" :style="styles" @click="triggerChange()">
    <NutBadge
      :value="props.value"
      :custom-color="props.customColor"
      :top="props.top"
      :right="props.right"
      :max="props.max"
      :dot="props.dot"
      :bubble="props.bubble"
      :hidden="props.hidden"
      :z-index="props.zIndex"
    >
      <view class="nut-tabbar-item_icon-box">
        <view v-if="slots.icon" class="nut-tabbar-item_icon-box_icon">
          <slot name="icon" :active="isActive" />
        </view>

        <template v-else>
          <view v-if="props.icon">
            <NutIcon custom-class="nut-popover-item-img" :name="props.icon" />
          </view>
        </template>

        <view
          class="nut-tabbar-item_icon-box_nav-word"
          :class="{ 'nut-tabbar-item_icon-box_big-word': !props.icon && !slots.icon }"
        >
          <slot v-if="slots.default" />

          <template v-else>
            <view v-if="props.tabTitle">
              {{ props.tabTitle }}
            </view>
          </template>
        </view>
      </view>
    </NutBadge>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
