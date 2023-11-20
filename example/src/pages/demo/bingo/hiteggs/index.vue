<script lang="ts">
export default {
  props: {},
  setup() {
    const hit = () => {
      uni.showToast({
        animation: true,
        title: '中奖了',
      })
    }

    return {
      hit,
    }
  },
}
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-hiteggs :num="9" @click="hit" />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "HitEggs"
  }
}
</route>
