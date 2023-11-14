<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { CHANGE_EVENT, PREFIX } from '../_constants'
import { categoryEmits, categoryProps } from './category'

defineProps(categoryProps)
const emit = defineEmits(categoryEmits)
const checkIndex = ref(0)

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
  <div class="nut-category">
    <div class="nut-category__cateList">
      <div v-if="type === 'classify' || type === 'text'">
        <div v-for="(item, index) in category" :key="index" class="nut-category__cateListLeft">
          <div
            :class="[checkIndex === index ? 'nut-category__cateListItemChecked' : 'nut-category__cateListItem']"
            @click="getChildList(index)"
          >
            {{ item.catName }}
          </div>
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
