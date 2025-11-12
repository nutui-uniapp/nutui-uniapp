<script lang="ts" setup>
const state = reactive({
  val1: '',
  val2: '',
  val3: '',
  val4: '',
})

function change(e: any) {
  // eslint-disable-next-line no-console
  console.log(`内容改变，当前值为：${e}`)
}
function finish(e: any) {
  uni.showToast({
    title: `输入结束，当前值为：${e}`,
    icon: 'none',
  })
}
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-code-input v-model="state.val1" />

    <h2 class="title">
      横线模式
    </h2>
    <nut-code-input v-model="state.val1" mode="line" />
    <h2 class="title">
      设置长度
    </h2>
    <nut-code-input v-model="state.val2" :maxlength="6" />

    <h2 class="title">
      横线间距
    </h2>
    <nut-code-input v-model="state.val2" :space="0" />
    <h2 class="title">
      细边框
    </h2>
    <nut-code-input
      v-model="state.val2"
      mode="box"
      :space="0"
      :maxlength="4"
      hairline
    />

    <h2 class="title">
      调整颜色
    </h2>
    <nut-code-input
      v-model="state.val3"
      hairline
      custom-color="#f56c6c"
      :border-color="`#f56c6c` as any"
    />

    <h2 class="title">
      用"●"替代输入内容
    </h2>
    <nut-code-input v-model="state.val3" dot />

    <h2 class="title">
      是否自动获取焦点
    </h2>
    <nut-code-input v-model="state.val4" :focus="true" />

    <h2 class="title">
      事件演示
    </h2>
    <nut-code-input @change="change" @finish="finish" />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "CodeInput"
  }
}
</route>
