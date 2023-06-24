<script lang="ts">
import { isH5 } from '@uni-helper/uni-env'

export default {
  setup() {
    const click = () => {
      uni.showToast({ title: 'click' })
    }

    return {
      click,
      isH5,
    }
  },
}
</script>

<template>
  <view class="demo" :class="{ web: isH5 }">
    <nut-backtop @click="click">
      <template #content>
        <div class="text-data n-bg-2">
          我是测试数据1
        </div>
        <div class="text-data n-bg-2">
          我是测试数据2
        </div>
        <div class="text-data n-bg-2">
          我是测试数据3
        </div>
        <div class="text-data n-bg-2">
          我是测试数据4
        </div>
        <div class="text-data n-bg-2">
          我是测试数据5
        </div>
        <div class="text-data n-bg-2">
          我是测试数据6
        </div>
        <div class="text-data n-bg-2">
          我是测试数据7
        </div>
        <div class="text-data n-bg-2">
          我是测试数据8
        </div>
        <div class="text-data n-bg-2">
          我是测试数据9
        </div>
        <div class="text-data n-bg-2">
          我是测试数据10
        </div>
        <div class="text-data n-bg-2">
          我是测试数据11
        </div>
        <div class="text-data n-bg-2">
          我是测试数据12
        </div>
        <div class="text-data n-bg-2">
          我是测试数据13
        </div>
        <div class="text-data n-bg-2">
          我是测试数据14
        </div>
        <div class="text-data n-bg-2">
          我是测试数据15
        </div>
        <div class="text-data n-bg-2">
          我是测试数据16
        </div>
        <div class="text-data n-bg-2">
          我是测试数据17
        </div>
        <div class="text-data n-bg-2">
          我是测试数据18
        </div>
        <div class="text-data n-bg-2">
          我是测试数据19
        </div>
        <div class="text-data n-bg-2">
          我是测试数据20
        </div>
        <div class="text-data n-bg-2">
          我是测试数据21
        </div>
        <div class="text-data n-bg-2">
          我是测试数据22
        </div>
        <div class="text-data n-bg-2">
          我是测试数据23
        </div>
        <div class="text-data n-bg-2">
          我是测试数据24
        </div>
      </template>
    </nut-backtop>
  </view>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "BackTop"
  }
}
</route>

<style lang="scss">
.demo {
  .text-data  {
    display: flex;
    align-items: center;
    width: 100%;
    height: 46px;
    padding-left: 16px;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 20px;
    font-size: 13px;
    line-height: 19px;
    color: rgb(102 102 102 / 100%);
    border-radius: 7px;
  }
}
</style>
