<script setup lang="ts">
import { defineComponent, useSlots } from 'vue'
import { useTranslate } from '../../../locale'
import { PREFIX } from '../../_constants'
import { isH5 } from '../../_utils'
import NutPrice from '../../price/price.vue'

const props = defineProps({
  goods: {
    type: Object,
    default: () => { },
  },
})

const slots = useSlots()
const getSlots = (name: string) => slots[name]
</script>

<script  lang="ts">
const componentName = `${PREFIX}-sku-header`
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
  <view class="nut-sku-header">
    <image v-if="!isH5" class="nut-sku-header-img" :src="goods.imagePath" />
    <image v-else class="nut-sku-header-img" :src="goods.imagePath" />
    <view class="nut-sku-header-right">
      <slot name="sku-header-price">
        <NutPrice :price="goods.price" :need-symbol="true" :thousands="false" />
      </slot>
      <!-- TODO 没救了，uniapp的slot问题太多了 https://github.com/dcloudio/uni-app/issues/4229 -->

      <slot name="sku-header-extra">
        <view class="nut-sku-header-right-extra">
          {{ translate('skuId')
          }}&nbsp;:&nbsp;{{ goods.skuId }}
        </view>
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
.nut-sku {
  &-header {
    display: flex;
    flex-shrink: 0;
    height: 100px;
    padding: 0 18px;
    margin-top: 18px;

    .nut-sku-header-img {
      flex-shrink: 0;
      width: $sku-product-img-width;
      height: $sku-product-img-height;
      margin-right: 12px;
      border-radius: $sku-product-img-border-radius;
    }

    &-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: flex-end;

      &-extra {
        font-size: 12px;
        color: $text-color;
      }
    }
  }
}
</style>
