<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({

  setup() {
    const container = ref(null)
    return {
      container,
    }
  },
})
</script>

<template>
  <div class="demo sticky-demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-sticky :top="57">
      <nut-button type="primary">
        吸顶按钮
      </nut-button>
    </nut-sticky>
    <h2 class="title">
      吸顶距离
    </h2>
    <nut-sticky :top="120">
      <nut-button type="primary" style="margin-left: 50px">
        吸顶距离 120px
      </nut-button>
    </nut-sticky>
    <view style="height: 100vh" />
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Sticky"
  }
}
</route>
