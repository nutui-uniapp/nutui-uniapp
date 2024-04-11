<script setup lang="ts">
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import type { InputOnInputEvent } from '@uni-helper/uni-app-types'
import { PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import NutInputNumber from '../inputnumber/inputnumber.vue'
import { getMainClass } from '../_utils'
import { ecardEmits, ecardProps } from './ecard'
import type { EcardDataItem } from './type'

const props = defineProps(ecardProps)

const emit = defineEmits(ecardEmits)

const innerValue = ref<number | null>(null)

const currentIndex = ref<number | null>(null)

const inputValue = ref<string>('')

const innerCount = ref<number>(props.cardAmountMin)

const amountValue = computed(() => {
  return Number(innerValue.value) * innerCount.value
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

async function forceUpdateInputValue(value: string) {
  if (value !== inputValue.value) {
    inputValue.value = value
    return
  }

  inputValue.value = value.slice(0, -1)
  await nextTick()
  inputValue.value = value
}

function handleClick(item: EcardDataItem, index: number) {
  innerValue.value = item.price
  currentIndex.value = index

  forceUpdateInputValue('')
  innerCount.value = props.cardAmountMin

  emit('change', item)
  emit(UPDATE_MODEL_EVENT, innerValue.value)
}

function handleValue(value: number) {
  if (value > props.cardAmountMax)
    return props.cardAmountMax

  if (value < props.cardAmountMin)
    return props.cardAmountMin

  return value
}

function handleInputChange(event: InputOnInputEvent) {
  const value = Number(event.detail.value.replace(/\D/g, ''))

  const valued = handleValue(value)

  forceUpdateInputValue(String(valued))
  innerValue.value = valued

  emit('inputChange', valued)
  emit(UPDATE_MODEL_EVENT, innerValue.value)
}

function handleInputClick() {
  emit('inputClick')

  if (currentIndex.value === -1)
    return

  innerValue.value = 0
  currentIndex.value = -1

  forceUpdateInputValue('')
  innerCount.value = props.cardAmountMin

  emit(UPDATE_MODEL_EVENT, innerValue.value)
}

function handleStepChange(value: number | string) {
  innerCount.value = Number(value)

  emit('changeStep', innerCount.value, innerValue.value)
}

function applyModelValue(value: number | null) {
  innerValue.value = value

  if (value == null) {
    currentIndex.value = null
    forceUpdateInputValue('')
    return
  }

  const index = props.list.findIndex(item => item.price === value)

  if (index < 0) {
    currentIndex.value = -1
    forceUpdateInputValue(String(value))
    return
  }

  currentIndex.value = index
  forceUpdateInputValue('')
}

watch(
  () => props.modelValue,
  (value) => {
    if (value === innerValue.value)
      return

    applyModelValue(value)
  },
  { immediate: true },
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
  <view :class="classes" :style="props.customStyle">
    <view class="nut-ecard__title">
      {{ props.chooseText || translate('chooseText') }}
    </view>

    <view class="nut-ecard__list">
      <view
        v-for="(item, index) in props.list"
        :key="index"
        class="nut-ecard__list__item"
        :class="{ active: currentIndex === index }"
        @click="handleClick(item, index)"
      >
        {{ item.price }}
      </view>

      <view
        v-if="props.showOther"
        class="nut-ecard__list__input"
        :class="{ active: currentIndex === -1 }"
        @click="handleInputClick"
      >
        <view>{{ props.otherValueText || translate('otherValueText') }}</view>

        <view class="nut-ecard__list__input--con">
          <input
            class="nut-ecard-input"
            :value="inputValue as string"
            type="text"
            :placeholder="props.placeholder || translate('placeholder')"
            @input="handleInputChange"
          >
          {{ props.suffix }}
        </view>
      </view>

      <view v-if="props.showStep" class="nut-ecard__list__step">
        <view>{{ props.suffix }}{{ amountValue }}</view>

        <NutInputNumber
          v-model="innerCount"
          :min="props.cardBuyMin"
          :max="props.cardBuyMax"
          @change="handleStepChange"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
