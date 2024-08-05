<script lang="ts" setup>
import { computed, onMounted, reactive, ref, useSlots, watch } from 'vue'
import NutButton from '../button/button.vue'
import { floatData, getMainClass } from '../_utils'
import { useTranslate } from '../../locale'
import GeneralShell from './compoents/generalshell.vue'
import { addresslistEmits, addresslistProps } from './addresslist'

const COMPONENT_NAME = 'nut-address-list'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})

const props = defineProps(addresslistProps)

const emit = defineEmits(addresslistEmits)

const { translate } = useTranslate(COMPONENT_NAME)

const slots = useSlots()

const dataArray = ref<any[]>([])
const dataInfo = reactive({
  id: 2,
  addressName: '姓名',
  phone: '123****4567',
  defaultAddress: false,
  fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试',
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

// 磨平参数差异
function trowelData() {
  if (Object.keys(props.options).length > 0) {
    dataArray.value = props.data.map((item) => {
      return floatData(dataInfo, item, props.options)
    })
  }
}

watch(
  () => props.data,
  () => trowelData(),
  { deep: true },
)

function handleDelIconClick(event: any, item: any, index: number | string) {
  event.stopPropagation()

  emit('delIcon', event, item, index)
}

function handleEditIconClick(event: any, item: any, index: number | string) {
  event.stopPropagation()

  emit('editIcon', event, item, index)
}

function handleContentItemClick(event: any, item: any, index: number | string) {
  event.stopPropagation()

  emit('clickItem', event, item, index)
}

function handleLongCopyClick(event: any, item: any, index: number | string) {
  event.stopPropagation()

  emit('longCopy', event, item, index)
}

function handleLongSetClick(event: any, item: any, index: number | string) {
  event.stopPropagation()

  emit('longSet', event, item, index)
}

function handleLongDelClick(event: any, item: any, index: number | string) {
  event.stopPropagation()

  emit('longDel', event, item, index)
}

function handleSwipeDelClick(event: any, item: any, index: number | string) {
  event.stopPropagation()

  emit('swipeDel', event, item, index)
}

function handleAddressAdd(event: any) {
  event.stopPropagation()

  emit('add', event)
}

onMounted(() => {
  trowelData()
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <GeneralShell
      v-for="(item, index) in dataArray"
      :key="index"
      :address="item"
      :long-press="props.longPress"
      :swipe-edition="props.swipeEdition"
      :use-content-info-slot="!!slots.itemInfos"
      :use-content-icons-slot="!!slots.itemIcon"
      :use-content-addrs-slot="!!slots.itemAddr"
      :use-longpress-all-slot="!!slots.longpressBtns"
      :use-swipe-right-btn-slot="!!slots.swipeRight"
      @del-icon="handleDelIconClick($event, item, index)"
      @edit-icon="handleEditIconClick($event, item, index)"
      @click-item="handleContentItemClick($event, item, index)"
      @swipe-del="handleSwipeDelClick($event, item, index)"
      @long-copy="handleLongCopyClick($event, item, index)"
      @long-set="handleLongSetClick($event, item, index)"
      @long-del="handleLongDelClick($event, item, index)"
    >
      <template #content-info>
        <slot name="itemInfos" :item="item" />
      </template>

      <template #content-icons>
        <slot name="itemIcon" :item="item" />
      </template>

      <template #content-addrs>
        <slot name="itemAddr" :item="item" />
      </template>

      <template v-if="props.longPress" #longpress-all>
        <slot name="longpressBtns" :item="item" />
      </template>

      <template v-if="props.swipeEdition" #swipe-right-btn>
        <slot name="swipeRight" :item="item" />
      </template>
    </GeneralShell>

    <view v-if="props.showBottomButton" class="nut-address-list__bottom" @click="handleAddressAdd">
      <NutButton type="danger" block>
        {{ translate('addAddress') }}
      </NutButton>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
