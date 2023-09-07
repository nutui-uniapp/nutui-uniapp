<script setup lang="ts">
import { defineComponent, ref, useSlots, watch } from 'vue'
import { PREFIX } from '../_constants'
import NutPopup from '../popup/popup.vue'
import { useTranslate } from '../../locale'
import { skuEmits, skuProps } from './sku'
import SkuStepper from './components/SkuStepper.vue'
import SkuSelect from './components/SkuSelect.vue'
import SkuOperate from './components/SkuOperate.vue'
import SkuHeader from './components/SkuHeader.vue'

const props = defineProps(skuProps)
const emit = defineEmits(skuEmits)
const slots = useSlots()
const showPopup = ref(props.visible)

const goodsCount = ref(props.stepperMin)

watch(
  () => props.visible,
  (value) => {
    showPopup.value = value
  },
)

watch(
  () => showPopup.value,
  (value) => {
    if (value === false)
      close()
  },
)

// 商品规格 sku 选择
function selectSku(skus: any) {
  emit('selectSku', skus)
}

// 数量计步器变化
function changeStepper(value: number) {
  goodsCount.value = value

  emit('changeStepper', value)
}

// 修改购买数量 add 加  reduce 减
function add(value: number) {
  emit('add', value)
}

function reduce(value: number) {
  emit('reduce', value)
}

// 触发极限值
function stepperOverLimit(count: any) {
  emit('overLimit', count)
}

// 点击 button 操作
function clickBtnOperate(btn: string) {
  emit('clickBtnOperate', {
    type: btn,
    value: goodsCount.value,
  })
}

// 关闭
function closePopup(type: string) {
  if (type === 'icon')
    emit('clickCloseIcon')

  if (type === 'overlay')
    emit('clickOverlay')

  if (type === 'close')
    emit('close')

  showPopup.value = false
}

function close() {
  emit('update:visible', false)
}
const getSlots = (name: string) => slots[name]
</script>

<script lang="ts">
const componentName = `${PREFIX}-sku`
const { translate } = useTranslate(componentName)

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
  <NutPopup
    v-model:visible="showPopup"
    safe-area-inset-bottom position="bottom" closeable round custom-style="height: 75%"
    @click-close-icon="closePopup('icon')" @click-overlay="closePopup('overlay')" @close="closePopup('close')"
  >
    <view class="nut-sku">
      <!-- #ifdef MP -->
      <slot name="sku-header" />
      <!-- #endif -->
      <!-- #ifndef MP -->
      <slot name="sku-header">
        <SkuHeader :goods="goods">
          <template #sku-header-price>
            <slot name="sku-header-price" />
          </template>

          <template #sku-header-extra>
            <slot name="sku-header-extra" />
          </template>
        </SkuHeader>
      </slot>

      <!-- #endif -->

      <view class="nut-sku-content">
        <slot name="sku-select-top" />

        <slot name="sku-select" />
        <SkuSelect v-if="!getSlots('sku-select')" :sku="sku" @selectSku="selectSku" />

        <slot name="sku-stepper">
          <SkuStepper
            :goods="goods" :stepper-title="stepperTitle || translate('buyNumber')"
            :stepper-max="stepperMax" :stepper-min="stepperMin" :stepper-extra-text="stepperExtraText" @add="add"
            @reduce="reduce" @changeStepper="changeStepper" @overLimit="stepperOverLimit"
          />
        </slot>

        <slot name="sku-stepper-bottom" />
      </view>

      // #ifdef MP-WEIXIN
      <slot name="sku-operate" />
      // #endif

      // #ifndef MP-WEIXIN
      <SkuOperate
        :btn-extra-text="btnExtraText" :btn-options="btnOptions" :buy-text="buyText || translate('buyNow')"
        :add-cart-text="addCartText || translate('addToCart')" :confirm-text="confirmText || translate('confirm')"
        @clickBtnOperate="clickBtnOperate"
      >
        <template #operate-btn>
          <slot name="sku-operate" />
        </template>
      </SkuOperate>
      // #endif
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import './index';
</style>
