<script setup lang="ts">
import { type CSSProperties, type ComponentInternalInstance, type ComputedRef, computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, toRefs, watch } from 'vue'
import { pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { useRect } from '../_hooks'
import { navbarEmits, navbarProps } from './navbar'

const props = defineProps(navbarProps)
const emit = defineEmits(navbarEmits)
const instance = getCurrentInstance() as ComponentInternalInstance

const { border, fixed, safeAreaInsetTop, placeholder, zIndex } = toRefs(props)
const { statusBarHeight } = uni.getSystemInfoSync()
const navHeight = ref<string | 'auto'>('auto')
const classes = computed(() => {
  return {
    [componentName]: true,
    [`${componentName}--border`]: border.value,
    [`${componentName}--safe-area-inset-top`]: safeAreaInsetTop.value,
    [`${componentName}--fixed`]: fixed.value,
  }
})

const rootStyle: ComputedRef = computed(() => {
  const style: CSSProperties = {

  }
  // #ifdef MP
  if (placeholder.value && fixed.value) {
    style.height = navHeight.value
    style.paddingTop = pxCheck(statusBarHeight!)
  }
  // #endif

  return style
})

const colorStyle = computed(() => {
  return {
    fontSize: pxCheck(props.size!),
    color: props.customColor,
  }
})
function getNavHeight() {
  if (!fixed.value || !placeholder.value)
    return

  // #ifdef MP
  const menuButtonBounding = uni.getMenuButtonBoundingClientRect()

  navHeight.value = !menuButtonBounding
    ? '44px'
    : pxCheck(menuButtonBounding.bottom + menuButtonBounding.top - statusBarHeight!)
  // #endif

  // #ifndef MP
  useRect('navBarHtml', instance).then((res) => {
    navHeight.value = pxCheck(res.height!)
  })
  // #endif
}

function handleBack() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  }
  else {
    uni.redirectTo({
      url: '/',
    })
  }
}

function handleLeft() {
  emit('onClickBack')
  emit('clickBack')
}

function handleCenter() {
  emit('onClickTitle')
  emit('clickTitle')
}
function handleCenterIcon() {
  emit('onClickIcon')
  emit('clickIcon')
}

function handleRight() {
  emit('onClickRight')
  emit('clickRight')
}
onMounted(() => {
  if (props.fixed && props.placeholder) {
    nextTick(() => {
      getNavHeight()
    })
  }
})
watch(
  [() => props.fixed, () => props.placeholder],
  () => {
    getNavHeight()
  },
  { deep: true, immediate: false },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-navbar`

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
  <view class="nut-navbar--placeholder" :style="{ height: navHeight, zIndex }">
    <view id="navBarHtml" :class="[classes, customClass]" :style="[rootStyle, customStyle]">
      <view class="nut-navbar__left" @click="handleLeft">
        <slot v-if="leftShow" name="left-show">
          <NutIcon custom-class="right-icon" name="left" height="12px" :size="size" :custom-color="customColor" @click="handleBack" />
        </slot>
        <view v-if="leftText" :style="colorStyle" class="nut-navbar__text">
          {{ leftText }}
        </view>
        <slot name="left" />
      </view>
      <view class="nut-navbar__title">
        <view v-if="title" class="text" :style="colorStyle" @click="handleCenter">
          {{ title }}
        </view>
        <view v-if="titleIcon" class="icon" @click="handleCenterIcon">
          <slot name="title-icon" />
        </view>
        <slot name="content" />
      </view>
      <view class="nut-navbar__right" @click="handleRight">
        <view v-if="desc" :style="customStyle" class="nut-navbar__text">
          {{ desc }}
        </view>
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
