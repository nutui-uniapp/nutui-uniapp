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
  <div :class="classes">
    <div v-if="type === 'classify'" class="nut-category-pane__cateListRight">
      <div v-for="(item, index) in categoryChild" :key="index">
        <div class="nut-category-pane__childTitle">
          {{ item?.catName }}
        </div>

        <div v-if="item?.catType === 1" class="nut-category-pane__childItemList">
          <div
            v-for="(sku, key) in item.childCateList"
            :key="key"
            class="nut-category-pane__childItem"
            @click="onChange(sku)"
          >
            <image class="nut-category-pane__childImg" :src="sku.backImg" />
            <div class="nut-category-pane__skuImg">
              {{ sku?.catName }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- text -->
    <div v-if="type === 'text'" class="nut-category-pane__cateListRight">
      <div v-for="(item, index) in categoryChild" :key="index">
        <div class="nut-category-pane__childTitle">
          {{ item?.catName }}
        </div>

        <div v-if="item?.catType === 1" class="nut-category-pane__childItemList">
          <div
            v-for="(sku, key) in item.childCateList"
            :key="key"
            class="nut-category-pane__childItem"
            @click="onChange(sku)"
          >
            <div class="nut-category-pane__skuName">
              {{ sku?.catName }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 自定义 -->

    <div v-if="type === 'custom'" class="nut-category-pane__selfItemList">
      <div v-for="(sku, key) in customCategory" :key="key" class="nut-category-pane__skuName" @click="onChange(sku)">
        {{ sku?.catName }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
