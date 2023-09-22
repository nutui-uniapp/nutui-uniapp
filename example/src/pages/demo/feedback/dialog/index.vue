<script lang="ts">
import { ref } from 'vue'
import { isH5 } from '@uni-helper/uni-env'
import type { DialogInst, NutAnimationName } from 'nutui-uniapp'

export default {
  setup() {
    const transition = ref<NutAnimationName>('zoom')
    const dialogRef = ref<DialogInst>()
    const visible1 = ref(false)
    const visible2 = ref(false)
    const visible3 = ref(false)
    const visible4 = ref(false)
    const visible5 = ref(false)
    const visible6 = ref(false)
    const closeContent = ref('')
    const content = ref('<p style=\'color:red\'>html</p><img src=\'https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif\' />')
    const sleep = () => new Promise(resolve => setTimeout(resolve, 1000))
    const countDown = (second: number) => `倒计时 ${second} 秒`

    const onCancel = () => {
      uni.showToast({ title: 'event cancel' })
    }
    const onOk = () => {
      uni.showToast({ title: 'event ok' })
    }

    const baseClick = (): void => {
      visible1.value = true
    }
    const htmlClick = () => {
      visible6.value = true
    }
    const noTitleClick = () => {
      visible2.value = true
    }
    const tipsClick = () => {
      visible3.value = true
    }

    const componentClick = () => {
      closeContent.value = '点击确定时3s后关闭'
      visible4.value = true
    }

    const verticalClick = () => {
      visible5.value = true
    }

    const refClick = () => {
      dialogRef.value?.showDialog({
        title: '通过ref调用',
        content: '使用ref调用可以只写一个dialog组件',
        noFooter: true,
      })

      setTimeout(() => {
        dialogRef.value?.onOk()
      }, 2000)
    }

    return {
      visible1,
      visible2,
      visible3,
      visible4,
      visible5,
      visible6,
      onCancel,
      onOk,
      closeContent,
      baseClick,
      noTitleClick,
      componentClick,
      tipsClick,
      verticalClick,
      htmlClick,
      refClick,
      isH5,
      content,
      dialogRef,
      transition,
    }
  },
}
</script>

<template>
  <div class="demo">
    <nut-cell title="基础弹框" @click="baseClick" />
    <nut-dialog v-model:visible="visible1" title="基础弹框" content="这是基础弹框。" @cancel="onCancel" @ok="onOk" />

    <nut-cell title="支持富文本 html" @click="htmlClick" />
    <nut-dialog v-model:visible="visible6" :content="content" @cancel="onCancel" @ok="onOk" />
    <nut-cell title="无标题弹框" @click="noTitleClick" />
    <nut-dialog v-model:visible="visible2" content="这是无标题弹框。" @cancel="onCancel" @ok="onOk" />

    <nut-cell title="提示弹框" @click="tipsClick" />
    <nut-dialog
      v-model:visible="visible3"
      no-cancel-btn
      title="温馨提示"
      content="这是提示弹框。"
      @cancel="onCancel"
      @ok="onOk"
    />

    <nut-cell title="底部按钮 垂直使用" @click="verticalClick" />
    <nut-dialog
      v-model:visible="visible5"
      footer-direction="vertical"
      teleport="#app"
      title="温馨提示"
      content="这是提示弹框。"
    />
    <nut-cell title="ref调用" @click="refClick" />
    <nut-dialog ref="dialogRef" :transition="transition" />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Dialog"
  }
}
</route>
