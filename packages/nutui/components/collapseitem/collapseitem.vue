<script setup lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, inject, onMounted, reactive, ref, useSlots, watch } from 'vue'
import { PREFIX } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { collapseitemProps } from './collapseitem'

const props = defineProps(collapseitemProps)
const instance = getCurrentInstance() as ComponentInternalInstance
const slots = useSlots()
const refRandomId = Math.random().toString(36).slice(-8)
const target = `#nut-collapse__item-${refRandomId}`
const currentHeight = ref<string>('auto')
const inAnimation = ref(false)
const timeoutId = ref<any>('')
const collapse: any = inject('collapseParent')
const parent: any = reactive(collapse)
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}__border`]: props.border,
  }
})

onMounted(() => {
  setTimeout(() => {
    getRect(target).then((res: any) => {
      if (res?.height)
        currentHeight.value = `${res.height}px`
    })
  }, 100)
})

// #ifdef H5
watch(
  () => slots.default?.(),
  () => {
    setTimeout(() => {
      getRect(target).then((res: any) => {
        if (res?.height)
          currentHeight.value = `${res.height}px`
      })
    }, 200)
  },
)
// #endif

async function getRectHeight() {
  const rect = await getRect(target) as any
  return rect.height as string
}

// #ifndef H5
watch(
  () => getRectHeight(),
  (val) => {
    setTimeout(() => {
      currentHeight.value = `${val}px`
    }, 200)
  },
  {
    deep: true,
  },
)
// #endif

function getRect(selector: string) {
  return new Promise((resolve) => {
    uni.createSelectorQuery().in(instance)
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => {
        resolve(rect[0])
      })
  })
}

const expanded = computed(() => {
  if (parent)
    return parent.isExpanded(props.name)

  return false
})

const wrapperHeight = ref(expanded.value ? 'auto' : '0px')

function handleClick() {
  if (!inAnimation.value)
    parent.updateVal(props.name)
}

function toggle(open: boolean) {
  // 连续切换状态时，清除打开的后续操作
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
    timeoutId.value = ''
  }
  const start = open ? '0px' : currentHeight.value
  const end = open ? currentHeight.value : '0px'
  inAnimation.value = true
  wrapperHeight.value = start
  setTimeout(() => {
    wrapperHeight.value = end
    inAnimation.value = false
    if (open) {
      timeoutId.value = setTimeout(() => {
        wrapperHeight.value = 'auto'
      }, 300)
    }
  }, 100)
}

watch(expanded, toggle)
</script>

<script lang="ts">
const componentName = `${PREFIX}-collapse-item`

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
      class="nut-collapse-item__title" :class="[{ 'nut-collapse-item__title--disabled': disabled }]"
      @click="handleClick"
    >
      <view class="nut-collapse-item__title-main">
        <view class="nut-collapse-item__title-main-value">
          <slot v-if="$slots.title" name="title" />
          <template v-else>
            <view class="nut-collapse-item__title-mtitle" v-html="title" />
          </template>
          <view v-if="label" class="nut-collapse-item__title-label">
            {{ label }}
          </view>
        </view>
      </view>
      <view v-if="$slots.value" class="nut-collapse-item__title-sub">
        <slot name="value" />
      </view>
      <view v-else class="nut-collapse-item__title-sub" v-html="value" />
      <view
        class="nut-collapse-item__title-icon" :class="[{ 'nut-collapse-item__title-icon--expanded': expanded }]"
        :style="{ transform: `rotate(${expanded ? rotate : 0}deg)` }"
      >
        <NutIcon :name="icon" />
      </view>
    </view>

    <view v-if="$slots.extra" class="nut-collapse__item-extraWrapper">
      <div class="nut-collapse__item-extraWrapper__extraRender">
        <slot name="extra" />
      </div>
    </view>
    <view
      class="nut-collapse__item-wrapper"
      :style="{
        willChange: 'height',
        height: wrapperHeight,
      }"
    >
      <view :id="`nut-collapse__item-${refRandomId}`" class="nut-collapse__item-wrapper__content">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
