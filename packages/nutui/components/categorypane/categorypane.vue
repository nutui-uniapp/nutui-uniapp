<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { categorypaneEmits, categorypaneProps } from './categorypane'

const props = defineProps(categorypaneProps)
const emit = defineEmits(categorypaneEmits)
const classes = computed(() => {
  return getMainClass(props, componentName)
})
function onChange(sku: string) {
  emit('onChange', sku)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-category-pane`

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
  <view :class="classes">
    <view v-if="type === 'classify'" class="nut-category-pane__cateListRight">
      <slot />
      <view v-for="(item, index) in categoryChild" :key="index" class="nut-category-pane__child">
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
    <view v-if="type === 'text'" class="nut-category-pane__cateListRight">
      <slot />
      <view v-for="(item, index) in categoryChild" :key="index" class="nut-category-pane__child">
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

    <view v-if="type === 'custom'" class="nut-category-pane__selfItemList">
      <slot />
      <view
        v-for="(sku, key) in customCategory"
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
@import './index';
</style>
