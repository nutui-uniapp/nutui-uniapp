<script setup lang="ts">
import { defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutPrice from '../price/price.vue'
import NutTag from '../tag/tag.vue'
import { cardProps } from './card'

const props = defineProps(cardProps)
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
  <div class="nut-card">
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
          <NutPrice v-if="vipPrice" class="nut-card__right__price__origin" :price="vipPrice" />
        </slot>
      </div>
      <div class="nut-card__right__other">
        <slot name="shop-tag">
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
