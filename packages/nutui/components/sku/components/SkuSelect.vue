<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { PREFIX } from '../../_utils'

interface SkuInfo {
  name: string
  id: number
  active: boolean
  disable: boolean
  [props: string]: any
}
const props = defineProps({
  sku: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['selectSku'])

const skuInfo = ref<SkuInfo[]>([])

watch(
  () => props.sku,
  (value) => {
    skuInfo.value = [].slice.call(value)
  },
  { deep: true },
)

onMounted(() => {
  if (props.sku.length > 0)
    skuInfo.value = [].slice.call(props.sku)
})

// 切换商品 Sku
function changeSaleChild(attrItem: any, index: any, parentItem: any, parentIndex: any) {
  if (attrItem.checkFlag || attrItem.disable)
    return

  emit('selectSku', {
    sku: attrItem,
    skuIndex: index,
    parentSku: parentItem,
    parentIndex,
  })
}
</script>

<script  lang="ts">
const componentName = `${PREFIX}-sku-select`

export default defineComponent ({
  name: componentName,
  options: {
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view class="nut-sku-select">
    <view v-for="(item, index) in skuInfo" :key="item.id" class="nut-sku-select-item">
      <view class="nut-sku-select-item-title">
        {{ item.name }}
      </view>
      <view class="nut-sku-select-item-skus">
        <view
          v-for="(itemAttr, itemAttrIndex) in item.list" :key="itemAttr.name"
          class="nut-sku-select-item-skus-sku" :class="[{ active: !itemAttr.disable && itemAttr.active }, { disable: itemAttr.disable }]"
          @click="changeSaleChild(itemAttr, itemAttrIndex, item, index)"
        >
          {{ itemAttr.name }}
        </view>
      </view>
    </view>
  </view>
</template>
