<script lang="ts" setup>
import { computed, ref } from 'vue'
import { CHANGE_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { categoryEmits, categoryProps } from './category'

const COMPONENT_NAME = 'nut-category'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(categoryProps)

const emit = defineEmits(categoryEmits)

const checkIndex = ref(0)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

function getChildList(index: any) {
  checkIndex.value = index

  emit(CHANGE_EVENT, index)
}
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view class="nut-category__cateList">
      <view v-if="props.type === 'classify' || props.type === 'text'">
        <view v-for="(item, index) in props.category" :key="index" class="nut-category__cateListLeft">
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
@import "./index";
</style>
