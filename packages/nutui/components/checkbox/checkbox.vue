<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed, defineComponent, reactive, toRef, useSlots, watch } from 'vue'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { useInject } from '../_hooks'
import { getMainClass, pxCheck } from '../_utils'
import { useFormDisabled } from '../form/form'
import NutIcon from '../icon/icon.vue'
import { CHECKBOX_KEY, checkboxEmits, checkboxProps } from './checkbox'

const props = defineProps(checkboxProps)

const emit = defineEmits(checkboxEmits)

const slots = useSlots()

const disabled = useFormDisabled(toRef(props, 'disabled'))

const { parent } = useInject<{
  value: ComputedRef<any[]>
  disabled: ComputedRef<boolean | undefined>
  max: ComputedRef<number>
  updateValue: (value: any[]) => void
}>(CHECKBOX_KEY)

const state = reactive({
  partialSelect: props.indeterminate,
})

function isCheckedValue<T>(value: T) {
  return value === props.checkedValue
}

const innerChecked = computed(() => {
  if (parent != null)
    return parent.value.value.includes(props.label)

  return isCheckedValue(props.modelValue)
})

const innerDisabled = computed(() => {
  if (parent != null && parent.disabled.value != null)
    return parent.disabled.value

  return disabled.value
})

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--reverse`]: props.textPosition === 'left',
  })
})

const iconClasses = computed(() => {
  return {
    [`${componentName}__icon`]: true,
    [`${componentName}__icon--disabled`]: innerDisabled.value,
    // TODO 2.x移除
    [`${componentName}__icon--disable`]: innerDisabled.value,
    [`${componentName}__icon--indeterminate`]: state.partialSelect,
    [`${componentName}__icon--unchecked`]: !innerChecked.value,
  }
})

const labelClasses = computed(() => {
  return {
    [`${componentName}__label`]: true,
    [`${componentName}__label--disabled`]: innerDisabled.value,
  }
})

const buttonClasses = computed(() => {
  return {
    [`${componentName}__button`]: true,
    [`${componentName}__button--active`]: innerChecked.value,
    [`${componentName}__button--disabled`]: innerDisabled.value,
  }
})

let updateSource: '' | 'click' = ''

function emitClickChange(checked: boolean, value: any) {
  updateSource = 'click'

  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, checked, value)
}

watch(() => props.modelValue, (value) => {
  if (updateSource === 'click') {
    updateSource = ''
    return
  }

  if (parent == null)
    emit(CHANGE_EVENT, isCheckedValue(value), value)
})

function handleClick() {
  if (innerDisabled.value)
    return

  if (parent != null) {
    const values = parent.value.value
    const max = parent.max.value

    const index = values.indexOf(props.label)

    if (index >= 0) {
      values.splice(index, 1)

      emitClickChange(false, props.label)
    }
    else {
      if (max <= 0 || values.length < max) {
        values.push(props.label)

        emitClickChange(true, props.label)
      }
    }

    parent.updateValue(values)
  }
  else {
    if (innerChecked.value && !state.partialSelect)
      emitClickChange(false, props.uncheckedValue)
    else
      emitClickChange(true, props.checkedValue)
  }

  if (state.partialSelect)
    state.partialSelect = false
}

watch(() => props.indeterminate, (value) => {
  state.partialSelect = value
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-checkbox`

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
  <view :class="classes" :style="props.customStyle" @click="handleClick">
    <view v-if="props.shape === 'button'" :class="buttonClasses">
      <slot />
    </view>

    <template v-else>
      <template v-if="state.partialSelect">
        <slot v-if="slots.indeterminate" name="indeterminate" />

        <NutIcon
          v-else
          :custom-class="iconClasses"
          name="check-disabled"
          :size="pxCheck(props.iconSize)"
          :width="pxCheck(props.iconSize)"
          :height="pxCheck(props.iconSize)"
        />
      </template>

      <template v-else-if="!innerChecked">
        <slot v-if="slots.icon" name="icon" />

        <NutIcon
          v-else
          :custom-class="iconClasses"
          name="check-normal"
          :size="pxCheck(props.iconSize)"
          :width="pxCheck(props.iconSize)"
          :height="pxCheck(props.iconSize)"
        />
      </template>

      <template v-else>
        <slot v-if="slots.checkedIcon" name="checkedIcon" />

        <NutIcon
          v-else
          :custom-class="iconClasses"
          name="checked"
          :size="pxCheck(props.iconSize)"
          :width="pxCheck(props.iconSize)"
          :height="pxCheck(props.iconSize)"
        />
      </template>

      <view :class="labelClasses">
        <slot />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
