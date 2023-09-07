<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, useSlots } from 'vue'
import { PREFIX } from '../_constants'

const props = defineProps({
  // 底部按钮配置  confirm cart  buy
  btnOptions: {
    type: Array as PropType<string[]>,
    default: () => ['confirm'],
  },

  btnExtraText: {
    type: String,
    default: '',
  },

  // 立即购买文案
  buyText: {
    type: String,
    default: '立即购买',
  },
  // 加入购物车文案
  addCartText: {
    type: String,
    default: '加入购物车',
  },

  confirmText: {
    type: String,
    default: '确定',
  },
})

const emit = defineEmits(['click', 'changeSku', 'changeBuyCount', 'clickBtnOperate'])
const slots = useSlots()

function getBtnDesc(type: string) {
  const mapD: { [props: string]: string } = {
    confirm: props.confirmText,
    cart: props.addCartText,
    buy: props.buyText,
  }

  return mapD[type]
}

const getSlots = (name: string) => slots[name]

function clickBtnOperate(btn: string) {
  emit('clickBtnOperate', btn)
}
</script>

<script  lang="ts">
const componentName = `${PREFIX}-sku-operate`

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
  <view v-if="btnOptions.length > 0" class="nut-sku-operate">
    <view v-if="btnExtraText" class="nut-sku-operate-desc">
      {{ btnExtraText }}
    </view>

    <slot name="operate-btn" />

    <view v-if="!getSlots('operate-btn')" class="nut-sku-operate-btn">
      <view
        v-for="(btn, i) in btnOptions" :key="i" class="nut-sku-operate-btn-item" :class="[`nut-sku-operate-btn-${btn}`]"
        @click="clickBtnOperate(btn)"
      >
        {{ getBtnDesc(btn) }}
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
