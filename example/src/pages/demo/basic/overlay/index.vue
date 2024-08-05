<script lang="ts" setup>
const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
const visible6 = ref(false)

const overlayStyles = {
  backgroundColor: 'rgba(0, 0, 0, .2)',
}
</script>

<template>
  <view class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>

    <nut-cell>
      <nut-button type="primary" @click="visible1 = true">
        显示遮罩层
      </nut-button>

      <nut-overlay v-model:visible="visible1" :z-index="2000" />
    </nut-cell>

    <h2 class="title">
      遮罩样式
    </h2>

    <nut-cell>
      <nut-button type="primary" @click="visible3 = true">
        显示遮罩层
      </nut-button>

      <nut-overlay v-model:visible="visible3" :overlay-style="overlayStyles" :z-index="2000" />
    </nut-cell>

    <h2 class="title">
      设置动画时间
    </h2>

    <nut-cell>
      <nut-button type="primary" @click="visible4 = true">
        设置动画时间
      </nut-button>

      <nut-overlay v-model:visible="visible4" :z-index="2000" :duration="2500" />
    </nut-cell>

    <h2 class="title">
      锁定背景滚动
    </h2>

    <nut-cell>
      <nut-button type="primary" @click="visible5 = true">
        锁定背景滚动
      </nut-button>

      <nut-overlay v-model:visible="visible5" :z-index="2000" lock-scroll />
    </nut-cell>

    <h2 class="title">
      嵌套内容
    </h2>

    <nut-cell>
      <nut-button type="success" @click="visible2 = true">
        嵌套内容
      </nut-button>

      <nut-overlay v-model:visible="visible2" :z-index="2000">
        <view class="wrapper">
          <view class="content n-bg-2">
            这里是正文
          </view>
        </view>
      </nut-overlay>
    </nut-cell>

    <h2 class="title">
      点击遮罩不关闭
    </h2>

    <nut-cell>
      <nut-button type="primary" @click="visible6 = true">
        点击遮罩不关闭
      </nut-button>

      <nut-overlay v-model:visible="visible6" :z-index="2000" lock-scroll :close-on-click-overlay="false">
        <view class="wrapper">
          <view class="content n-bg-2" @click.stop="visible6 = false">
            close
          </view>
        </view>
      </nut-overlay>
    </nut-cell>
  </view>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Overlay"
  }
}
</route>

<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    color: red;
    border-radius: 8px;
  }
}
</style>
