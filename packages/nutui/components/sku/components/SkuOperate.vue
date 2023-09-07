<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, useSlots } from 'vue'
import { PREFIX } from '../../_constants'

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
    <slot name="operate-btn">
      <view class="nut-sku-operate-btn">
        <view
          v-for="(btn, i) in btnOptions" :key="i" class="nut-sku-operate-btn-item" :class="[`nut-sku-operate-btn-${btn}`]"
          @click="clickBtnOperate(btn)"
        >
          {{ getBtnDesc(btn) }}
        </view>
      </view>
    </slot>
  </view>
</template>

<style lang="scss">
.nut-theme-dark {
  .nut-sku {
    &-operate {
      &-btn {
        background: $dark-background2;
      }
    }
  }
}

.nut-sku{
    &-operate {
    width: 100%;

    &-desc {
      display: block;
      width: 100%;
      padding: 10px 0;
      font-size: 12px;
      color: #de6a1c;
      text-align: center;
      background: #fbf9da;
    }

    &-btn {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: $sku-operate-btn-height;
      padding: 0 18px;
      text-align: center;
      background: $white;
      border-top: $sku-operate-btn-border-top;

      &-item {
        width: 100%;
        height: $sku-operate-btn-item-height;
        margin-right: 18px;
        font-size: $sku-operate-btn-item-font-size;
        font-weight: $sku-operate-btn-item-font-weight;
        line-height: $sku-operate-btn-item-line-height;
        color: $white;
        background: $sku-opetate-bg-default;
        border-radius: 21px;

        &:last-child {
          margin-right: 0;
        }
      }

      &-buy {
        background: $sku-opetate-bg-buy;
      }
    }
  }
}
</style>
