<script lang="ts" setup>
import { computed, useSlots, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import { useFormContext, useFormDisabled } from '../form'
import { useFormItemContext } from '../formitem'
import NutIcon from '../icon/icon.vue'
import { switchEmits, switchProps } from './switch'

const COMPONENT_NAME = 'nut-switch'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(switchProps)

const emit = defineEmits(switchEmits)

const slots = useSlots()

const legacyDisabled = computed(() => props.disabled || props.disable)

const formContext = useFormContext()
const formItemContext = useFormItemContext()
const disabled = useFormDisabled(formContext, legacyDisabled)

const isActive = computed(() => props.modelValue === props.activeValue)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [isActive.value ? 'nut-switch-open' : 'nut-switch-close']: true,
    [`${COMPONENT_NAME}-disabled`]: disabled.value,
    [`${COMPONENT_NAME}-base`]: true,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    backgroundColor: isActive.value ? props.activeColor : props.inactiveColor,
  })
})

let updateSource: '' | 'click' = ''

function onClick(event: any) {
  if (disabled.value || props.loading)
    return

  const finalValue = isActive.value ? props.inactiveValue : props.activeValue

  updateSource = 'click'

  emit(UPDATE_MODEL_EVENT, finalValue)
  emit(CHANGE_EVENT, finalValue, event)

  if (formItemContext !== undefined && formItemContext.triggers.value.change)
    formItemContext.validate('change')
}

watch(() => props.modelValue, (value) => {
  if (updateSource === 'click') {
    updateSource = ''
    return
  }

  emit(CHANGE_EVENT, value)
})
</script>

<template>
  <view :class="classes" :style="styles" @click="onClick">
    <view class="nut-switch-button">
      <template v-if="props.loading">
        <slot v-if="slots.icon" name="icon" />

        <NutIcon v-else name="loading1" :custom-color="props.activeColor" />
      </template>

      <template v-if="props.activeText">
        <view class="nut-switch-label open" :class="{ 'nut-hidden': !isActive }">
          {{ props.activeText }}
        </view>

        <view class="nut-switch-label close" :class="{ 'nut-hidden': isActive }">
          {{ props.inactiveText }}
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
