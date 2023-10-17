<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
  props: {},
  setup() {
    const state = reactive({
      value1: 40,
      value2: [20, 80],
      value3: 0,
      value4: 20,
      value5: 30,
      value6: 40,
      value7: 50,
      value8: 40,
      value9: 60,
      value10: 20,
      value11: [20, 80],
      value12: 60,
      value13: [20, 80],
      value14: 60,
      value15: [20, 80],
      marks: {
        0: 0,
        20: 20,
        40: 40,
        60: 60,
        80: 80,
        100: 100,
      },
    })
    /* eslint-disable no-console */
    const onChange = (value: number | number[]) => console.log(`当前值：${value}`)
    return {
      ...toRefs(state),
      onChange,
    }
  },
}
</script>

<template>
  <div class="demo range-demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value1" @change="onChange" />
    </nut-cell>
    <h2 class="title">
      双滑块
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value2" range @change="onChange" />
    </nut-cell>
    <h2 class="title">
      指定范围
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value3" :max="10" :min="-10" @change="onChange" />
    </nut-cell>
    <h2 class="title">
      设置步长
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value4" :step="5" @change="onChange" />
    </nut-cell>
    <h2 class="title">
      隐藏范围
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value5" hidden-range @change="onChange" />
    </nut-cell>
    <h2 class="title">
      隐藏标签
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value6" hidden-tag @change="onChange" />
    </nut-cell>
    <h2 class="title">
      禁用
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value7" disabled />
    </nut-cell>
    <h2 class="title">
      自定义样式
    </h2>
    <nut-cell custom-class="cell">
      <nut-range
        v-model="value8"
        inactive-color="rgba(163,184,255,1)"
        button-color="rgba(52,96,250,1)"
        active-color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)"
        @change="onChange"
      />
    </nut-cell>
    <h2 class="title">
      自定义按钮
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value9" @change="onChange">
        <template #button>
          <view class="custom-button">
            {{ value9 }}
          </view>
        </template>
      </nut-range>
    </nut-cell>
    <h2 class="title">
      垂直方向
    </h2>
    <nut-cell custom-class="vertical_div">
      <view class="div">
        <nut-range v-model="value10" :vertical="true" @change="onChange" />
      </view>
      <view class="div">
        <nut-range v-model="value11" range :vertical="true" @change="onChange" />
      </view>
    </nut-cell>
    <h2 class="title">
      刻度标记
    </h2>
    <nut-cell custom-class="cell">
      <nut-range v-model="value12" :marks="marks" :hidden-range="true" @change="onChange" />
    </nut-cell>
    <nut-cell custom-class="cell">
      <nut-range v-model="value13" range :marks="marks" :hidden-range="true" @change="onChange" />
    </nut-cell>

    <nut-cell custom-class="vertical_div">
      <view class="div">
        <nut-range v-model="value14" :vertical="true" :marks="marks" :hidden-range="true" @change="onChange" />
      </view>
      <view class="div">
        <nut-range
          v-model="value15"
          range
          :vertical="true"
          :marks="marks"
          :hidden-range="true"
          @change="onChange"
        />
      </view>
    </nut-cell>
  </div>
</template>

<style lang="scss">
.range-demo {
  .cell {
    padding: 40px 18px;
  }
}
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
.vertical_div {
  height: 180px;
  padding: 10px;
  .div {
    width: 150px;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Range"
  }
}
</route>
