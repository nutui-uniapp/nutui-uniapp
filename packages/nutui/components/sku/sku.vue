<script setup lang="ts">
import { computed, defineComponent, ref, useSlots, watch } from 'vue'
import { CLOSE_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { useTranslate } from '../../locale'
import NutPopup from '../popup/popup.vue'
import SkuHeader from '../skuheader/skuheader.vue'
import SkuOperate from '../skuoperate/skuoperate.vue'
import SkuSelect from '../skuselect/skuselect.vue'
import SkuStepper from '../skustepper/skustepper.vue'
import { skuEmits, skuProps } from './sku'

const props = defineProps(skuProps)

const emit = defineEmits(skuEmits)

defineExpose({
  resetCount,
})

const slots = useSlots()
const showPopup = ref(props.visible)
const skuStepperRef = ref()
const goodsCount = ref(props.stepperMin)
const classes = computed(() => {
  return getMainClass(props, componentName)
})
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
    emit(CLOSE_EVENT)

  showPopup.value = false
}

function close() {
  emit(UPDATE_VISIBLE_EVENT, false)
}

function resetCount() {
  skuStepperRef.value.reset()
}

const getSlots = (name: string) => slots[name]

const hasSkuOperateSlot = getSlots('skuOperate') != null
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
    safe-area-inset-bottom
    position="bottom"
    closeable
    round
    custom-style="height: 75%"
    @click-close-icon="closePopup('icon')"
    @click-overlay="closePopup('overlay')"
    @close="closePopup('close')"
  >
    <view :class="classes" :style="customStyle">
      <slot name="skuHeader">
        <SkuHeader :goods="goods">
          <template v-if="getSlots('skuHeaderPrice')" #skuHeaderPrice>
            <slot name="skuHeaderPrice" />
          </template>

          <template v-if="getSlots('skuHeaderExtra')" #skuHeaderExtra>
            <slot name="skuHeaderExtra" />
          </template>
        </SkuHeader>
      </slot>

      <scroll-view scroll-y class="nut-sku-content">
        <view class="nut-sku-content-wrapper">
          <slot name="skuSelectTop" />

          <slot name="skuSelect" />
          <SkuSelect v-if="!getSlots('sku-select')" :sku="sku" @select-sku="selectSku" />

          <slot name="skuStepper">
            <SkuStepper
              ref="skuStepperRef"
              :goods="goods"
              :stepper-title="stepperTitle || translate('buyNumber')"
              :stepper-max="stepperMax"
              :stepper-min="stepperMin"
              :stepper-extra-text="stepperExtraText"
              @add="add"
              @reduce="reduce"
              @change-stepper="changeStepper"
              @over-limit="stepperOverLimit"
            />
          </slot>

          <slot name="skuStepperBottom" />
        </view>
      </scroll-view>

      <SkuOperate
        :btn-extra-text="btnExtraText"
        :btn-options="btnOptions"
        :buy-text="buyText || translate('buyNow')"
        :add-cart-text="addCartText || translate('addToCart')"
        :confirm-text="confirmText || translate('confirm')"
        :show-default-operate="!hasSkuOperateSlot"
        @click-btn-operate="clickBtnOperate"
      >
        <template #operateBtn>
          <slot name="skuOperate" />
        </template>
      </SkuOperate>
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import './index';
</style>
