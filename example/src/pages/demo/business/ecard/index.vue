<script lang="ts" setup>
import type { EcardChangeEvent, EcardDataItem, EcardDataValue, EcardInst } from 'nutui-uniapp'

const ecard = ref<EcardInst | null>(null)

const money = ref<number>(0)

const dataList = ref<EcardDataItem[]>([
  { price: 10 },
  { price: 20 },
  { price: 30 },
  { price: 40 },
])

function onUpdate(value: EcardDataValue) {
  // eslint-disable-next-line no-console
  console.log('updated', value)
}

function onChange(event: EcardChangeEvent) {
  // eslint-disable-next-line no-console
  console.log('changed', event)
}

function onInputChange(value: string) {
  // eslint-disable-next-line no-console
  console.log('input changed', value)
}

function onStepChange(count: number, price: EcardDataValue) {
  // eslint-disable-next-line no-console
  console.log('step changed', count, price)
}

function onInputClick() {
  // eslint-disable-next-line no-console
  console.log('input clicked')
}

function updateCurrentIndex() {
  ecard.value?.update({
    index: 1,
  })
}

function updateInputValue() {
  ecard.value?.update({
    index: -1,
    input: '123',
  })
}

function updateCount() {
  ecard.value?.update({
    index: 1,
    count: 2,
  })
}
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell>
      <nut-ecard
        ref="ecard"
        v-model="money"
        :list="dataList"
        @update="onUpdate"
        @change="onChange"
        @input-change="onInputChange"
        @change-step="onStepChange"
        @input-click="onInputClick"
      />
    </nut-cell>

    <h2 class="title">
      手动更新
    </h2>
    <nut-cell-group>
      <nut-cell title="更新选中项" is-link @click="updateCurrentIndex" />
      <nut-cell title="更新输入值" is-link @click="updateInputValue" />
      <nut-cell title="更新数量" is-link @click="updateCount" />
    </nut-cell-group>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Ecard"
  }
}
</route>
