<script lang="ts">
import { getCurrentInstance, reactive, ref, toRefs } from 'vue'
import { isH5 } from '@uni-helper/uni-env'

const activeColor = ref('red')
export default {
  setup() {
    const { proxy } = getCurrentInstance() as any
    const data = reactive({
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked6: true,
      checked7: true,
      checked8: true,
    })
    const checkedAsync = ref(true)
    const loadingAsync = ref(false)

    const change = (value: boolean, event?: Event) => {
      uni.showToast({ title: `value：${value}` })
    }
    const changeAsync = (value: boolean, event?: Event) => {
      uni.showToast({ title: `2秒后异步触发 ${value}` })

      loadingAsync.value = true
      setTimeout(() => {
        checkedAsync.value = value
        loadingAsync.value = false
      }, 2000)
    }

    return {
      ...toRefs(data),
      checkedAsync,
      loadingAsync,
      change,
      changeAsync,
      isH5,
      activeColor,
    }
  },
}
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-cell>
      <nut-switch v-model="checked1" />
    </nut-cell>

    <h2 class="title">
      禁用状态
    </h2>
    <nut-cell>
      <nut-switch v-model="checked2" disable />
    </nut-cell>

    <h2 class="title">
      加载状态
    </h2>
    <nut-cell>
      <nut-switch v-model="checked3" :active-color="activeColor" loading />
    </nut-cell>

    <h2 class="title">
      change事件
    </h2>
    <nut-cell>
      <nut-switch v-model="checked4" @change="change" />
    </nut-cell>

    <h2 class="title">
      异步控制
    </h2>
    <nut-cell>
      <nut-switch :model-value="checkedAsync" :loading="loadingAsync" @change="changeAsync" />
    </nut-cell>

    <h2 class="title">
      自定义颜色
    </h2>
    <nut-cell>
      <nut-switch v-model="checked6" :active-color="activeColor" />
    </nut-cell>

    <h2 class="title">
      支持文字
    </h2>
    <nut-cell>
      <nut-switch v-model="checked7" active-text="开" inactive-text="关" />
    </nut-cell>

    <h2 class="title">
      自定义加载图标
    </h2>
    <nut-cell>
      <nut-switch v-model="checked8" loading>
        <template #icon>
          <nut-icon name="loading" color="blue" />
        </template>
      </nut-switch>
    </nut-cell>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Switch"
  }
}
</route>
