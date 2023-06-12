<script setup lang="ts">
import { ref } from 'vue'
import { isH5 } from '@uni-helper/uni-env'

function testClick(event: Event) {
  // console.log('点击事件');
}
const switchChecked = ref(true)
</script>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Cell"
  }
}
</route>

<template>
  <div class="demo" :class="{ web: isH5 }">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell title="我是标题" desc="描述文字" />
    <nut-cell title="我是标题" sub-title="副标题描述" desc="描述文字" />
    <nut-cell title="点击测试" @click="testClick" />
    <nut-cell title="圆角设置 0" round-radius="0" />

    <h2 class="title">
      尺寸设置 large
    </h2>
    <nut-cell size="large" title="我是标题" desc="描述文字" />
    <nut-cell size="large" title="我是标题" sub-title="副标题描述" desc="描述文字" />

    <h2 class="title">
      直接使用插槽(slot)
    </h2>

    <nut-cell>
      <div>自定义内容</div>
    </nut-cell>

    <h2 class="title">
      直接使用插槽(slot title)
    </h2>
    <nut-cell desc="描述文字">
      <template #title>
        <span>Title <b style="color: red">1</b></span>
      </template>
    </nut-cell>

    <nut-cell-group title="链接 | 分组用法">
      <nut-cell title="链接" is-link />
      <nut-cell
        title="URL 跳转"
        desc="https://jd.com"
        is-link
        url="https://jd.com"
      />
      <nut-cell title="路由跳转 ’/‘ " to="/" />
    </nut-cell-group>
    <nut-cell-group title="自定义右侧箭头区域" desc="/Users/yangjunwei/Desktop/nutui/src/sites/mobile-taro/vue/src/basic/pages/overlay使用 nut-cell-group 支持 title desc slots">
      <nut-cell title="Switch">
        <template #link>
          <!-- <nut-switch v-model="switchChecked" /> -->
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="自定义左侧 Icon 区域">
      <nut-cell title="图片">
        <template #icon>
          <img
            class="nut-icon"
            src="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
          >
        </template>
      </nut-cell>
    </nut-cell-group>

    <h2 class="title">
      展示图标
    </h2>
    <nut-cell title="姓名" icon="my" desc="张三" is-link>
      <template #icon>
        <nut-icon name="my" />
      </template>
    </nut-cell>
    <h2 class="title">
      只展示 desc ，可通过 desc-text-align 调整内容位置
    </h2>
    <nut-cell desc-text-align="left" desc="张三" />
    <h2 class="title">
      垂直居中
    </h2>
    <nut-cell center title="我是标题" sub-title="副标题描述" desc="描述文字" />
  </div>
</template>
