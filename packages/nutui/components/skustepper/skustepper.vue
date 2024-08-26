<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import NutInputNumber from '../inputnumber/inputnumber.vue'
import { TypeOfFun } from '../_utils'

const COMPONENT_NAME = 'nut-sku-stepper'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  // 购买数量最小值
  stepperMin: {
    type: [Number, String],
    default: 1,
  },
  stepperMax: {
    type: [Number, String],
    default: 99999,
  },
  // stepper 前文案提示
  stepperExtraText: {
    type: [Function, Boolean],
    default: false,
  },
  // 数量选择左侧文案
  stepperTitle: {
    type: String,
    default: '购买数量',
  },
})

const emit = defineEmits(['click', 'changeSku', 'changeStepper', 'clickBtnOptions', 'overLimit', 'reduce', 'add'])

const innerCount = ref(props.stepperMin)

onMounted(() => {
  innerCount.value = props.stepperMin
})

const extraText = computed(() => {
  const { stepperExtraText } = props

  if (stepperExtraText && TypeOfFun(stepperExtraText) === 'function')
    return (stepperExtraText as any)()

  return ''
})

// 修改购买数量 add 加  reduce 减
function add(value: any) {
  emit('add', value.detail.vlaue)
}

function reduce(value: any) {
  emit('reduce', value.detail.vlaue)
}

// stepper 极限值
function overlimit(e: Event, action: string) {
  emit('overLimit', {
    action,
    value: Number.parseInt(`${innerCount.value}`),
  })
}

// stepper 发生了改变
function changeStepper(value: number) {
  innerCount.value = value

  emit('changeStepper', value)
}

// 重置值
function reset() {
  innerCount.value = props.stepperMin
}

defineExpose({
  reset,
})
</script>

<template>
  <view class="nut-sku-stepper">
    <view class="nut-sku-stepper-title">
      {{ props.stepperTitle }}
    </view>

    <rich-text class="nut-sku-stepper-limit" :nodes="extraText" />

    <view class="nut-sku-stepper-count">
      <NutInputNumber
        v-model="innerCount"
        :min="props.stepperMin"
        :max="props.stepperMax"
        @add="(add as any)"
        @reduce="(reduce as any)"
        @overlimit="overlimit"
        @change="(changeStepper as any)"
      />
    </view>
  </view>
</template>

<style lang="scss">
.nut-theme-dark {
  .nut-sku {
    &-stepper {
      &-title {
        color: $dark-color;
      }

      &-limit {
        color: $dark-color;
      }

      &-count {
        &-lowestBuy {
          color: $primary-color;
        }
      }
    }
  }
}

.nut-sku {
  &-stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 30px;
    margin: 10px 0 30px;

    &-title {
      margin-right: 12px;
      font-size: 13px;
      font-weight: bold;
      color: $black;
    }

    &-limit,
    rich-text {
      display: flex;
      flex: 1;
      align-items: center;
      font-size: 12px;
      color: $text-color;
    }

    &-count {
      display: flex;
      align-items: center;

      &-lowestBuy {
        font-size: 12px;
        color: $primary-color;
      }
    }
  }
}
</style>
