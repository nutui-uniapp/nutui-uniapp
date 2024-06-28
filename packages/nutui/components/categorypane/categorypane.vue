<script lang="ts" setup>
import { computed } from 'vue'
import { getMainClass } from '../_utils'
import { categorypaneEmits, categorypaneProps } from './categorypane'

const COMPONENT_NAME = 'nut-category-pane'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(categorypaneProps)

const emit = defineEmits(categorypaneEmits)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

function onChange(sku: string) {
  emit('onChange', sku)
}
</script>

<template>
  <view :class="classes">
    <view v-if="props.type === 'classify'" class="nut-category-pane__cateListRight">
      <slot />

      <view v-for="(item, index) in props.categoryChild" :key="index">
        <view class="nut-category-pane__childTitle">
          {{ item?.catName }}
        </view>

        <view v-if="item?.catType === 1" class="nut-category-pane__childItemList">
          <view
            v-for="(sku, key) in item.childCateList"
            :key="key"
            class="nut-category-pane__childItem"
            @click="onChange(sku)"
          >
            <image class="nut-category-pane__childImg" :src="sku.backImg" />

            <view class="nut-category-pane__skuImg">
              {{ sku?.catName }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- text -->
    <view v-if="props.type === 'text'" class="nut-category-pane__cateListRight">
      <slot />

      <view v-for="(item, index) in props.categoryChild" :key="index">
        <view class="nut-category-pane__childTitle">
          {{ item?.catName }}
        </view>

        <view v-if="item?.catType === 1" class="nut-category-pane__childItemList">
          <view
            v-for="(sku, key) in item.childCateList"
            :key="key"
            class="nut-category-pane__childItem"
            @click="onChange(sku)"
          >
            <view class="nut-category-pane__skuName">
              {{ sku?.catName }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义 -->

    <view v-if="props.type === 'custom'" class="nut-category-pane__selfItemList">
      <slot />

      <view
        v-for="(sku, key) in props.customCategory"
        :key="key"
        class="nut-category-pane__skuName"
        @click="onChange(sku)"
      >
        {{ sku?.catName }}
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
