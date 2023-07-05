<script lang="ts">
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      val1: '',
      val2: '',
      text: '',
      password: '',
      number: '',
      digit: '',
      tel: '',
      readonly: '',
      disabled: '',
      showIcon: '',
      required: '',
      error1: '',
      error2: '',
      buttonVal: '',
      format1: '',
      format2: '',
      textarea: '',
      align1: '',
      align2: '',
      event: '',
      slotsValue: '',
      clear: '',
      clear2: '',
      adjustPosition: false,
      show: false,
      msg: '',
    })
    setTimeout(() => {
      // state.val1 = '异步数据';
    }, 2000)
    const showToast = (msg: string) => {
      state.show = true
      state.msg = msg
    }
    const clear = (value: string | number, event: Event) => {
      /* eslint-disable no-console */
      console.log('clear:', value, event)
      showToast('clear')
    }
    const clickInput = (value: string | number) => {
      console.log('clickInput:', value)
      showToast('clickInput')
    }
    const formatter = (value: string) => value.replace(/\d/g, '')
    const clearValue = () => {
      state.clear2 = ''
    }
    return {
      state,
      clear,
      clickInput,
      formatter,
      clearValue,
    }
  },
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <nut-input v-model="state.val1" type="text" placeholder="文本" />

    <h2 class="title">
      自定义类型
    </h2>
    <nut-input v-model="state.text" placeholder="文本" />
    <nut-input v-model="state.password" type="password" placeholder="密码" />
    <nut-input v-model="state.number" type="number" placeholder="数字" />
    <nut-input v-model="state.digit" type="digit" placeholder="整数" />

    <h2 class="title">
      禁用和只读
    </h2>
    <nut-input v-model="state.readonly" readonly placeholder="只读" />
    <nut-input v-model="state.disabled" disabled placeholder="禁用" />

    <h2 class="title">
      显示清除图标
    </h2>
    <nut-input v-model="state.clear" clearable clear-size="14" placeholder="显示清除图标" />
    <nut-input
      v-model="state.clear2"
      placeholder="自定义清除图标"
      clearable
      clear-size="14"
      show-word-limit
      max-length="50"
      :show-clear-icon="true"
    >
      <template #clear>
        <nut-icon name="close" width="12" height="12" size="12" @click="clearValue" />
      </template>
    </nut-input>
    <h2 class="title">
      配合表单使用
    </h2>
    <!-- <nut-form :model-value="state">
      <nut-form-item label-align="center" label="文本">
        <nut-input v-model="state.val2" placeholder="请输入文本" :border="false" />
      </nut-form-item>
    </nut-form> -->

    <h2 class="title">
      格式化输入内容
    </h2>
    <nut-input v-model="state.format1" error :formatter="formatter" placeholder="在输入时执行格式化" />
    <nut-input
      v-model="state.format2"
      :formatter="formatter"
      format-trigger="onBlur"
      placeholder="在失焦时执行格式化"
    />

    <h2 class="title">
      显示字数统计
    </h2>
    <nut-input
      v-model="state.textarea"
      type="text"
      show-word-limit
      rows="2"
      max-length="50"
      placeholder="留言"
      :adjust-position="state.adjustPosition"
    />

    <h2 class="title">
      无边框
    </h2>
    <nut-input v-model="state.disabled" :border="false" placeholder="无边框" />
    <nut-input v-model="state.showIcon" :border="false" placeholder="无边框" />

    <h2 class="title">
      事件演示
    </h2>
    <nut-input
      v-model="state.event"
      placeholder="事件演示"
      clearable
      :adjust-position="state.adjustPosition"
      @clear="clear"
      @click-input="clickInput"
    />
    <nut-toast v-model:visible="state.show" :msg="state.msg" type="text" />
    <h2 class="title">
      插槽演示
    </h2>
    <nut-input v-model="state.slotsValue" placeholder="插槽演示" clearable :adjust-position="state.adjustPosition">
      <template #left>
        <nut-icon name="ask" />
      </template>
      <template #right>
        <nut-button type="primary" size="small">
          获取验证码
        </nut-button>
      </template>
    </nut-input>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  .nut-placeholder {
    color: #ccc;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Input"
  }
}
</route>
