<script lang="ts">
import { isH5 } from '@uni-helper/uni-env'

export default {
  props: {},
  setup() {
    return { isH5 }
  },
}
</script>

<template>
  <div class="demo full bg-w" :class="{ web: isH5 }">
    <h2 class="title">
      基础用法
    </h2>
    <nut-divider />
    <h2 class="title">
      展示文本
    </h2>
    <nut-divider>文本</nut-divider>
    <h2 class="title">
      内容位置
    </h2>
    <nut-divider content-position="left">
      文本
    </nut-divider>
    <nut-divider content-position="right">
      文本
    </nut-divider>
    <h2 class="title">
      虚线
    </h2>
    <nut-divider dashed>
      文本
    </nut-divider>
    <h2 class="title">
      自定义样式
    </h2>
    <nut-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      文本
    </nut-divider>
    <h2 class="title">
      垂直分割线
    </h2>
    <div :style="{ fontSize: '14px', marginLeft: '27px', color: '#909ca4', display: 'flex' }">
      文本
      <nut-divider direction="vertical" />
      <a href="#" :style="{ color: '#1989fa' }">链接</a>
      <nut-divider direction="vertical" />
      <a href="#" :style="{ color: '#1989fa' }">链接</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Divider"
  }
}
</route>
