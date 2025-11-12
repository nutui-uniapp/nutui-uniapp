<script lang="ts">
import { reactive, ref, toRefs } from 'vue'

export default {
  setup() {
    const color1 = ref('#D9500B')
    const state = reactive({
      horseLamp1: [
        'NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。',
        '爆款准点秒',
        '买超值优惠',
        '赢百万京豆',
      ],
      horseLamp2: [
        'NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。',
        '爆款准点秒',
        '买超值优惠',
        '赢百万京豆',
      ],
      horseLamp3: [
        'NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。',
        '爆款准点秒',
        '买超值优惠',
        '赢百万京豆',
      ],
      text:
        'NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。',
    })

    const data1 = ref([
      { id: 1, text: 'Noticebar 公告栏' },
      { id: 2, text: 'Cascader 级联选择' },
      { id: 3, text: 'DatePicker 日期选择器' },
      { id: 4, text: 'CheckBox 复选按钮' },
    ])

    setTimeout(() => {
      data1.value = [
        { id: 1, text: '公告栏' },
        { id: 2, text: '级联选择' },
        { id: 3, text: '日期选择器' },
        { id: 4, text: '复选按钮' },
      ]
    }, 2000)
    /* eslint-disable no-console */

    const hello = () => {
      console.log('hello world')
    }
    const go = (item: any) => {
      console.log(item)
    }

    return {
      ...toRefs(state),
      hello,
      go,
      data1,
      color1,
    }
  },
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      默认用法
    </h2>
    <nut-noticebar
      text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
    />

    <h2 class="title">
      滚动播放
    </h2>
    <nut-noticebar
      text="华为畅享9新品即将上市"
      :scrollable="true"
      background="rgba(251, 248, 220, 1)"
      :custom-color="color1"
    />
    <p />
    <nut-noticebar
      text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
      :scrollable="false"
      background="rgba(251, 248, 220, 1)"
      :custom-color="color1"
    />

    <h2 class="title">
      通告栏模式--关闭模式
    </h2>
    <nut-noticebar
      :close-mode="true"
      background="rgba(251, 248, 220, 1)"
      :custom-color="color1"
      @click="hello"
    >
      NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在
      H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。
    </nut-noticebar>
    <p />
    <nut-noticebar
      :close-mode="true"
      background="rgba(251, 248, 220, 1)"
      :custom-color="color1"
      @click="hello"
    >
      NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在
      H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。
    </nut-noticebar>

    <h2 class="title">
      多行展示
    </h2>
    <nut-noticebar
      text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
      wrapable
      background="rgba(251, 248, 220, 1)"
      :custom-color="color1"
    />

    <h2 class="title">
      纵向滚动
    </h2>
    <div class="interstroll-list">
      <nut-noticebar
        direction="vertical"
        :list="horseLamp1"
        :speed="10"
        :stand-time="1000"
        :close-mode="true"
        background="rgba(251, 248, 220, 1)"
        :custom-color="color1"
        :height="50"
        @click="go"
      />
    </div>

    <h2 class="title">
      纵向复杂滚动动画
    </h2>
    <div class="interstroll-list">
      <nut-noticebar
        direction="vertical"
        :list="horseLamp2"
        :speed="10"
        :stand-time="2000"
        :complex-am="true"
        background="rgba(251, 248, 220, 1)"
        :custom-color="color1"
      />
    </div>
    <h2 class="title">
      纵向自定义滚动内容
    </h2>
    <div class="interstroll-list">
      <nut-noticebar
        direction="vertical"
        :height="50"
        :speed="10"
        :stand-time="1000"
        :list="data1"
        field-name="text"
        background="rgba(251, 248, 220, 1)"
        :custom-color="color1"
        @close="go"
        @click="go"
      />
    </div>

    <h2 class="title">
      纵向自定义右侧图标
    </h2>
    <div class="interstroll-list">
      <nut-noticebar
        direction="vertical"
        :list="horseLamp1"
        :speed="10"
        :stand-time="1000"
        background="rgba(251, 248, 220, 1)"
        :custom-color="color1"
      >
        <template #rightIcon>
          <image
            src="https://img13.360buyimg.com/imagetools/jfs/t1/72082/2/3006/1197/5d130c8dE1c71bcd6/e48a3b60804c9775.png"
            style="width: 20px; height: 20px;"
          />
        </template>
      </nut-noticebar>
    </div>
  </div>
</template>

<style lang="scss">
.demo {
  padding-bottom: 30px !important;

  .custom-item {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Noticebar"
  }
}
</route>
