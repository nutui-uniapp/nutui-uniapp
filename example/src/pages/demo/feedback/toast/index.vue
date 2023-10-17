<script lang="ts">
import { reactive } from 'vue'
import { isH5 } from '@uni-helper/uni-env'
import type { ToastInst, ToastType } from 'nutui-uniapp'

export default {

  setup() {
    const toastRef = ref<ToastInst>()
    const refClick = (type: string, msg: string) => {
      toastRef.value?.showToast[type as 'fail' | 'success' | 'warn' | 'loading'](msg, {
        title: '使用ref调用更加方便与灵活',
        duration: 0,
      })

      setTimeout(() => {
        toastRef.value?.hideToast()
      }, 1000)
    }
    const page = {
      state: reactive({
        msg: 'toast',
        type: 'text' as ToastType,
        show: false,
        cover: false,
        title: '',
        bottom: '',
        center: true,
      }),

      methods: {
        openToast: (
          type: string,
          msg: string,
          cover = false,
          title?: string,
          bottom?: string,
          center = true,
        ) => {
          page.state.show = true
          page.state.msg = msg
          page.state.type = type as ToastType
          page.state.cover = cover
          page.state.title = title!
          page.state.bottom = bottom!
          page.state.center = center
        },
        /* eslint-disable no-console */
        onClosed: () => console.log('closed'),
      },
    }
    return {
      page,
      isH5,
      toastRef,
      refClick,
    }
  },
}
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-toast
      v-model:visible="page.state.show"
      :msg="page.state.msg"
      :type="page.state.type"
      :cover="page.state.cover"
      :title="page.state.title"
      :bottom="page.state.bottom"
      :center="page.state.center"
      @closed="page.methods.onClosed"
    />
    <nut-cell title="Text 文字提示" is-link @click="page.methods.openToast('text', '网络失败，请稍后再试~')" />
    <nut-cell
      title="Title 标题文字"
      is-link
      @click="page.methods.openToast('text', '网络失败，请稍后再试~', false, '标题文字')"
    />
    <nut-cell
      title="Text 自定义位置"
      is-link
      @click="page.methods.openToast('text', '自定义位置', false, '', '20%', false)"
    />
    <nut-cell title="Success 成功提示" is-link @click="page.methods.openToast('success', '成功提示')" />
    <nut-cell title="Error 失败提示" is-link @click="page.methods.openToast('fail', '失败提示')" />
    <nut-cell title="Warning 警告提示" is-link @click="page.methods.openToast('warn', '警告提示')" />
    <nut-cell title="Loading 加载提示" is-link @click="page.methods.openToast('loading', '加载中')" />
    <nut-cell
      title="Loading 带白色背景遮罩"
      is-link
      @click="page.methods.openToast('loading', '加载中', true)"
    />

    <h2 class="title">
      ref调用
    </h2>
    <nut-toast
      ref="toastRef"
      @closed="page.methods.onClosed"
    />
    <nut-cell title="Success 成功提示" is-link @click="refClick('success', '成功提示')" />
    <nut-cell title="Error 失败提示" is-link @click="refClick('fail', '失败提示')" />
    <nut-cell title="Warning 警告提示" is-link @click="refClick('warn', '警告提示')" />
    <nut-cell title="Loading 加载提示" is-link @click="refClick('loading', '加载中')" />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Toast"
  }
}
</route>
