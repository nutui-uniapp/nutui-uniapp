<script lang="ts" setup>
import { computed } from 'vue'
import NutTransition from '../transition/transition.vue'
import NutIcon from '../icon/icon.vue'
import { getMainClass } from '../_utils'
import { loadingpageProps } from './loadingpage'

const COMPONENT_NAME = 'nut-loading-page'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(loadingpageProps)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})
</script>

<template>
  <NutTransition
    :show="props.loading"
    :custom-style="{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: props.zIndex,
      display: 'flex',
      backgroundColor: props.bgColor,
    }"
  >
    <view :class="classes" :style="props.customStyle">
      <view class="nut-loading-page__warpper">
        <view class="nut-loading-page__warpper__loading-icon">
          <image
            v-if="props.image"
            class="nut-loading-page__warpper__loading-icon__img"
            :style="{
              width: `${props.iconSize}px`,
              height: `${props.iconSize}px`,
            }"
            :src="props.image"
            mode="widthFix"
          />

          <NutIcon
            v-else
            name="loading1"
            :size="props.iconSize"
            :custom-color="props.loadingColor"
          />
        </view>

        <slot>
          <text
            class="nut-loading-page__warpper__text"
            :style="{
              fontSize: `${props.fontSize}px`,
              color: props.customColor,
            }"
          >
            {{ props.loadingText }}
          </text>
        </slot>
      </view>
    </view>
  </NutTransition>
</template>

<style lang="scss">
@import "./index";
</style>
