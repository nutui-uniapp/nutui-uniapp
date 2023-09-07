<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { PREFIX } from '../../_constants'
import { TypeOfFun } from '../../_utils'
import NutInputNumber from '../../inputnumber/inputnumber.vue'

const props = defineProps({
  // 购买数量最大值
  stepperMax: {
    type: [Number, String],
    default: 99999,
  },

  stepperMin: {
    type: [Number, String],
    default: 1,
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

const goodsCount = ref(props.stepperMin)

onMounted(() => {
  goodsCount.value = props.stepperMin
})

function getExtraText() {
  const { stepperExtraText } = props

  if (stepperExtraText && TypeOfFun(stepperExtraText) === 'function')
    return (stepperExtraText as () => void)()

  else
    return ''
}

// 修改购买数量 add 加  reduce 减
function add(value: number) {
  emit('add', value)
}

function reduce(value: number) {
  emit('reduce', value)
}

// stepper 极限值
function overlimit(e: Event, action: string) {
  emit('overLimit', {
    action,
    value: Number.parseInt(`${goodsCount.value}`),
  })
}
// stepper 发生了改变
function changeStepper(value: number) {
  goodsCount.value = value

  emit('changeStepper', value)
}
</script>

<script  lang="ts">
const componentName = `${PREFIX}-sku-stepper`

export default defineComponent ({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view class="nut-sku-stepper">
    <view class="nut-sku-stepper-title">
      {{ stepperTitle }}
    </view>
    <view class="nut-sku-stepper-limit" v-html="getExtraText()" />
    <view class="nut-sku-stepper-count">
      <NutInputNumber
        v-model="goodsCount" :min="stepperMin" :max="stepperMax" @add="(add as any)" @reduce="(reduce as any)"
        @overlimit="overlimit" @change="(changeStepper as any)"
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

.nut-sku{
  &-stepper {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 30px;

    &-title {
      margin-right: 12px;
      font-size: 13px;
      font-weight: bold;
      color: $black;
    }

    &-limit,rich-text {
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
