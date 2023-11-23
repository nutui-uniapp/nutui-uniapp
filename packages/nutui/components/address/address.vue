<script setup lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue'
import type { ScrollViewOnScrollEvent } from '@uni-helper/uni-app-types'
import { CHANGE_EVENT, CLOSE_EVENT, PREFIX, SELECTED_EVENT, UPDATE_MODEL_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import NutPopup from '../popup/popup.vue'
import NutIcon from '../icon/icon.vue'
import NutElevator from '../elevator/elevator.vue'
import { getMainClass } from '../_utils'
import { addressEmits, addressProps } from './address'
import type { AddressExistRegionData, AddressRegionData, CustomRegionData } from './type'

const props = defineProps(addressProps)
const emit = defineEmits(addressEmits)

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const showPopup = ref(props.visible)
const privateType = ref(props.type)
const tabIndex = ref(0)
const prevTabIndex = ref(0)
const tabName = ref(['province', 'city', 'country', 'town'])
const scrollDis = ref([0, 0, 0, 0])
const scrollTop = ref(0)
const regionData = reactive<Array<AddressRegionData[]>>([])

const regionList = computed(() => {
  switch (tabIndex.value) {
    case 0:
      return props.province
    case 1:
      return props.city
    case 2:
      return props.country
    default:
      return props.town
  }
})

function transformData(data: AddressRegionData[]) {
  if (!Array.isArray(data))
    throw new TypeError('params muse be array.')

  if (!data.length)
    return []

  data.forEach((item: AddressRegionData) => {
    if (!item.title)
      console.warn('[NutUI] <Address> 请检查数组选项的 title 值是否有设置 ,title 为必填项 .')
  })

  const newData: CustomRegionData[] = []

  data = data.sort((a: AddressRegionData, b: AddressRegionData) => {
    return a.title.localeCompare(b.title)
  })

  data.forEach((item: AddressRegionData) => {
    const index = newData.findIndex((value: CustomRegionData) => value.title === item.title)
    if (index <= -1) {
      newData.push({
        title: item.title,
        list: ([] as any).concat(item),
      })
    }
    else {
      newData[index].list.push(item)
    }
  })

  return newData
}

const selectedRegion = ref<AddressRegionData[]>([])

let selectedExistAddress = reactive({}) // 当前选择的地址

const closeWay = ref<'self' | 'mask' | 'cross'>('self')

// 设置选中省市县
function initCustomSelected() {
  regionData[0] = props.province || []
  regionData[1] = props.city || []
  regionData[2] = props.country || []
  regionData[3] = props.town || []

  const defaultValue = props.modelValue
  const num = defaultValue.length
  if (num > 0) {
    tabIndex.value = num - 1
    if (regionList.value.length === 0) {
      tabIndex.value = 0
      return
    }
    for (let index = 0; index < num; index++) {
      const arr: AddressRegionData[] = regionData[index]
      selectedRegion.value[index] = arr.filter((item: AddressRegionData) => item.id === defaultValue[index])[0]
    }
    scrollTo()
  }
}

function getTabName(item: AddressRegionData | null, index: number) {
  if (item && item.name)
    return item.name
  if (tabIndex.value < index && item)
    return item.name

  else
    return props.columnsPlaceholder[index] || translate('select')
}

// 手动关闭 点击叉号(cross)，或者蒙层(mask)
function handClose(type = 'self') {
  closeWay.value = type === 'cross' ? 'cross' : 'self'

  showPopup.value = false
}

// 点击遮罩层关闭
function clickOverlay() {
  closeWay.value = 'mask'
}

// 切换下一级列表
function nextAreaList(item: AddressRegionData) {
  const tab = tabIndex.value
  prevTabIndex.value = tabIndex.value
  const callBackParams: {
    next?: string
    value?: AddressRegionData
    custom: string
  } = {
    custom: tabName.value[tab],
  }

  selectedRegion.value[tab] = item

  // 删除右边已选择数据
  selectedRegion.value.splice(tab + 1, selectedRegion.value.length - (tab + 1))

  callBackParams.value = item

  if (regionData[tab + 1]?.length > 0) {
    tabIndex.value = tab + 1

    callBackParams.next = tabName.value[tabIndex.value]

    scrollTo()
  }
  else {
    handClose()
    emit(UPDATE_MODEL_EVENT)
  }
  emit(CHANGE_EVENT, callBackParams)
}
// 切换地区Tab
function changeRegionTab(item: AddressRegionData, index: number) {
  prevTabIndex.value = tabIndex.value
  if (getTabName(item, index)) {
    tabIndex.value = index
    scrollTo()
  }
}

function scrollChange(e: ScrollViewOnScrollEvent) {
  scrollDis.value[tabIndex.value] = e.detail.scrollTop
}

function scrollTo() {
  setTimeout(() => {
    scrollTop.value = scrollDis.value[tabIndex.value]
  })
}

// 选择现有地址
function selectedExist(item: AddressExistRegionData) {
  const copyExistAdd = props.existAddress
  let prevExistAdd: AddressExistRegionData = {} as AddressExistRegionData

  copyExistAdd.forEach((list: AddressExistRegionData) => {
    if (list && list.selectedAddress)
      prevExistAdd = list
    list.selectedAddress = false
  })

  item.selectedAddress = true

  selectedExistAddress = item

  emit(SELECTED_EVENT, prevExistAdd, item, copyExistAdd)

  handClose()
}
// 初始化
function initAddress() {
  selectedRegion.value = []
  tabIndex.value = 0
  scrollTo()
}

// 关闭
function close() {
  const data = {
    addressIdStr: '',
    addressStr: '',
    province: selectedRegion.value[0],
    city: selectedRegion.value[1],
    country: selectedRegion.value[2],
    town: selectedRegion.value[3],
  }

  const callBackParams = {
    data: {},
    type: privateType.value,
  }

  if (['custom', 'custom2'].includes(privateType.value)) {
    [0, 1, 2, 3].forEach((i) => {
      const item = selectedRegion.value[i]
      data.addressIdStr += `${i ? '_' : ''}${(item && item.id) || 0}`
      data.addressStr += (item && item.name) || ''
    })

    callBackParams.data = data
  }
  else {
    callBackParams.data = selectedExistAddress
  }

  initAddress()

  if (closeWay.value === 'self')
    emit(CLOSE_EVENT, callBackParams)
  else
    emit('closeMask', { closeWay: closeWay.value })

  emit(UPDATE_VISIBLE_EVENT, false)
}

// 选择其他地址
function switchModule() {
  const type = privateType.value
  privateType.value = type === 'exist' ? 'custom' : 'exist'
  initAddress()
  emit('switchModule', { type: privateType.value })
}

function handleElevatorItem(key: string, item: AddressRegionData) {
  nextAreaList(item)
}

watch(
  () => props.visible,
  (value) => {
    showPopup.value = value
  },
)

watch(
  () => showPopup.value,
  (value) => {
    if (value)
      initCustomSelected()
  },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-address`
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
    :z-index="zIndex"
    position="bottom"
    :lock-scroll="lockScroll"
    :round="round"
    @close="close"
    @click-overlay="clickOverlay"
    @open="closeWay = 'self'"
  >
    <view :class="classes" :style="customStyle">
      <view class="nut-address__header">
        <view class="nut-address__header-back" @click="switchModule">
          <slot v-if="type === 'exist' && privateType === 'custom'" name="backIcon">
            <NutIcon name="left" size="14px" />
          </slot>
        </view>

        <view class="nut-address__header__title">
          {{
            privateType === 'custom'
              ? customAddressTitle || translate('selectRegion')
              : existAddressTitle || translate('deliveryTo')
          }}
        </view>

        <view class="nut-address__header-close" @click="handClose('cross')">
          <slot name="closeIcon">
            <NutIcon name="close" custom-color="#cccccc" size="14px" />
          </slot>
        </view>
      </view>

      <!-- 请选择 -->
      <view v-if="['custom', 'custom2'].includes(privateType)" class="nut-address__custom">
        <view class="nut-address__region">
          <view
            v-for="(item, index) in selectedRegion" :key="index"
            class="nut-address__region-item "
            :class="[index === tabIndex ? 'active' : '']"
            @click="changeRegionTab(item, index)"
          >
            <view>{{ getTabName(item, index) }} </view>
            <view class="nut-address__region-line--mini" :class="{ active: index === tabIndex }" />
          </view>
          <view v-if="tabIndex === selectedRegion.length" class="active nut-address__region-item">
            <view>{{ getTabName(null, selectedRegion.length) }} </view>
            <view class="nut-address__region-line--mini active" />
          </view>
        </view>

        <view v-if="privateType === 'custom'" class="nut-address__detail">
          <div class="nut-address__detail-list">
            <scroll-view :scroll-y="true" :style="{ height: '100%' }" :scroll-top="scrollTop" @scroll="scrollChange">
              <div
                v-for="(item, index) in regionList"
                :key="index"
                class="nut-address__detail-item" :class="[selectedRegion[tabIndex]?.id === item.id ? 'active' : '']"
                @click="nextAreaList(item)"
              >
                <view>
                  <slot v-if="selectedRegion[tabIndex]?.id === item.id" name="icon">
                    <NutIcon name="Check" custom-class="nut-address-select-icon" width="13px" />
                  </slot>{{ item.name }}
                </view>
              </div>
            </scroll-view>
          </div>
        </view>

        <view v-else class="nut-address__elevator-group">
          <NutElevator
            :height="height"
            :index-list="transformData(regionList)"
            @click-item="handleElevatorItem"
          />
        </view>
      </view>

      <!-- 配送至 -->
      <view v-else-if="privateType === 'exist'" class="nut-address__exist">
        <div class="nut-address__exist-group">
          <ul class="nut-address__exist-group-list">
            <li
              v-for="(item, index) in existAddress"
              :key="index"
              class="nut-address__exist-group-item"
              :class="[item.selectedAddress ? 'active' : '']"
              @click="selectedExist(item)"
            >
              <slot v-if="!item.selectedAddress" name="unselectedIcon">
                <NutIcon name="location2" custom-class="nut-address-select-icon" width="13px" />
              </slot>

              <slot v-if="item.selectedAddress" name="icon">
                <NutIcon name="Check" custom-class="nut-address-select-icon" width="13px" />
              </slot>

              <div class="nut-address__exist-item-info">
                <div v-if="item.name && item.phone" class="nut-address__exist-item-info-top">
                  <div class="nut-address__exist-item-info-name">
                    {{ item.name }}
                  </div>
                  <div class="nut-address__exist-item-info-phone">
                    {{ item.phone }}
                  </div>
                </div>

                <div class="nut-address__exist-item-info-bottom">
                  <view>
                    {{ item.provinceName + item.cityName + item.countyName + item.townName + item.addressDetail }}
                  </view>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="isShowCustomAddress" class="nut-address__exist-choose" @click="switchModule">
          <div class="nut-address__exist-choose-btn">
            {{
              customAndExistTitle || translate('chooseAnotherAddress')
            }}
          </div>
        </div>
        <template v-if="!isShowCustomAddress">
          <slot name="bottom" />
        </template>
      </view>
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import './index';
</style>
