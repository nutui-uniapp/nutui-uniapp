<script lang="ts" setup>
const searchValue = ref<string>('')
const searchValue1 = ref<string>('')
const searchValue2 = ref<string>('')
const searchValue3 = ref<string>('')
const searchValue4 = ref<string>('')
const searchValue5 = ref<string>('')
const searchValue6 = ref<string>('')

function onSearch(value: string | number) {
  // eslint-disable-next-line no-console
  console.log('搜索触发', value)
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <nut-searchbar v-model="searchValue" />

    <h2 class="title">
      设置搜索框形状
    </h2>
    <nut-searchbar shape="square" />

    <h2 class="title">
      搜索事件监听
    </h2>
    <nut-searchbar v-model="searchValue1" @search="onSearch" />

    <h2 class="title">
      显示搜索 icon
    </h2>
    <nut-searchbar v-model="searchValue2">
      <template #leftin>
        <nut-icon name="search2" />
      </template>
    </nut-searchbar>

    <h2 class="title">
      右侧添加搜索文字
    </h2>
    <nut-searchbar v-model="searchValue3" confirm-type="search">
      <template #rightout>
        搜索
      </template>
    </nut-searchbar>

    <h2 class="title">
      更改输入框内部及外部的背景样式
    </h2>
    <nut-searchbar
      v-model="searchValue4"
      background="linear-gradient(to right, #9866F0, #EB4D50)"
      input-background="#fff"
    />

    <h2 class="title">
      自定义清除按钮 icon
    </h2>
    <nut-searchbar v-model="searchValue6">
      <template #clear-icon>
        <image
          style="width: 20px; height: 20px;"
          src="https://img10.360buyimg.com/imagetools/jfs/t1/170133/30/22902/10546/61833626E32d7ccde/a7c373ba30de9a89.png"
        />
      </template>
    </nut-searchbar>

    <h2 class="title">
      显示全部 icon
    </h2>
    <nut-searchbar v-model="searchValue5">
      <template #leftout>
        <nut-icon name="left" />
      </template>
      <template #leftin>
        <nut-icon name="search2" />
      </template>
      <template #rightin>
        <nut-icon name="photograph" />
      </template>
      <template #rightout>
        <nut-icon name="message" />
      </template>
    </nut-searchbar>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "SearchBar"
  }
}
</route>
