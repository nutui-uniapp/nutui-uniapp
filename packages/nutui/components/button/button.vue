<script lang="ts" setup>
import { type CSSProperties, defineComponent } from 'vue'
import { computed, toRefs } from 'vue'
import Icon from '../icon/icon.vue'
import { PREFIX } from '../_utils'
import { buttonEmits, buttonProps } from './button'

const props = defineProps(buttonProps)

const emits = defineEmits(buttonEmits)

const { type, size, shape, disabled, loading, customColor, plain, block } = toRefs(props)

function handleClick(event: MouseEvent) {
  if (!loading.value && !disabled.value)
    emits('click', event)
}

const classes = computed(() => {
  return {
    [componentName]: true,
    [`${componentName}--${type.value}`]: type.value,
    [`${componentName}--${size.value}`]: size.value,
    [`${componentName}--${shape.value}`]: shape.value,
    [`${componentName}--plain`]: plain.value,
    [`${componentName}--block`]: block.value,
    [`${componentName}--disabled`]: disabled.value,
    [`${componentName}--loading`]: loading.value,
  }
})

const getStyle = computed(() => {
  const style: CSSProperties = {}
  if (customColor?.value) {
    if (plain.value) {
      style.color = customColor.value
      style.background = '#fff'
      if (!customColor.value?.includes('gradient'))
        style.borderColor = customColor.value
    }
    else {
      style.color = '#fff'
      style.background = customColor.value
    }
  }

  return style
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-button`

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
  <view
    :class="[classes, customClass]"
    :style="[getStyle, customStyle]"
    :form-type="formType === 'button' ? undefined : formType"
    @click="handleClick"
  >
    <view class="nut-button__wrap">
      <Icon v-if="loading" name="loading" class="nut-icon-loading" />
      <slot v-if="$slots.icon && !loading" name="icon" />
      <view v-if="$slots.default" :class="{ 'nut-button__text': $slots.icon || loading }">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
