<script lang="ts">
import { reactive, toRefs } from 'vue'
import { isH5 } from '@uni-helper/uni-env'

export default {
  setup() {
    const state = reactive({
      showBasic: false,
      showTop: false,
      showBottom: false,
      showLeft: false,
      showRight: false,
      showIcon: false,
      showIconPosition: false,
      showCloseIcon: false,
      showRound: false,
      showCombination: false,
      showPop1: false,
      showPop2: false,
      showTeleport: false,
    })
    return { ...toRefs(state), isH5 }
  },
}
</script>

<template>
  <div class="demo" :class="{ web: isH5 }">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell title="展示弹出层" is-link @click="showBasic = true" />
    <nut-popup v-model:visible="showBasic" pop-class="popclass" :z-index="100">
      <div :style="{ padding: '30px 50px' }">
        正文
      </div>
    </nut-popup>
    <h2 class="title">
      弹出位置
    </h2>
    <nut-cell title="顶部弹出" is-link @click="showTop = true" />
    <nut-popup v-model:visible="showTop" position="top" :custom-style="{ height: '10%' }" />
    <nut-cell title="底部弹出" is-link @click="showBottom = true" />
    <nut-popup v-model:visible="showBottom" position="bottom" :custom-style="{ height: '20%' }" />
    <nut-cell title="左侧弹出" is-link @click="showLeft = true" />
    <nut-popup v-model:visible="showLeft" position="left" :custom-style="{ width: '20%', height: '100%' }" />
    <nut-cell title="右侧弹出" is-link @click="showRight = true" />
    <nut-popup v-model:visible="showRight" position="right" :custom-style="{ width: '20%', height: '100%' }" />
    <h2 class="title">
      关闭图标
    </h2>
    <nut-cell title="关闭图标" is-link @click="showIcon = true" />
    <nut-popup v-model:visible="showIcon" position="bottom" closeable :custom-style="{ height: '20%' }" />
    <nut-cell title="图标位置" is-link @click="showIconPosition = true" />
    <nut-popup
      v-model:visible="showIconPosition"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :custom-style="{ height: '20%' }"
    />
    <nut-cell title="自定义图标" is-link @click="showCloseIcon = true" />
    <nut-popup
      v-model:visible="showCloseIcon"
      position="bottom"
      closeable
      close-icon-position="top-left"
      :custom-style="{ height: '20%' }"
    >
      <template #close-icon>
        <nut-icon name="heart" />
      </template>
    </nut-popup>
    <h2 class="title">
      圆角弹框
    </h2>
    <nut-cell title="圆角弹框" is-link @click="showRound = true" />
    <nut-popup v-model:visible="showRound" position="bottom" closeable round :custom-style="{ height: '30%' }" />
    <h2 class="title">
      多层堆叠
    </h2>
    <nut-cell title="多层堆叠" is-link @click="showPop1 = true" />
    <nut-popup v-model:visible="showPop1" :custom-style="{ padding: '30px 50px' }">
      <div @click="showPop2 = true">
        点击它
      </div>
    </nut-popup>
    <nut-popup v-model:visible="showPop2" :custom-style="{ padding: '30px 50px' }">
      正文
    </nut-popup>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Popup"
  }
}
</route>

<style lang="scss"></style>
