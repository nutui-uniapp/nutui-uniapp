<script lang="ts">
import { defineComponent, ref } from 'vue'
import { isH5 } from '@uni-helper/uni-env'

export default defineComponent({

  setup() {
    const container = ref(null)
    return {
      container,
      isH5,
    }
  },
})
</script>

<template>
  <!-- TODO sticky在vite-plugin-uni-layouts下失效 -->
  <div class="demo sticky-demo" :class="{ web: isH5 }">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell>
      <nut-sticky top="60" :parent-height="1200">
        <nut-button type="primary">
          吸顶按钮
        </nut-button>
      </nut-sticky>
    </nut-cell>
  </div>
</template>

<style lang="scss">
.sticky-demo {
  overflow: auto !important;
}

.sticky-container {
  width: 100%;
  height: 300px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Sticky"
  }
}
</route>
