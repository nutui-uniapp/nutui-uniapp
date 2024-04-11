<script lang="ts" setup>
import { reactive, ref } from 'vue'

const data = ref([{
  testid: 3,
  testaddressName: '姓名',
  phone: '123****4567',
  defaultAddress: false,
  fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试',
}, {
  testid: 4,
  testaddressName: '姓名',
  phone: '123****4567',
  defaultAddress: true,
  fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试',
}])

const dataOptions = reactive({
  id: 'testid',
  addressDetail: 'testaddressDetail',
  addressName: 'testaddressName',
})

function onItemClick() {
  // eslint-disable-next-line no-console
  console.log('item clicked')
}

function onItemDelClick() {
  // eslint-disable-next-line no-console
  console.log('item delete clicked')
}

function onItemEditClick() {
  // eslint-disable-next-line no-console
  console.log('item edit clicked')
}

function onItemLongCopyClick() {
  // eslint-disable-next-line no-console
  console.log('item copy clicked')
}

function onItemLongSetClick() {
  // eslint-disable-next-line no-console
  console.log('item set clicked')
}

function onItemLongDelClick() {
  // eslint-disable-next-line no-console
  console.log('item delete clicked (longpress)')
}

function onItemSwipeDelClick() {
  // eslint-disable-next-line no-console
  console.log('item delete clicked (swipe)')
}

function onAddressAddClick() {
  // eslint-disable-next-line no-console
  console.log('address add clicked')
}

function onItemRefreshClick(item: any) {
  // eslint-disable-next-line no-console
  console.log('item refresh clicked', item)
}
</script>

<template>
  <div class="demo full h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-address-list
      :data="data"
      :show-bottom-button="false"
      :options="dataOptions"
      @click-item="onItemClick"
      @del-icon="onItemDelClick"
      @edit-icon="onItemEditClick"
    />
    <h2 class="title">
      长按功能
    </h2>
    <nut-address-list
      :data="data"
      long-press
      :show-bottom-button="false"
      :options="dataOptions"
      @click-item="onItemClick"
      @del-icon="onItemDelClick"
      @edit-icon="onItemEditClick"
      @long-copy="onItemLongCopyClick"
      @long-set="onItemLongSetClick"
      @long-del="onItemLongDelClick"
    />
    <h2 class="title">
      滑动功能
    </h2>
    <nut-address-list
      :data="data"
      swipe-edition
      show-bottom-button
      :options="dataOptions"
      @click-item="onItemClick"
      @del-icon="onItemDelClick"
      @edit-icon="onItemEditClick"
      @swipe-del="onItemSwipeDelClick"
      @add="onAddressAddClick"
    />
    <h2 class="title">
      使用插槽
    </h2>
    <nut-address-list
      :data="data"
      :options="dataOptions"
    >
      <template #itemIcon="{ item }">
        <nut-icon name="refresh" @click="onItemRefreshClick(item)" />
      </template>
    </nut-address-list>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "AddressList"
  }
}
</route>
