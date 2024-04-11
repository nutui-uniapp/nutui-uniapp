<script lang="ts" setup>
import type { PickerBaseEvent, PickerChangeEvent, PickerOption } from 'nutui-uniapp'

const selectedValue1 = ref<string[]>(['ZheJiang'])
const selectedValue2 = ref<string[]>(['Wednesday', 'Afternoon'])
const selectedCascader = ref<string[]>(['FuJian', 'FuZhou', 'TaiJiang'])
const asyncValue = ref<string[]>([])

const show = ref<boolean>(false)
const popupDesc = ref<string>('')
const popupValue = ref<string[]>([])

const showToast = ref<boolean>(false)
const msg = ref<string>('')

const columns = ref([
  { text: '南京市', value: 'NanJing' },
  { text: '无锡市', value: 'WuXi' },
  { text: '海北藏族自治区', value: 'ZangZu' },
  { text: '北京市', value: 'BeiJing' },
  { text: '连云港市', value: 'LianYunGang' },
  { text: '浙江市', value: 'ZheJiang' },
  { text: '江苏市', value: 'JiangSu' },
])

const multipleColumns = ref([
  [
    { text: '周一', value: 'Monday' },
    { text: '周二', value: 'Tuesday' },
    { text: '周三', value: 'Wednesday' },
    { text: '周四', value: 'Thursday' },
    { text: '周五', value: 'Friday' },
  ],
  [
    { text: '上午', value: 'Morning' },
    { text: '下午', value: 'Afternoon' },
    { text: '晚上', value: 'Evening' },
  ],
])

const cascaderColumns = ref([
  {
    text: '浙江',
    value: 'ZheJiang',
    children: [
      {
        text: '杭州',
        value: 'HangZhou',
        children: [
          { text: '西湖区', value: 'XiHu' },
          { text: '余杭区', value: 'YuHang' },
        ],
      },
      {
        text: '温州',
        value: 'WenZhou',
        children: [
          { text: '鹿城区', value: 'LuCheng' },
          { text: '瓯海区', value: 'OuHai' },
        ],
      },
    ],
  },
  {
    text: '福建',
    value: 'FuJian',
    children: [
      {
        text: '福州',
        value: 'FuZhou',
        children: [
          { text: '鼓楼区', value: 'GuLou' },
          { text: '台江区', value: 'TaiJiang' },
        ],
      },
      {
        text: '厦门',
        value: 'XiaMen',
        children: [
          { text: '思明区', value: 'SiMing' },
          { text: '海沧区', value: 'HaiCang' },
        ],
      },
    ],
  },
])

const asyncColumns = ref<PickerOption[]>([])

const customColumns = ref([
  {
    name: '浙江',
    code: 'ZheJiang',
    list: [
      {
        name: '杭州',
        code: 'HangZhou',
        list: [
          { name: '西湖', code: 'XiHu' },
          { name: '余杭', code: 'YuHang' },
        ],
      },
      {
        name: '温州',
        code: 'WenZhou',
        list: [
          { name: '鹿城区', code: 'LuCheng' },
          { name: '瓯海区', code: 'OuHai' },
        ],
      },
    ],
  },
])

function onChange({ columnIndex, selectedValue, selectedOptions }: PickerChangeEvent) {
  // eslint-disable-next-line no-console
  console.log(columnIndex, selectedValue, selectedOptions)
}

function onConfirm({ selectedValue, selectedOptions }: PickerBaseEvent) {
  // eslint-disable-next-line no-console
  console.log(selectedValue, selectedOptions)

  msg.value = selectedOptions.map(item => item.text).join(',')
  showToast.value = true
}

function onConfirmPopup({ selectedOptions }: PickerBaseEvent) {
  popupDesc.value = selectedOptions.map(item => item.text).join(',')
  show.value = false
}

function onConfirmCustom({ selectedOptions }: PickerBaseEvent) {
  msg.value = selectedOptions.map(item => item.text).join(',')
  showToast.value = true
}

onMounted(() => {
  setTimeout(() => {
    asyncColumns.value = [
      { text: '南京市', value: 'NanJing' },
      { text: '无锡市', value: 'WuXi' },
      { text: '海北藏族自治区', value: 'ZangZu' },
      { text: '北京市', value: 'BeiJing' },
      { text: '连云港市', value: 'LianYunGang' },
      { text: '浙江市', value: 'ZheJiang' },
      { text: '江苏市', value: 'JiangSu' },
    ]

    asyncValue.value = ['ZangZu']
  }, 1000)
})
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-picker
      :columns="columns"
      title="城市选择"
      @change="onChange"
      @confirm="onConfirm"
    />

    <h2 class="title">
      搭配 Popup 使用
    </h2>
    <nut-cell title="城市选择" :desc="popupDesc" @click="show = true" />
    <nut-popup v-model:visible="show" position="bottom" safe-area-inset-bottom>
      <nut-picker
        v-model="popupValue"
        :columns="columns"
        title="城市选择"
        @confirm="onConfirmPopup"
        @cancel="show = false"
      >
        <nut-button block type="primary">
          永远有效
        </nut-button>
      </nut-picker>
    </nut-popup>

    <h2 class="title">
      默认选中项
    </h2>
    <nut-picker v-model="selectedValue1" :columns="columns" title="城市选择" @confirm="onConfirm" />

    <h2 class="title">
      多列样式
    </h2>
    <nut-picker v-model="selectedValue2" :columns="multipleColumns" title="城市选择" @confirm="onConfirm" />

    <h2 class="title">
      多级联动
    </h2>
    <nut-picker v-model="selectedCascader" :columns="cascaderColumns" title="城市选择" @confirm="onConfirm" />

    <h2 class="title">
      异步获取
    </h2>
    <nut-picker v-model="asyncValue" :columns="asyncColumns" title="城市选择" @confirm="onConfirm" />

    <h2 class="title">
      自定义字段名
    </h2>
    <nut-picker
      :columns="customColumns as any"
      title="请选择城市"
      :field-names="{
        text: 'name',
        value: 'code',
        children: 'list',
      }"
      @confirm="onConfirmCustom"
    />

    <nut-toast v-model:visible="showToast" :msg="msg" type="text" />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Picker"
  }
}
</route>
