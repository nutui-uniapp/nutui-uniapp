<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, getCurrentInstance, nextTick, onMounted, ref, toRefs, watch } from 'vue'
import { useRect } from '../_hooks'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { navbarEmits, navbarProps } from './navbar'

const COMPONENT_NAME = 'nut-navbar'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(navbarProps)

const emit = defineEmits(navbarEmits)

const instance = getCurrentInstance()!

const { border, fixed, safeAreaInsetTop, placeholder, zIndex } = toRefs(props)

const { statusBarHeight } = uni.getSystemInfoSync()

const navHeight = ref<string | 'auto'>('auto')

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--border`]: border.value,
    [`${COMPONENT_NAME}--safe-area-inset-top`]: safeAreaInsetTop.value,
    [`${COMPONENT_NAME}--fixed`]: fixed.value,
  })
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (zIndex.value)
    value.zIndex = zIndex.value

  // #ifdef MP
  if (placeholder.value && fixed.value) {
    value.height = navHeight.value
    value.paddingTop = pxCheck(statusBarHeight!)
  }
  // #endif

  return getMainStyle(props, value)
})

const textStyles = computed(() => {
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

<template>
  <view class="nut-navbar--placeholder" :style="{ height: navHeight }">
    <view id="navBarHtml" :class="classes" :style="styles">
      <view class="nut-navbar__left" @click="handleLeft">
        <slot v-if="props.leftShow" name="leftShow">
          <NutIcon
            custom-class="right-icon"
            name="left"
            height="12px"
            :size="props.size"
            :custom-color="props.customColor"
            @click="handleBack"
          />
        </slot>

        <view v-if="props.leftText" class="nut-navbar__text" :style="textStyles">
          {{ props.leftText }}
        </view>

        <slot name="left" />
      </view>

      <view class="nut-navbar__title">
        <view
          v-if="props.title"
          class="text"
          :style="textStyles"
          @click="handleCenter"
        >
          {{ props.title }}
        </view>

        <view v-if="props.titleIcon" class="icon" @click="handleCenterIcon">
          <slot name="titleIcon" />
        </view>

        <slot name="content" />
      </view>

      <view class="nut-navbar__right" @click="handleRight">
        <view v-if="props.desc" class="nut-navbar__text" :style="props.customStyle">
          {{ props.desc }}
        </view>

        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
