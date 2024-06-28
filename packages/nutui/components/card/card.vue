<script lang="ts" setup>
import { computed } from 'vue'
import NutPrice from '../price/price.vue'
import NutTag from '../tag/tag.vue'
import { getMainClass } from '../_utils'
import { cardProps } from './card'

const COMPONENT_NAME = 'nut-card'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(cardProps)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view class="nut-card__left">
      <image :src="props.imgUrl" />
    </view>

    <view class="nut-card__right">
      <view class="nut-card__right__title">
        {{ props.title }}
      </view>

      <slot name="prolist" />

      <view v-if="props.isNeedPrice" class="nut-card__right__price">
        <slot name="price">
          <NutPrice v-if="props.price" :price="props.price" />
        </slot>

        <slot name="origin">
          <view class="nut-card__right__price__origin">
            <NutPrice v-if="props.vipPrice" :price="props.vipPrice" />
          </view>
        </slot>
      </view>

      <view class="nut-card__right__other">
        <slot name="shopTag">
          <NutTag type="danger">
            {{ props.shopDesc }}
          </NutTag>

          <NutTag plain>
            {{ props.delivery }}
          </NutTag>
        </slot>
      </view>

      <view class="nut-card__right__shop">
        <slot name="shopName">
          <view class="nut-card__right__shop__name">
            {{ props.shopName }}
          </view>
        </slot>

        <slot name="footer" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
