<script setup lang="ts">
import type { InputOnInputEvent } from '@uni-helper/uni-app-types'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { useTranslate } from '../../locale'
import NutInputNumber from '../inputnumber/inputnumber.vue'
import { ecardEmits, ecardProps } from './ecard'
import type { EcardDataItem, EcardDataValue, EcardUpdateOptions } from './type'

const props = defineProps(ecardProps)

const emit = defineEmits(ecardEmits)

const innerValue = ref<EcardDataValue>(0)

const currentIndex = ref<number | null>(null)

const inputValue = ref<string>('')

const innerCount = ref<number>(props.cardBuyMin)

const finalValue = computed(() => {
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
  innerCount.value = props.cardBuyMin

  emit('change', item)

  emit(UPDATE_MODEL_EVENT, finalValue.value)
  emit('update', finalValue.value)
}

function handleInputValue(value: number) {
  if (value > Number(props.cardAmountMax))
    return props.cardAmountMax

  if (value < Number(props.cardAmountMin))
    return props.cardAmountMin

  return value
}

function handleInputClick() {
  emit('inputClick')

  if (currentIndex.value === -1)
    return

  innerValue.value = 0
  currentIndex.value = -1

  forceUpdateInputValue('')
  innerCount.value = props.cardBuyMin

  emit(UPDATE_MODEL_EVENT, finalValue.value)
  emit('update', finalValue.value)
}

function handleInputChange(event: InputOnInputEvent) {
  const value = Number(event.detail.value.replace(/\D/g, ''))

  const valued = handleInputValue(value)
  const stringValued = String(valued)

  forceUpdateInputValue(stringValued)
  innerValue.value = valued

  emit('inputChange', stringValued)

  emit(UPDATE_MODEL_EVENT, finalValue.value)
  emit('update', finalValue.value)
}

function handleStepChange(value: number | string) {
  innerCount.value = Number(value)

  emit('changeStep', innerCount.value, innerValue.value)

  emit(UPDATE_MODEL_EVENT, finalValue.value)
  emit('update', finalValue.value)
}

function update(options: EcardUpdateOptions) {
  const { index, input, count } = options

  if (index !== undefined) {
    if (index != null && (index < -1 || index >= props.list.length))
      return

    currentIndex.value = index

    if (index == null || index === -1) {
      if (input != null) {
        innerValue.value = Number(input)
        forceUpdateInputValue(input)
      }
    }
    else {
      innerValue.value = props.list[index].price
      forceUpdateInputValue('')
    }
  }

  if (count != null)
    innerCount.value = count

  emit(UPDATE_MODEL_EVENT, finalValue.value)
  emit('update', finalValue.value)
}

defineExpose({
  update,
})
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
        <view>{{ props.suffix }}{{ props.modelValue }}</view>

        <NutInputNumber
          :model-value="innerCount"
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
