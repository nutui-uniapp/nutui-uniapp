<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { CLICK_EVENT, PREFIX } from '../_constants'
import Icon from '../icon/icon.vue'
import { cellEmits, cellProps } from './cell'

const props = defineProps(cellProps)

const emit = defineEmits(cellEmits)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--clickable`]: props.isLink || props.to,
    [`${componentName}--center`]: props.center,
    [`${componentName}--large`]: props.size === 'large',
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    borderRadius: pxCheck(props.roundRadius),
  })
})

function handleClick(event: any) {
  emit(CLICK_EVENT, event)

  if (props.to) {
    uni.navigateTo({
      url: props.to,
    })
  }
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
  <view :class="classes" :style="styles" @click="handleClick">
    <slot>
      <view v-if="$slots.icon" class="nut-cell__icon">
        <slot name="icon" />
      </view>

      <view v-if="props.title || props.subTitle || $slots.title" class="nut-cell__title">
        <template v-if="props.subTitle">
          <slot name="title">
            <view class="title">
              {{ props.title }}
            </view>
          </slot>

          <view class="nut-cell__title-desc">
            {{ props.subTitle }}
          </view>
        </template>

        <template v-else>
          <slot name="title">
            {{ props.title }}
          </slot>
        </template>
      </view>

      <view
        v-if="props.desc || $slots.desc"
        class="nut-cell__value"
        :class="{ 'nut-cell__value--alone': !props.title && !props.subTitle && !$slots.title }"
        :style="{ 'text-align': props.descTextAlign }"
      >
        <slot name="desc">
          {{ props.desc }}
        </slot>
      </view>

      <slot name="link">
        <Icon v-if="props.isLink || props.to" custom-class="nut-cell__link" name="right" />
      </slot>
    </slot>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
