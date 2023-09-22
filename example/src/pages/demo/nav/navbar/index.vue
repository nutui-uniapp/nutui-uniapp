<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { ToastInst } from 'nutui-uniapp'

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
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <nut-toast
      ref="toastRef"
    />
    <nut-navbar title="订单详情" @on-click-back="back" @on-click-title="title">
      <template #left>
        <div>返回</div>
      </template>
      <template #right>
        <nut-icon name="share-n" share-n width="16px" />
      </template>
    </nut-navbar>

    <nut-navbar
      title="浏览记录"
      desc="清空"
      @on-click-back="back"
      @on-click-title="title"
      @on-click-right="rightClick"
    />

    <nut-navbar
      :left-show="false"
      title="购物车"
      :title-icon="true"
      desc="编辑"
      @on-click-back="back"
      @on-click-title="title"
      @on-click-icon="icon"
      @on-click-right="rightClick"
    >
      <template #title-icon>
        <nut-icon name="cart2" width="16px" />
      </template>
      <template #right>
        <nut-icon name="more-x" class="right" width="16px" />
      </template>
    </nut-navbar>

    <h2 class="title">
      自定义导航栏中间内容
    </h2>
    <nut-navbar desc="编辑" @on-click-back="back" @on-click-title="title" @on-click-right="rightClick">
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
