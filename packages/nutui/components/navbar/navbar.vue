<script setup lang="ts">
import { type ComponentInternalInstance, type ComputedRef, computed, defineComponent, getCurrentInstance, onMounted, ref, toRefs } from 'vue'
import { PREFIX, pxCheck } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { navbarEmits, navbarProps } from './navbar'

const props = defineProps(navbarProps)
const emit = defineEmits(navbarEmits)
const instance = getCurrentInstance() as ComponentInternalInstance
const { border, fixed, safeAreaInsetTop, placeholder, zIndex } = toRefs(props)

const navHeight = ref(0)
const classes = computed(() => {
  return {
    [componentName]: true,
    [`${componentName}--border`]: border.value,
    [`${componentName}--safe-area-inset-top`]: safeAreaInsetTop.value,
    [`${componentName}--fixed`]: fixed.value,
  }
})

const styles: ComputedRef = computed(() => {
  return {
    zIndex: zIndex.value,
  }
})

const colorStyle = computed(() => {
  return {
    fontSize: pxCheck(props.size!),
    color: props.customColor,
  }
})

onMounted(() => {
  if (fixed.value && placeholder.value) {
    // #ifndef H5
    const menuButtonBounding = uni.getMenuButtonBoundingClientRect()
    const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 44

    navHeight.value = !menuButtonBounding
      ? 0
      : menuButtonBounding.bottom + menuButtonBounding.top - statusBarHeight
    // #endif

    // #ifdef H5
    const query = uni.createSelectorQuery().in(instance)
    query.select('#navBarHtml').boundingClientRect()
    query.exec((res) => {
      navHeight.value = res[0].height
    })
    // #endif
  }
})

function handleLeft() {
  emit('onClickBack')
}

function handleCenter() {
  emit('onClickTitle')
}
function handleCenterIcon() {
  emit('onClickIcon')
}

function handleRight() {
  emit('onClickRight')
}
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
  <view v-if="fixed && placeholder" class="nut-navbar--placeholder" :style="{ height: `${navHeight}px`, zIndex }">
    <view id="navBarHtml" :class="[classes, customClass]" :style="[styles, customStyle]">
      <view class="nut-navbar__left" @click="handleLeft">
        <slot v-if="leftShow" name="left-show">
          <NutIcon custom-class="right-icon" name="left" height="12px" :size="size" :custom-color="customColor" />
        </slot>
        <view v-if="leftText" :style="colorStyle" class="nut-navbar__text">
          {{ leftText }}
        </view>
        <slot name="left" />
      </view>
      <view class="nut-navbar__title">
        <view v-if="title" class="title" :style="colorStyle" @click="handleCenter">
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
  <view v-else :class="[classes, customClass]" :style="[styles, customStyle]">
    <view class="nut-navbar__left" @click="handleLeft">
      <slot v-if="leftShow" name="left-show">
        <NutIcon custom-class="left-icon" name="left" height="12px" :size="size" :custom-color="customColor" />
      </slot>
      <view v-if="leftText" :style="colorStyle" class="nut-navbar__text">
        {{ leftText }}
      </view>
      <slot name="left" />
    </view>
    <view class="nut-navbar__title">
      <view v-if="title" class="title" :style="colorStyle" @click="handleCenter">
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
</template>

<style lang="scss">
@import './index';
</style>
