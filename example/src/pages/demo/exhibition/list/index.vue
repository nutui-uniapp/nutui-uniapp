<script lang="ts" setup>
const list = ref<number[]>([])

function getList(start: number) {
  return Array
    .from({ length: 100 })
    .fill(0)
    .map((_, index) => start + index + 1)
}

function onScrollBottom() {
  list.value = list.value.concat(getList(list.value.length))
}

onLoad(() => {
  list.value = getList(0)
})
</script>

<template>
  <div class="demo list-demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell>
      <nut-list :list-data="list" :height="50" @scroll-bottom="onScrollBottom">
        <template #default="{ item, index }">
          <view class="item">
            <text>item：{{ item }}</text>
            <text>index：{{ index }}</text>
          </view>
        </template>
      </nut-list>
    </nut-cell>
  </div>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #ffffff;
  background-color: #fa2c19;
  border-radius: 6px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "List"
  }
}
</route>
