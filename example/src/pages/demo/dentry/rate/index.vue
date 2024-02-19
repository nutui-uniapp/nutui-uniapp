<script lang="ts">
import { reactive } from 'vue'

export default {
  setup() {
    const activeColor = '#FFC800'
    const state = reactive({
      val: 3,
      val1: 3.5,
      val2: 3,
      val3: 3,
      val4: 3,
      val5: 3,
      val6: 3,
      val7: 3,
      val8: 3,
    })
    const onChange = (val: any) => {
    /* eslint-disable no-console */
      console.log(val)
    }
    return {
      state,
      onChange,
      activeColor,
    }
  },
}
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val" />
    </nut-cell>

    <h2 class="title">
      半星
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val1" allow-half />
    </nut-cell>

    <h2 class="title">
      自定义 icon
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val2" custom-icon="heart-fill" />
    </nut-cell>

    <h2 class="title">
      自定义数量
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val3" count="10" />
    </nut-cell>

    <h2 class="title">
      自定义颜色
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val4" :active-color="activeColor" />
    </nut-cell>

    <h2 class="title">
      禁用状态
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val5" disabled />
    </nut-cell>

    <h2 class="title">
      只读状态
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val6" readonly />
    </nut-cell>

    <h2 class="title">
      绑定事件
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val7" @change="onChange" />
    </nut-cell>

    <h2 class="title">
      自定义尺寸 35px
    </h2>
    <nut-cell class="cell">
      <nut-rate v-model="state.val8" :size="35" />
    </nut-cell>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Rate"
  }
}
</route>
