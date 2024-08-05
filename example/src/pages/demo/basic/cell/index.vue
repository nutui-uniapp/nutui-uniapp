<script setup lang="ts">
import { ref } from 'vue'

const switchChecked = ref(true)

function testClick() {
  // eslint-disable-next-line no-console
  console.log('nut-cell 点击事件')
}
</script>

<template>
  <view class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell title="我是标题" desc="描述文字" />
    <nut-cell title="我是标题" sub-title="副标题描述" desc="描述文字" />
    <nut-cell title="点击测试" clickable @click="testClick" />
    <nut-cell title="圆角设置 0" round-radius="0" />

    <h2 class="title">
      large尺寸
    </h2>
    <nut-cell size="large" title="我是标题" desc="描述文字" />
    <nut-cell
      size="large"
      title="我是标题"
      sub-title="副标题描述"
      desc="描述文字"
    />

    <h2 class="title">
      直接使用插槽
    </h2>
    <nut-cell>
      <text>自定义内容</text>
    </nut-cell>

    <h2 class="title">
      标题插槽
    </h2>
    <nut-cell desc="描述文字">
      <template #title>
        <text>Title</text>
      </template>
    </nut-cell>

    <h2 class="title">
      描述插槽
    </h2>
    <nut-cell title="我是标题">
      <template #desc>
        <text>描述文字</text>
      </template>
    </nut-cell>

    <nut-cell-group title="链接 / 分组用法">
      <nut-cell title="链接样式" is-link />
      <nut-cell title="路由跳转 “/” " to="/pages/index/index" />
    </nut-cell-group>

    <nut-cell-group title="自定义右侧箭头区域" desc="使用 nut-cell-group 支持 title desc slots">
      <nut-cell title="Switch">
        <template #link>
          <nut-switch v-model="switchChecked" />
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="自定义左侧图标区域">
      <nut-cell title="图片">
        <template #icon>
          <image
            class="nut-icon"
            src="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
          />
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="自定义图标">
      <nut-cell title="icon属性" icon="my" desc="张三" />
      <nut-cell title="icon插槽" desc="张三">
        <template #icon>
          <nut-icon name="my" />
        </template>
      </nut-cell>
    </nut-cell-group>

    <h2 class="title">
      只展示 desc ，可通过 desc-text-align 调整内容位置
    </h2>
    <nut-cell desc="张三" desc-text-align="left" />

    <h2 class="title">
      垂直居中
    </h2>
    <nut-cell
      title="我是标题"
      sub-title="副标题描述"
      desc="描述文字"
      center
    />
  </view>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Cell"
  }
}
</route>
