<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { CLICK_EVENT } from '../_constants'

const COMPONENT_NAME = 'nut-sku-operate'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

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
  showDefaultOperate: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits([CLICK_EVENT, 'changeSku', 'changeBuyCount', 'clickBtnOperate'])

const buttonTextMap = computed<Record<string, string>>(() => {
  return {
    confirm: props.confirmText,
    cart: props.addCartText,
    buy: props.buyText,
  }
})

function handleButtonClick(button: string) {
  emit('clickBtnOperate', button)
}
</script>

<template>
  <view v-if="props.btnOptions.length > 0" class="nut-sku-operate">
    <view v-if="props.btnExtraText" class="nut-sku-operate-desc">
      {{ props.btnExtraText }}
    </view>

    <slot name="operateBtn" />

    <view v-if="props.showDefaultOperate" class="nut-sku-operate-btn">
      <view
        v-for="(item, index) in props.btnOptions"
        :key="index"
        class="nut-sku-operate-btn-item"
        :class="[`nut-sku-operate-btn-${item}`]"
        @click="handleButtonClick(item)"
      >
        {{ buttonTextMap[item] }}
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
