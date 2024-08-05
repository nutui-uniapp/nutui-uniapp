<script lang="ts" setup>
const showPreview1 = ref(false)
const showPreview2 = ref(false)
const showPreview3 = ref(false)
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-loading-page :loading="showPreview1" @click="showPreview1 = false" />
    <nut-cell
      is-link
      title="基础用法"
      :show-icon="true"
      @click="showPreview1 = true"
    />

    <h2 class="title">
      自定义图片
    </h2>
    <nut-loading-page :loading="showPreview2" image="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png" @click="showPreview2 = false" />
    <nut-cell
      is-link
      title="自定义图片"
      :show-icon="true"
      @click="showPreview2 = true"
    />

    <h2 class="title">
      自定义加载动画模式
    </h2>
    <nut-loading-page
      custom-color="skyblue"
      loading-color="skyblue"
      bg-color="#e8e8e8"
      :loading="showPreview3"
      @click="showPreview3 = false"
    />
    <nut-cell
      is-link
      title="自定义加载动画模式"
      :show-icon="true"
      @click="showPreview3 = true"
    />
  </div>
</template>

<style lang="scss"></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "LoadingPage"
  }
}
</route>
