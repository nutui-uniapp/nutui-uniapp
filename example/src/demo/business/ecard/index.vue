<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const dataList = reactive([
      {
        price: 10,
      },
      {
        price: 20,
      },
      {
        price: 30,
      },
      {
        price: 40,
      },
    ])
    const money = ref(0)
    const inputChange = (val: number) => {
      money.value = val
    }
    const change = (item: { price: number }) => {
      money.value = item.price
    }
    const changeStep = (num: number, price: number) => {
      const val = price * num
      money.value = val
    }
    return {
      dataList,
      inputChange,
      change,
      money,
      changeStep,
    }
  },
})
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell>
      <nut-ecard
        v-model="money"
        :list="dataList"
        @inputChange="inputChange"
        @change="change"
        @changeStep="changeStep"
      />
    </nut-cell>
  </div>
</template>
