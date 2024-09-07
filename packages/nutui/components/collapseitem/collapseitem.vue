<script lang="ts" setup>
import { computed, getCurrentInstance, inject, onMounted, reactive, ref, useSlots, watch } from 'vue'
import { useSelectorQuery } from '../_hooks'
import { getMainClass, getRandomId } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { collapseitemProps } from './collapseitem'

const COMPONENT_NAME = 'nut-collapse-item'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(collapseitemProps)

const slots = useSlots()

const instance = getCurrentInstance()!

const { getSelectorNodeInfo } = useSelectorQuery(instance)

const elId = getRandomId()

const target = `#nut-collapse__item-${elId}`

const currentHeight = ref<string>('auto')

const inAnimation = ref(false)

const timeoutId = ref<any>('')

const collapse: any = inject('collapseParent')
const parent: any = reactive(collapse)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}__border`]: props.border,
  })
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
  return getSelectorNodeInfo(selector)
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

<template>
  <view :class="classes" :style="props.customStyle">
    <view
      class="nut-collapse-item__title"
      :class="{ 'nut-collapse-item__title--disabled': props.disabled }"
      @click="handleClick"
    >
      <view class="nut-collapse-item__title-main">
        <view class="nut-collapse-item__title-main-value">
          <slot v-if="slots.title" name="title" />

          <template v-else>
            <rich-text class="nut-collapse-item__title-mtitle" :nodes="props.title" />
          </template>

          <view v-if="props.label" class="nut-collapse-item__title-label">
            {{ props.label }}
          </view>
        </view>
      </view>

      <view v-if="slots.value" class="nut-collapse-item__title-sub">
        <slot name="value" />
      </view>

      <rich-text v-else class="nut-collapse-item__title-sub" :nodes="props.value" />

      <view
        class="nut-collapse-item__title-icon"
        :class="{ 'nut-collapse-item__title-icon--expanded': expanded }"
        :style="{ transform: `rotate(${expanded ? props.rotate : 0}deg)` }"
      >
        <slot name="icon">
          <NutIcon :name="props.icon" />
        </slot>
      </view>
    </view>

    <view v-if="slots.extra" class="nut-collapse__item-extraWrapper">
      <view class="nut-collapse__item-extraWrapper__extraRender">
        <slot name="extra" />
      </view>
    </view>

    <view
      class="nut-collapse__item-wrapper"
      :style="{
        willChange: 'height',
        height: wrapperHeight,
      }"
    >
      <view :id="`nut-collapse__item-${elId}`" class="nut-collapse__item-wrapper__content">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
