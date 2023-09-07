<script setup lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import NutButton from '../button/button.vue'
import { floatData } from '../_utils'
import { PREFIX } from '../_constants'
import { useTranslate } from '../../locale'
import GeneralShell from './compoents/generalshell.vue'
import { addresslistEmits, addresslistProps } from './addresslist'

const props = defineProps(addresslistProps)
const emit = defineEmits(addresslistEmits)

const dataArray = ref([]) as any
const dataInfo = reactive({
  id: 2,
  addressName: '姓名',
  phone: '123****4567',
  defaultAddress: false,
  fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试',
})
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
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

function clickDelIcon(event: Event, item: unknown, index: number | string) {
  emit('delIcon', event, item, index)
  event.stopPropagation()
}
function clickEditIcon(event: Event, item: unknown, index: number | string) {
  emit('editIcon', event, item, index)
  event.stopPropagation()
}
function clickContentItem(event: Event, item: unknown, index: number | string) {
  emit('clickItem', event, item, index)
  event.stopPropagation()
}
function clickLongCopy(event: Event, item: unknown, index: number | string) {
  emit('longCopy', event, item, index)
  event.stopPropagation()
}
function clickLongSet(event: Event, item: unknown, index: number | string) {
  emit('longSet', event, item, index)
  event.stopPropagation()
}
function clickLongDel(event: Event, item: unknown, index: number | string) {
  emit('longDel', event, item, index)
  event.stopPropagation()
}
function clickSwipeDel(event: Event, item: unknown, index: number | string) {
  emit('swipeDel', event, item, index)
  event.stopPropagation()
}
function addAddress(event: Event) {
  emit('add', event)
  event.stopPropagation()
}
onMounted(() => {
  trowelData()
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-address-list`
const { translate } = useTranslate(componentName)
export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
</script>

<template>
  <div :class="classes">
    <GeneralShell
      v-for="(item, index) in dataArray"
      :key="index"
      :address="item"
      :long-press="longPress"
      :swipe-edition="swipeEdition"
      @delIcon="clickDelIcon($event, item, index)"
      @editIcon="clickEditIcon($event, item, index)"
      @clickItem="clickContentItem($event, item, index)"
      @swipeDel="clickSwipeDel($event, item, index)"
      @longCopy="clickLongCopy($event, item, index)"
      @longSet="clickLongSet($event, item, index)"
      @longDel="clickLongDel($event, item, index)"
    >
      <template #content-info>
        <slot name="item-infos" :item="item" />
      </template>
      <template #content-icons>
        <slot name="item-icon" :item="item" />
      </template>
      <template #content-addrs>
        <slot name="item-addr" :item="item" />
      </template>
      <template v-if="longPress" #longpress-all>
        <slot name="longpress-btns" :item="item" />
      </template>
      <template v-if="swipeEdition" #swipe-right-btn>
        <slot name="swipe-right" :item="item" />
      </template>
    </GeneralShell>
    <div v-if="showBottomButton" class="nut-address-list__bottom" @click="addAddress">
      <NutButton block type="danger">
        {{ translate('addAddress') }}
      </NutButton>
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
