<script lang="ts">
import { reactive, ref } from 'vue'

/* eslint-disable no-console */

export default {
  setup() {
    const data = ref([
      {
        testid: 3,
        testaddressName: '姓名',
        phone: '123****4567',
        defaultAddress: false,
        fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试',
      },
      {
        testid: 4,
        testaddressName: '姓名',
        phone: '123****4567',
        defaultAddress: true,
        fullAddress: '北京市通州区测试测试测试测试测试测试测试测试测试',
      },
    ])
    const dataOptions = reactive({
      id: 'testid',
      addressDetail: 'testaddressDetail',
      addressName: 'testaddressName',
    })
    const clickItem = () => {
      console.log('Click To Address')
    }
    const delClick = () => {
      console.log('Click To Delete')
    }
    const editClick = () => {
      console.log('Click To Edit')
    }
    const copyClick = () => {
      console.log('Click To Copy')
    }
    const setClick = () => {
      console.log('Click On Settings')
    }
    const delClickLong = () => {
      console.log('Click On DelClickLong')
    }
    const delClickSwipe = () => {
      console.log('Click On DelClickSwipe')
    }
    const addAddress = () => {
      console.log('Click To Add')
    }
    return {
      clickItem,
      data,
      delClick,
      editClick,
      copyClick,
      setClick,
      delClickLong,
      delClickSwipe,
      addAddress,
      dataOptions,
    }
  },
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <nut-address-list
      :data="data"
      :show-bottom-button="false"
      :options="dataOptions"
      @del-icon="delClick"
      @edit-icon="editClick"
      @click-item="clickItem"
    />
    <h2 class="title">
      长按功能
    </h2>
    <nut-address-list
      :data="data"
      long-press
      :show-bottom-button="false"
      :options="dataOptions"
      @del-icon="delClick"
      @edit-icon="editClick"
      @click-item="clickItem"
      @long-copy="copyClick"
      @long-set="setClick"
      @long-del="delClickLong"
    />
    <h2 class="title">
      滑动功能
    </h2>
    <nut-address-list
      :data="data"
      swipe-edition
      show-bottom-button
      :options="dataOptions"
      @del-icon="delClick"
      @edit-icon="editClick"
      @click-item="clickItem"
      @swipe-del="delClickSwipe"
      @add="addAddress"
    />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "AddressList"
  }
}
</route>
