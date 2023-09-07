<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { PREFIX } from '../../_constants'

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
  <view class="nut-sku-select">
    <view v-for="(item, index) in skuInfo" :key="item.id" class="nut-sku-select-item">
      <view class="nut-sku-select-item-title">
        {{ item.name }}
      </view>
      <view class="nut-sku-select-item-skus">
        <view
          v-for="(itemAttr, itemAttrIndex) in item.list" :key="itemAttr.name" class="nut-sku-select-item-skus-sku"
          :class="[{ active: !itemAttr.disable && itemAttr.active }, { disable: itemAttr.disable }]"
          @click="changeSaleChild(itemAttr, itemAttrIndex, item, index)"
        >
          {{ itemAttr.name }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.nut-theme-dark {
  .nut-sku {
    &-select {
      &-item {
        &-title {
          color: $dark-color;
        }

        &-skus {
          &-sku {
            color: $dark-color;
            background: $dark-background2;
          }
        }
      }
    }
  }
}

.nut-sku {
  &-select {
    &-item {
      display: flex;
      flex-direction: column;

      &-title {
        height: 13px;
        margin-bottom: $sku-spec-title-margin-bottom;
        font-size: $sku-spec-title-font-size;
        font-weight: $sku-spec-title-font-weight;
        color: $sku-spec-title-color;
      }

      &-skus {
        display: flex;
        flex-wrap: wrap;

        &-sku {
          flex-shrink: 0;
          height: $sku-spec-height;
          padding: $sku-spec-padding;
          margin-right: $sku-spec-margin-right;
          margin-bottom: 12px;
          font-size: $sku-spec-font-size;
          line-height: $sku-spec-line-height;
          color: $sku-spec-color;
          background: $sku-spec-background;
          border: 1px solid rgb(242 242 242 / 100%);
          border-radius: 15px;

          &.active {
            position: relative;
            color: $primary-color;
            background: transparent;
            border: $sku-item-border;

            &::after {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              content: '';
              background-color: $sku-item-active-bg;
              border-radius: 15px;
              opacity: 0.15;
            }
          }

          &.disable {
            color: $text-color;
            text-decoration: $sku-item-disable-line;
          }
        }
      }
    }
  }

}
</style>
