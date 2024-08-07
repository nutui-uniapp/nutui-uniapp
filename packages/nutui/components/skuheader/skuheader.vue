<script lang="ts" setup>
import { useSlots } from 'vue'
import NutPrice from '../price/price.vue'
import { useTranslate } from '../../locale'

const COMPONENT_NAME = 'nut-sku-header'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps({
  /**
   * @description 商品
   */
  goods: {
    type: Object,
    default: () => ({}),
  },
})

const slots = useSlots()

const { translate } = useTranslate(COMPONENT_NAME)
</script>

<template>
  <view class="nut-sku-header">
    <image class="nut-sku-header-img" :src="props.goods.imagePath" />

    <view class="nut-sku-header-right">
      <slot v-if="slots.skuHeaderPrice" name="skuHeaderPrice" />

      <NutPrice
        v-else
        :price="props.goods.price"
        :need-symbol="true"
        :thousands="false"
      />

      <slot v-if="slots.skuHeaderExtra" name="skuHeaderExtra" />

      <template v-else>
        <view v-if="props.goods.skuId" class="nut-sku-header-right-extra">
          {{ translate('skuId') }}&nbsp;:&nbsp;{{ props.goods.skuId }}
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
