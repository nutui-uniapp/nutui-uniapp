<script lang="ts">
import type { ToastInst } from 'nutui-uniapp'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const toastRef = ref<ToastInst>()
    const tab1value = ref(0)
    const tab2value = ref(0)

    const methods = {
      back() {
        toastRef.value?.showToast.text('header头部， 点击返回')
      },
      title() {
        toastRef.value?.showToast.text('header头部， 点击title')
      },
      icon() {
        toastRef.value?.showToast.text('icon')
      },

      rightClick() {
        toastRef.value?.showToast.text('右侧点击事件')
      },
      changeTab(tab: any) {
        tab1value.value = tab.paneKey as number
      },
      changeTabList(tab: any) {
        tab2value.value = tab.paneKey as number
      },
    }

    return {
      tab1value,
      tab2value,
      toastRef,
      ...methods,
    }
  },
})
</script>

<template>
  <div class="demo full h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-toast
      ref="toastRef"
    />
    <nut-navbar title="Title" />

    <h2 class="title">
      自定义左侧插槽
    </h2>
    <nut-navbar title="Title" @on-click-back="back" @on-click-title="title">
      <template #left>
        <nut-icon name="left" />
      </template>
    </nut-navbar>
    <nut-navbar
      custom-class="mt-20px"
      title="Title"
      @on-click-back="back"
      @on-click-title="title"
    >
      <template #left>
        <nut-icon name="left" /> Back
      </template>
    </nut-navbar>
    <h2 class="title">
      自定义右侧插槽
    </h2>
    <nut-navbar title="Title" @on-click-back="back" @on-click-title="title">
      <template #right>
        Share
      </template>
    </nut-navbar>
    <nut-navbar
      custom-class="mt-20px"
      title="Title"
      @on-click-back="back"
      @on-click-title="title"
    >
      <template #right>
        <nut-icon name="share" />
      </template>
    </nut-navbar>
    <h2 class="title">
      自定义导航栏中间内容
    </h2>
    <nut-navbar
      desc="编辑"
      @on-click-back="back"
      @on-click-title="title"
      @on-click-right="rightClick"
    >
      <template #content>
        <div class="h-full">
          <nut-tabs v-model="tab1value" @click="changeTab">
            <nut-tab-pane title="商品" />
            <nut-tab-pane title="店铺" />
          </nut-tabs>
        </div>
      </template>

      <template #right>
        <nut-icon name="more-x" class="right" width="16px" />
      </template>
    </nut-navbar>
    <nut-navbar
      custom-class="mt-20px"
      :left-show="false"
      title="购物车"
      :title-icon="true"
      desc="编辑"
      @on-click-back="back"
      @on-click-title="title"
      @on-click-icon="icon"
    >
      <template #titleIcon>
        <nut-icon name="cart2" width="16px" />
      </template>
    </nut-navbar>

    <h2 class="title">
      多tab切换导航
    </h2>
    <nut-navbar @on-click-back="back">
      <template #content>
        <div class="h-full">
          <nut-tabs v-model="tab2value" @click="changeTabList">
            <nut-tab-pane title="商品" />
            <nut-tab-pane title="评价" />
            <nut-tab-pane title="详情" />
            <nut-tab-pane title="推荐" />
          </nut-tabs>
        </div>
      </template>

      <template #right>
        <nut-icon name="horizontal-n" class="right" width="16px" />
      </template>
    </nut-navbar>
  </div>
</template>

<style lang="scss">
.nut-navbar {
  padding: 0 !important;
}
</style>

<route lang="json">
{
"style": {
    "navigationBarTitleText": "NavBar"
  }
}
</route>
