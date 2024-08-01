<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, useSlots } from 'vue'
import Icon from '../icon/icon.vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { CLICK_EVENT } from '../_constants'
import { cellEmits, cellProps } from './cell'

const COMPONENT_NAME = 'nut-cell'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})

const props = defineProps(cellProps)

const emit = defineEmits(cellEmits)

const slots = useSlots()

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--clickable`]: props.isLink || props.to || props.clickable,
    [`${COMPONENT_NAME}--center`]: props.center,
    [`${COMPONENT_NAME}--large`]: props.size === 'large',
  })
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (props.roundRadius != null)
    value.borderRadius = pxCheck(props.roundRadius)

  return getMainStyle(props, value)
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

        <Icon v-else custom-class="nut-cell__icon__inner" :name="props.icon" />
      </view>

      <view v-if="props.title || props.subTitle || slots.title" class="nut-cell__title">
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
        :class="{ 'nut-cell__value--alone': !(props.title || props.subTitle || slots.title) }"
        :style="{ textAlign: props.descTextAlign }"
      >
        <slot v-if="slots.desc" name="desc" />

        <template v-else>
          {{ props.desc }}
        </template>
      </view>

      <slot v-if="slots.link" name="link" />

      <template v-else>
        <Icon v-if="props.isLink || props.to" custom-class="nut-cell__link" name="right" />
      </template>
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
