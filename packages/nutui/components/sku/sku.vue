<script lang="ts" setup>
import { computed, ref, useSlots, watch } from 'vue'
import { CLOSE_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { useTranslate } from '../../locale'
import NutPopup from '../popup/popup.vue'
import SkuHeader from '../skuheader/skuheader.vue'
import SkuOperate from '../skuoperate/skuoperate.vue'
import SkuSelect from '../skuselect/skuselect.vue'
import SkuStepper from '../skustepper/skustepper.vue'
import { skuEmits, skuProps } from './sku'

const COMPONENT_NAME = 'nut-sku'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(skuProps)

const emit = defineEmits(skuEmits)

const slots = useSlots()

const { translate } = useTranslate(COMPONENT_NAME)

const skuStepperRef = ref<InstanceType<typeof SkuStepper> | null>(null)

const innerVisible = ref(props.visible)

const innerCount = ref(props.stepperMin)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

watch(() => props.visible, (value) => {
  innerVisible.value = value
})

watch(innerVisible, (value) => {
  if (!value)
    close()
})

// 商品规格 sku 选择
function selectSku(skus: any) {
  emit('selectSku', skus)
}

// 数量计步器变化
function changeStepper(value: number) {
  innerCount.value = value

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
    value: innerCount.value,
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

  innerVisible.value = false
}

function close() {
  emit(UPDATE_VISIBLE_EVENT, false)
}

function resetCount() {
  skuStepperRef.value?.reset()
}

defineExpose({
  resetCount,
})
</script>

<template>
  <NutPopup
    v-model:visible="innerVisible"
    custom-style="height: 75%"
    position="bottom"
    round
    closeable
    safe-area-inset-bottom
    @click-close-icon="closePopup('icon')"
    @click-overlay="closePopup('overlay')"
    @close="closePopup('close')"
  >
    <view :class="classes" :style="props.customStyle">
      <slot v-if="slots.skuHeader" name="skuHeader" />

      <SkuHeader v-else :goods="props.goods">
        <template #skuHeaderPrice>
          <slot name="skuHeaderPrice" />
        </template>

        <template #skuHeaderExtra>
          <slot name="skuHeaderExtra" />
        </template>
      </SkuHeader>

      <scroll-view class="nut-sku-content" :scroll-y="true">
        <view class="nut-sku-content-wrapper">
          <slot name="skuSelectTop" />

          <slot v-if="slots.skuSelect" name="skuSelect" />

          <SkuSelect v-else :sku="props.sku" @select-sku="selectSku" />

          <slot v-if="slots.skuStepper" name="skuStepper" />

          <SkuStepper
            v-else
            ref="skuStepperRef"
            :goods="props.goods"
            :stepper-title="props.stepperTitle || translate('buyNumber')"
            :stepper-min="props.stepperMin"
            :stepper-max="props.stepperMax"
            :stepper-extra-text="props.stepperExtraText"
            @add="add"
            @reduce="reduce"
            @change-stepper="changeStepper"
            @over-limit="stepperOverLimit"
          />

          <slot name="skuStepperBottom" />
        </view>
      </scroll-view>

      <SkuOperate
        :btn-extra-text="props.btnExtraText"
        :btn-options="props.btnOptions"
        :buy-text="props.buyText || translate('buyNow')"
        :add-cart-text="props.addCartText || translate('addToCart')"
        :confirm-text="props.confirmText || translate('confirm')"
        :show-default-operate="!slots.skuOperate"
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
@import "./index";
</style>
