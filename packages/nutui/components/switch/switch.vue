<script setup lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { switchEmits, switchProps } from './switch'

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const isActive = computed(() => props.modelValue === props.activeValue)
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [isActive.value ? 'nut-switch-open' : 'nut-switch-close']: true,
    [`${prefixCls}-disable`]: props.disable,
    [`${prefixCls}-base`]: true,
  }
})

const style = computed(() => {
  return {
    backgroundColor: isActive.value ? props.activeColor : props.inactiveColor,
  }
})

let updateType = ''

function onClick(event: Event) {
  if (props.disable || props.loading)
    return
  const value = isActive.value ? props.inactiveValue : props.activeValue
  updateType = 'click'
  emit('update:modelValue', value)
  emit('change', value, event)
}

watch(
  () => props.modelValue,
  (v) => {
    if (updateType === 'click')
      updateType = ''

    else
      emit('change', v)
  },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-switch`
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
  <view :class="classes" :style="style" @click="(onClick as any)">
    <view class="nut-switch-button">
      <slot v-if="loading" name="icon">
        <NutIcon name="loading1" :custom-color="activeColor" />
      </slot>
      <template v-if="activeText">
        <view v-show="isActive" class="nut-switch-label open">
          {{ activeText }}
        </view>
        <view v-show="!isActive" class="nut-switch-label close">
          {{ inactiveText }}
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
