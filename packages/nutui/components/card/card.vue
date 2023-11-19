<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutPrice from '../price/price.vue'
import NutTag from '../tag/tag.vue'
import { getMainClass } from '../_utils'
import { cardProps } from './card'

const props = defineProps(cardProps)
const classes = computed(() => {
  return getMainClass(props, componentName)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-card`

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
  <div :class="classes" :style="customStyle">
    <div class="nut-card__left">
      <image :src="imgUrl" alt="" />
    </div>
    <div class="nut-card__right">
      <div class="nut-card__right__title">
        {{ title }}
      </div>
      <slot name="prolist" />
      <div v-if="isNeedPrice" class="nut-card__right__price">
        <slot name="price">
          <NutPrice v-if="price" :price="price" />
        </slot>
        <slot name="origin">
          <view class="nut-card__right__price__origin">
            <NutPrice v-if="vipPrice" :price="vipPrice" />
          </view>
        </slot>
      </div>
      <div class="nut-card__right__other">
        <slot name="shopTag">
          <NutTag type="danger">
            {{ shopDesc }}
          </NutTag>
          <NutTag plain>
            {{ delivery }}
          </NutTag>
        </slot>
      </div>
      <div class="nut-card__right__shop">
        <div class="nut-card__right__shop__name">
          {{ shopName }}
        </div>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
