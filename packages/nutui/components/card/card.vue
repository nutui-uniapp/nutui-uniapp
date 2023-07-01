<script setup lang="ts">
import { defineComponent, useSlots } from 'vue'
import { PREFIX } from '../_utils'
import NutPrice from '../price/price.vue'
import NutTag from '../tag/tag.vue'
import { cardProps } from './card'

const props = defineProps(cardProps)
const slots = useSlots()
function isHaveSlot(slot: string) {
  return slots[slot]
}
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
  <div class="nut-card" :class="customClass" :style="customStyle">
    <div class="nut-card__left">
      <img :src="imgUrl" alt="">
    </div>
    <div class="nut-card__right">
      <div class="nut-card__right__title">
        {{ title }}
      </div>
      <slot name="prolist" />
      <div v-if="isNeedPrice" class="nut-card__right__price">
        <template v-if="isHaveSlot('price')">
          <slot name="price" />
        </template>
        <NutPrice v-else :price="price" />
        <template v-if="isHaveSlot('origin')">
          <slot name="origin" />
        </template>
        <NutPrice v-else custom-class="nut-card__right__price__origin" :price="vipPrice" />
        <template v-if="isHaveSlot('tag')">
          <slot name="tag" />
        </template>
      </div>
      <div class="nut-card__right__other">
        <template v-if="isHaveSlot('shop-tag')">
          <slot name="shop-tag" />
        </template>
        <template v-else>
          <NutTag type="danger">
            {{ shopDesc }}
          </NutTag>
          <NutTag plain>
            {{ delivery }}
          </NutTag>
        </template>
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
