<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, defineComponent, useSlots } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { cellEmits, cellProps } from './cell'

const props = defineProps(cellProps)

const emit = defineEmits(cellEmits)

const slots = useSlots()

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--center`]: props.center,
    [`${componentName}--large`]: props.size === 'large',
    [`${componentName}--clickable`]: props.isLink || props.to || props.clickable,
  })
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (props.roundRadius != null)
    value.borderRadius = pxCheck(props.roundRadius)

  return getMainStyle(props, value)
})

const titleStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.titleWidth != null) {
    value.flex = '0 0 auto'
    value.width = pxCheck(props.titleWidth)
    value.minWidth = 0
  }

  return value
})

const descClasses = computed<Record<string, boolean>>(() => {
  return {
    [`${componentName}__value--alone`]: !(props.title || props.subTitle || slots.title),
  }
})

const descStyles = computed<CSSProperties>(() => {
  return {
    textAlign: props.descTextAlign,
  }
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
    <slot v-if="slots.default" />

    <template v-else>
      <view v-if="props.icon || slots.icon" class="nut-cell__icon">
        <slot v-if="slots.icon" name="icon" />

        <NutIcon v-else custom-class="nut-cell__icon__inner" :name="props.icon" />
      </view>

      <view v-if="props.title || props.subTitle || slots.title" class="nut-cell__title" :style="titleStyles">
        <slot v-if="slots.title" name="title" />

        <view v-else class="title">
          {{ props.title }}
        </view>

        <view v-if="props.subTitle" class="nut-cell__title-desc">
          {{ props.subTitle }}
        </view>
      </view>

      <view
        v-if="props.desc || slots.desc"
        class="nut-cell__value"
        :class="descClasses"
        :style="descStyles"
      >
        <slot v-if="slots.desc" name="desc" />

        <template v-else>
          {{ props.desc }}
        </template>
      </view>

      <slot v-if="slots.link" name="link" />

      <template v-else>
        <NutIcon v-if="props.isLink || props.to" custom-class="nut-cell__link" name="right" />
      </template>
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
