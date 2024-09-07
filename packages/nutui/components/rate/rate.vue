<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, toRef } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass, pxCheck } from '../_utils'
import { useFormContext, useFormDisabled } from '../form'
import { useFormItemContext } from '../formitem'
import NutIcon from '../icon/icon.vue'
import { rateEmits, rateProps } from './rate'

const COMPONENT_NAME = 'nut-rate'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(rateProps)

const emit = defineEmits(rateEmits)

const formContext = useFormContext()
const formItemContext = useFormItemContext()
const disabled = useFormDisabled(formContext, toRef(props, 'disabled'))

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const innerValue = computed(() => Number(props.modelValue))
const innerValueP1 = computed(() => innerValue.value + 1)

const innerCount = computed(() => Number(props.count))

const itemClasses = computed(() => {
  return {
    'nut-rate-item--disabled': disabled.value,
  }
})

function getItemStyles(index: number) {
  const style: CSSProperties = {}

  if (index < innerCount.value) {
    if (props.spacing != null) {
      style.marginRight = pxCheck(props.spacing)
    }
  }

  return style
}

function getFullIconClasses(index: number) {
  return {
    'nut-rate-item__icon': true,
    'nut-rate-item__icon--void': index > innerValue.value,
  }
}

function getHalfIconClasses(active: boolean) {
  return {
    'nut-rate-item__icon': true,
    'nut-rate-item__icon--void': !active,
  }
}

function updateValue(value: number) {
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)

  if (formItemContext !== undefined && formItemContext.triggers.value.change)
    formItemContext.validate('change')
}

function onClick(source: 'half' | 'full', index: number) {
  if (disabled.value || props.readonly)
    return

  const finalValue = props.allowHalf && source === 'half' ? index - 0.5 : index

  if (finalValue === innerValue.value)
    return

  updateValue(finalValue)
}
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view
      v-for="it in innerCount"
      :key="it"
      class="nut-rate-item"
      :class="itemClasses"
      :style="getItemStyles(it)"
    >
      <view class="nut-rate-item__icon--full" @click="onClick('full', it)">
        <NutIcon
          :custom-class="getFullIconClasses(it)"
          :name="props.customIcon"
          :size="props.size"
          :custom-color="it <= innerValue ? props.activeColor : props.voidColor"
        />
      </view>

      <view v-if="props.allowHalf" class="nut-rate-item__icon--half" @click="onClick('half', it)">
        <NutIcon
          v-if="it < innerValueP1"
          :custom-class="getHalfIconClasses(true)"
          :name="props.customIcon"
          :size="props.size"
          :custom-color="props.activeColor"
        />

        <NutIcon
          v-else
          :custom-class="getHalfIconClasses(false)"
          :name="props.customIcon"
          :size="props.size"
          :custom-color="props.voidColor"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
