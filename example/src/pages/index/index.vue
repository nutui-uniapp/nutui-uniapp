<script setup lang="ts">
const theme = ref('dark')
const themeVars = reactive({
  primaryColor: '#008000',
  primaryColorEnd: '#008000',
})
const state = reactive({
  end: Date.now() + 60 * 1000,
})
const countdown = ref(null)
function reset() {
  console.log(countdown.value.paused)

  countdown.value.start()
  setTimeout(() => {
    countdown.value?.paused()
  }, 3000)
}
</script>

<template>
  <nut-config-provider :theme-vars="themeVars" :theme="theme">
    <view class="content">
      <nut-button size="small" type="primary">
        sjanj
      </nut-button>
      <nut-button disabled plain type="primary">
        禁用状态
      </nut-button>
      <nut-button disabled type="primary">
        禁用状态
      </nut-button>
      <nut-button loading>
        牛逼
      </nut-button>
      <nut-button size="large" type="primary">
        大号按钮
      </nut-button>
      <nut-button color="#7232dd">
        单色按钮
      </nut-button>
      <nut-button color="#7232dd" plain>
        单色按钮
      </nut-button>
      <nut-button style="width:100px" plain type="primary">
        <template #icon>
          <nut-icon name="star" />
        </template>
      </nut-button>
      <nut-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="reset">
        渐变色按钮
      </nut-button>
      <nut-icon :size="40" color="skyblue" name="loading" />
      <nut-icon :size="40" color="skyblue" name="date" />
      <nut-countdown :end-time="state.end" />
      <nut-countdown ref="countdown" time="20000" :auto-start="false" format="ss:SS" />
    </view>
  </nut-config-provider>
</template>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;

  gap: 10px;
}
</style>
