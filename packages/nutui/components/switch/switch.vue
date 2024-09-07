<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, watch } from 'vue'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import { useFormDisabled } from '../form/form'
import NutIcon from '../icon/icon.vue'
import { switchEmits, switchProps } from './switch'

const props = defineProps(switchProps)

const emit = defineEmits(switchEmits)

const legacyDisabled = computed(() => props.disabled || props.disable)
const disabled = useFormDisabled(legacyDisabled)

const isActive = computed(() => props.modelValue === props.activeValue)
const classes = computed(() => {
  return getMainClass(props, componentName, {
    [isActive.value ? 'nut-switch-open' : 'nut-switch-close']: true,
    [`${componentName}-disabled`]: disabled.value,
    [`${componentName}-base`]: true,
  })
})

const styles = computed(() => {
  const obj: CSSProperties = {
    backgroundColor: isActive.value ? props.activeColor : props.inactiveColor,
  }
  return getMainStyle(props, obj)
})

let updateType = ''

function onClick(event: Event) {
  if (disabled.value || props.loading)
    return
  const value = isActive.value ? props.inactiveValue : props.activeValue
  updateType = 'click'
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value, event)
}

watch(
  () => props.modelValue,
  (v) => {
    if (updateType === 'click')
      updateType = ''

    else
      emit(CHANGE_EVENT, v)
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
  <view :class="classes" :style="styles" @click="(onClick as any)">
    <view class="nut-switch-button">
      <slot v-if="loading" name="icon">
        <NutIcon name="loading1" :custom-color="activeColor" />
      </slot>
      <template v-if="activeText">
        <view class="nut-switch-label open" :class="{ 'nut-hidden': !isActive }">
          {{ activeText }}
        </view>
        <view class="nut-switch-label close" :class="{ 'nut-hidden': isActive }">
          {{ inactiveText }}
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
