<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const gradientColor = {
      '0%': '#FF5E5E',
      '100%': '#FFA062',
    }
    const percent = ref(30)
    const setAddVal = () => {
      if (percent.value >= 100)
        return

      percent.value += 10
    }
    const setReduceVal = () => {
      if (percent.value - 10 <= 0) {
        percent.value = 0
        return
      }
      percent.value -= 10
    }
    return {
      setAddVal,
      setReduceVal,
      percent,
      gradientColor,
    }
  },
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <div class="demo__piece">
      <nut-circle-progress :progress="20" />
    </div>
    <h2 class="title">
      环形进度条自定义宽度
    </h2>
    <div class="demo__piece">
      <nut-circle-progress :progress="50" stroke-width="10" />
    </div>

    <h2 class="title">
      环形进度条自定义颜色(支持渐变色)
    </h2>
    <div class="demo__piece">
      <nut-circle-progress :progress="50" color="red" />
      <nut-circle-progress :progress="100" :color="gradientColor" />
    </div>
    <h2 class="title">
      环形进度条自定义大小
    </h2>
    <div class="demo__piece">
      <nut-circle-progress :progress="50" radius="60" />
    </div>
    <h2 class="title">
      环形进度条自定义内容
    </h2>
    <div class="demo__piece">
      <nut-circle-progress :progress="50" radius="60">
        自定义
      </nut-circle-progress>
    </div>
    <h2 class="title">
      动态改变环形进度条的进度
    </h2>
    <div class="demo__piece">
      <nut-circle-progress :progress="percent" />
    </div>
    <div class="demo__btn">
      <nut-button type="primary" @click="setReduceVal">
        减少
      </nut-button>
      <nut-button type="primary" @click="setAddVal">
        增加
      </nut-button>
    </div>
  </div>
</template>

<style lang="scss">
.demo__btn {
  text-align: center;
  width: 100%;
  height: 50px;
  padding-top: 6px;
  .nut-button {
    margin-right: 10px;
  }
}

.demo__piece {
  display: flex;
  justify-content: center;
}
</style>
