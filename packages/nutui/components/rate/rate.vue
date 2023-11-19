<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { getMainClass, pxCheck } from '../_utils'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT, refRandomId } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { rateEmits, rateProps } from './rate'

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)

const rateRefs = ref<HTMLElement[]>([])
const classes = computed(() => {
  return getMainClass(props, componentName)
})
function updateVal(value: number) {
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)
}
function onClick(e: number, index: number) {
  if (props.disabled || props.readonly)
    return
  let value = 0
  if (index === 1 && props.modelValue === index) {
    //
  }
  else {
    value = index
    if (props.allowHalf && e === 2)
      value -= 0.5
  }
  updateVal(value)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-rate`

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
  <view :class="classes" :style="customStyle">
    <view
      v-for="n in Number(count)" :id="`rateRefs-${refRandomId}${n}`" :key="n" ref="rateRefs" class="nut-rate-item"
      :style="n < Number(count) ? { marginRight: pxCheck(spacing!) } : {}"
    >
      <view class="nut-rate-item__icon--full" @click="onClick(1, n)">
        <NutIcon :size="size" :custom-class="`nut-rate-item__icon ${disabled || n > +modelValue ? 'nut-rate-item__icon--disabled' : ''}`" :name="customIcon" :custom-color="n <= +modelValue ? activeColor : voidColor" />
      </view>
      <view v-if="allowHalf && Number(modelValue) + 1 > n" class="nut-rate-item__icon--half" @click="onClick(2, n)">
        <NutIcon :size="size" custom-class="nut-rate-item__icon" :name="customIcon" :custom-color="n <= Number(modelValue) + 1 ? activeColor : voidColor" @click="onClick(2, n)" />
      </view>
      <view v-else-if="allowHalf && Number(modelValue) + 1 < n" class="nut-rate-item__icon--half" @click="onClick(2, n)">
        <NutIcon :size="size" :name="customIcon" custom-class="nut-rate-item__icon nut-rate-item__icon--disabled" :custom-color="voidColor" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
