<script setup lang="ts">
import { type Ref, computed, defineComponent, ref, watch } from 'vue'
import type { InputOnFocusEvent } from '@uni-helper/uni-app-types'
import { PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import NutInputNumber from '../inputnumber/inputnumber.vue'
import { getMainClass } from '../_utils'
import { ecardEmits, ecardProps } from './ecard'

const props = defineProps(ecardProps)

const emit = defineEmits(ecardEmits)
const currentIndex: Ref<number | null | string> = ref(null)
const currentValue: Ref<number | null | string> = ref(null)
const inputValue: Ref<string | undefined | number> = ref()
const stepValue: Ref<number> = ref(props.cardAmountMin)
const money: Ref<number | string | undefined> = ref(props.modelValue)
const classes = computed(() => {
  return getMainClass(props, componentName)
})
function handleClick(item: { price: number | string }, index: number) {
  currentIndex.value = index
  inputValue.value = ''
  stepValue.value = props.cardAmountMin
  currentValue.value = item.price
  emit('change', item)
}
function change(event: InputOnFocusEvent) {
  const input = event.detail
  const val = input.value.replace(/[^\d]/g, '')
  inputValue.value = val
  currentValue.value = val
  if (Number(val) > props.cardAmountMax) {
    inputValue.value = props.cardAmountMax
    currentValue.value = props.cardAmountMax
  }
  if (Number(val) < props.cardAmountMin) {
    inputValue.value = props.cardAmountMin
    currentValue.value = props.cardAmountMin
  }
  emit('inputChange', Number(inputValue.value))
}
function inputClick() {
  currentIndex.value = 'input'
  stepValue.value = props.cardAmountMin
  emit(UPDATE_MODEL_EVENT, 0)
  emit('inputClick')
}
function changeStep(value: number) {
  stepValue.value = value

  emit('changeStep', stepValue.value, currentValue.value!) // 返回数量, 返回当前选中值
}
watch(
  () => props.modelValue,
  (value) => {
    money.value = value
  },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-ecard`
const { translate } = useTranslate(componentName)

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
    <view class="nut-ecard__title">
      {{ chooseText || translate('chooseText') }}
    </view>
    <view class="nut-ecard__list">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="nut-ecard__list__item" :class="[currentIndex === index ? 'active' : '']"
        @click="handleClick(item, index)"
      >
        {{ item.price }}
      </view>
      <view class="nut-ecard__list__input" :class="[currentIndex === 'input' ? 'active' : '']" @click="inputClick">
        <view>{{ otherValueText || translate('otherValueText') }}</view>
        <view class="nut-ecard__list__input--con">
          <input
            :value="inputValue as string"
            type="text"
            class="nut-ecard-input"
            :placeholder="placeholder || translate('placeholder')"
            @input="change"
          >
          {{ suffix }}
        </view>
      </view>
      <view class="nut-ecard__list__step">
        <view>{{ suffix }}{{ money }}</view>
        <NutInputNumber v-model="stepValue" :min="cardBuyMin" :max="cardBuyMax" @change="(changeStep as any)" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
