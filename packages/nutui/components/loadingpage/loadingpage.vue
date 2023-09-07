<script setup lang="ts">
import { defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutTransition from '../transition/transition.vue'
import NutIcon from '../icon/icon.vue'
import { loadingpageProps } from './loadingpage'

const props = defineProps(loadingpageProps)
</script>

<script lang="ts">
const componentName = `${PREFIX}-loading-page`

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
  <NutTransition
    :show="loading"
    :custom-style="{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: bgColor,
      display: 'flex',
      zIndex,
    }"
  >
    <view class="nut-loading-page">
      <view class="nut-loading-page__warpper">
        <view class="nut-loading-page__warpper__loading-icon">
          <image
            v-if="image"
            :src="image"
            class="nut-loading-page__warpper__loading-icon__img"
            mode="widthFix"
            :style="{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            }"
          />
          <NutIcon
            v-else
            name="loading1"
            :size="iconSize"
            :custom-color="loadingColor"
          />
        </view>
        <slot>
          <text
            class="nut-loading-page__warpper__text"
            :style="{
              fontSize: `${fontSize}px`,
              color: customColor,
            }"
          >
            {{ loadingText }}
          </text>
        </slot>
      </view>
    </view>
  </NutTransition>
</template>

<style lang="scss">
@import './index';
</style>
