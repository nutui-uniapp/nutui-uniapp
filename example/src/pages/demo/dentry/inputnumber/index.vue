<script lang="ts" setup>
const value1 = ref(1)
const value2 = ref(0)
const value3 = ref(10)
const value4 = ref(0)
const value5 = ref(1)
const value6 = ref(5.5)
const value7 = ref(1)
const value8 = ref(1)
const value9 = ref(1)

function handleOverlimit() {
  // eslint-disable-next-line no-console
  console.log('超出限制事件触发')
}

function handleChange(value: number) {
  // eslint-disable-next-line no-console
  console.log('异步演示 2 秒后更改')

  setTimeout(() => {
    value7.value = value
  }, 2000)
}
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell>
      <nut-input-number v-model="value1" />
    </nut-cell>

    <h2 class="title">
      步长设置
    </h2>
    <nut-cell>
      <nut-input-number v-model="value2" step="5" />
    </nut-cell>

    <h2 class="title">
      限制输入范围
    </h2>
    <nut-cell>
      <nut-input-number
        v-model="value3"
        min="10"
        max="20"
        @overlimit="handleOverlimit"
      />
    </nut-cell>

    <h2 class="title">
      禁用状态
    </h2>
    <nut-cell>
      <nut-input-number v-model="value4" disabled />
    </nut-cell>

    <h2 class="title">
      禁用输入框
    </h2>
    <nut-cell>
      <nut-input-number v-model="value5" readonly />
    </nut-cell>

    <h2 class="title">
      支持小数
    </h2>
    <nut-cell>
      <nut-input-number
        v-model="value6"
        step="0.1"
        decimal-places="1"
      />
    </nut-cell>

    <h2 class="title">
      支持异步修改
    </h2>
    <nut-cell>
      <nut-input-number :model-value="value7" readonly @change="handleChange" />
    </nut-cell>

    <h2 class="title">
      自定义按钮大小
    </h2>
    <nut-cell>
      <nut-input-number v-model="value8" input-width="50" button-size="30" />
    </nut-cell>

    <h2 class="title">
      自定义按钮图标
    </h2>
    <nut-cell>
      <nut-input-number v-model="value9">
        <template #leftIcon>
          <nut-icon name="left" />
        </template>

        <template #rightIcon>
          <nut-icon name="right" />
        </template>
      </nut-input-number>
    </nut-cell>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "InputNumber"
  }
}
</route>
