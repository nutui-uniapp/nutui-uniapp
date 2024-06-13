<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed, reactive, toRef, useSlots, watch } from 'vue'
import { getMainClass, pxCheck } from '../_utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { useInject } from '../_hooks'
import { useFormContext, useFormDisabled } from '../form'
import { useFormItemContext } from '../formitem'
import { CHECKBOX_KEY, checkboxEmits, checkboxProps } from './checkbox'

const COMPONENT_NAME = 'nut-checkbox'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(checkboxProps)

const emit = defineEmits(checkboxEmits)

const slots = useSlots()

const formContext = useFormContext()
const formItemContext = useFormItemContext()

const disabled = useFormDisabled(formContext, toRef(props, 'disabled'))

const { parent } = useInject<{
  value: ComputedRef<any[]>
  disabled: ComputedRef<boolean>
  max: ComputedRef<number>
  updateValue: (value: string[]) => void
}>(CHECKBOX_KEY)

const state = reactive({
  partialSelect: props.indeterminate,
})

const hasParent = computed(() => !!parent)

const pValue = computed(() => {
  if (hasParent.value)
    return parent?.value.value.includes(props.label)

  return props.modelValue
})

const pDisabled = computed(() => {
  if (hasParent.value)
    return parent?.disabled.value ? parent.disabled.value : disabled.value

  return disabled.value
})

const checked = computed(() => !!props.modelValue)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--reverse`]: props.textPosition === 'left',
  })
})

const iconClasses = computed(() => {
  if (pDisabled.value)
    return 'nut-checkbox__icon--disable'

  if (state.partialSelect)
    return 'nut-checkbox__icon--indeterminate'

  return pValue.value ? 'nut-checkbox__icon' : 'nut-checkbox__icon--unchecked'
})

const labelClasses = computed(() => {
  return {
    [`${COMPONENT_NAME}__label`]: true,
    [`${COMPONENT_NAME}__label--disabled`]: pDisabled.value,
  }
})

const buttonClasses = computed(() => {
  return {
    [`${COMPONENT_NAME}__button`]: true,
    [`${COMPONENT_NAME}__button--active`]: pValue.value,
    [`${COMPONENT_NAME}__button--disabled`]: pDisabled.value,
  }
})

let updateType = ''

function emitChange(value: string | boolean, label?: string) {
  updateType = 'click'
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value, label!)

  if (!hasParent.value && formItemContext !== undefined && formItemContext.triggers.value.change)
    formItemContext.validate('change')
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

function handleClick() {
  if (pDisabled.value)
    return

  if (checked.value && state.partialSelect) {
    // TODO uniapp小程序拿不到slots的children https://github.com/dcloudio/uni-app/issues/3279
    state.partialSelect = false
    // #ifdef H5
    emitChange(checked.value, slots.default?.()[0].children as string)
    // #endif
    // #ifndef H5
    emitChange(checked.value, props.label)
    // #endif

    return
  }

  // #ifdef H5
  emitChange(!checked.value, slots.default?.()[0].children as string)
  // #endif
  // #ifndef H5
  emitChange(!checked.value, props.label)
  // #endif

  if (hasParent.value) {
    const value = parent?.value.value
    const max = parent?.max.value
    const { label } = props
    const index = value!.indexOf(label)
    if (index > -1)
      value?.splice(index, 1)
    else if (index <= -1 && (value!.length < max! || !max))
      value?.push(label)

    parent?.updateValue(value!)
  }
}

watch(
  () => props.indeterminate,
  (newVal) => {
    state.partialSelect = newVal
  },
)
</script>

<template>
  <view :class="classes" :style="props.customStyle" @click="handleClick">
    <view v-if="props.shape === 'button'" :class="buttonClasses">
      <slot />
    </view>

    <template v-else>
      <slot v-if="state.partialSelect" name="indeterminate">
        <NutIcon
          :custom-class="iconClasses"
          name="check-disabled"
          :size="pxCheck(props.iconSize)"
          :width="pxCheck(props.iconSize)"
          :height="pxCheck(props.iconSize)"
        />
      </slot>

      <slot v-else-if="!pValue" name="icon">
        <NutIcon
          :custom-class="iconClasses"
          name="check-normal"
          :size="pxCheck(props.iconSize)"
          :width="pxCheck(props.iconSize)"
          :height="pxCheck(props.iconSize)"
        />
      </slot>

      <slot v-else name="checkedIcon">
        <NutIcon
          :custom-class="iconClasses"
          name="checked"
          :size="pxCheck(props.iconSize)"
          :width="pxCheck(props.iconSize)"
          :height="pxCheck(props.iconSize)"
        />
      </slot>

      <view :class="labelClasses">
        <slot />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
