<script lang="ts">
import { ref } from 'vue'

export default {
  props: {},
  setup() {
    const value = ref('')
    const value2 = ref('')
    const value3 = ref('')
    const value4 = ref('textarea \n 只读状态')

    return {
      value,
      value2,
      value3,
      value4,
    }
  },
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <nut-textarea v-model="value" />
    <h2 class="title">
      显示字数统计
    </h2>
    <nut-textarea v-model="value2" limit-show max-length="20" />
    <h2 class="title">
      高度自定义，拉伸
    </h2>
    <nut-textarea v-model="value3" autosize />
    <h2 class="title">
      只读、禁用
    </h2>
    <nut-textarea v-model="value4" readonly />
    <nut-textarea disabled model-value="textarea 禁用状态" />
  </div>
</template>

<style lang="scss">
.nut-textarea__textarea__readonly {
  background-color: #f9f9f9;
}
.nut-textarea--disabled {
  textarea {
    padding: 5px 10px;
    height: 30px;
    background-color: #f9f9f9;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Textarea"
  }
}
</route>
