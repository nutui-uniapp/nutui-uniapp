<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import Icon from '../icon/icon.vue'
import { cellEmits, cellProps } from './cell'

const props = defineProps(cellProps)
const emits = defineEmits(cellEmits)

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}--clickable`]: props.isLink || props.to,
    [`${prefixCls}--center`]: props.center,
    [`${prefixCls}--large`]: props.size === 'large',
  }
})

const baseStyle = computed(() => {
  return {
    borderRadius: pxCheck(props.roundRadius),
  }
})

function handleClick(event: Event) {
  emits('click', event)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-cell`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
</script>

<template>
  <view :class="[classes, customClass]" :style="[baseStyle, customStyle]" @click="(handleClick as any)">
    <slot>
      <view v-if="$slots.icon" class="nut-cell__icon">
        <slot name="icon" />
      </view>
      <view v-if="title || subTitle || $slots.title" class="nut-cell__title">
        <template v-if="subTitle">
          <slot name="title">
            <view class="title">
              {{ title }}
            </view>
          </slot>
          <view class="nut-cell__title-desc">
            {{ subTitle }}
          </view>
        </template>
        <template v-else>
          <slot name="title">
            {{ title }}
          </slot>
        </template>
      </view>
      <view
        v-if="desc || $slots.desc" class="nut-cell__value"
        :class="{ 'nut-cell__value--alone': (!title && !subTitle && !$slots.title) }"
        :style="{ 'text-align': descTextAlign }"
      >
        <slot name="desc">
          {{ desc }}
        </slot>
      </view>
      <slot name="link">
        <Icon v-if="isLink || to" name="right" class="nut-cell__link" />
      </slot>
    </slot>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
