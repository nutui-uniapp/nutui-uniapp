<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { CHANGE_EVENT, PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { categoryEmits, categoryProps } from './category'

const props = defineProps(categoryProps)
const emit = defineEmits(categoryEmits)
const checkIndex = ref(0)
const classes = computed(() => {
  return getMainClass(props, componentName)
})
function getChildList(index: any) {
  checkIndex.value = index
  emit(CHANGE_EVENT, index)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-category`

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
  <view :class="classes" :style="customStyle">
    <view class="nut-category__cateList">
      <view v-if="type === 'classify' || type === 'text'" class="nut-category__cateListBox">
        <view v-for="(item, index) in category" :key="index" class="nut-category__cateListLeft">
          <view
            :class="[checkIndex === index ? 'nut-category__cateListItemChecked' : 'nut-category__cateListItem']"
            @click="getChildList(index)"
          >
            {{ item.catName }}
          </view>
        </view>
      </view>

      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
