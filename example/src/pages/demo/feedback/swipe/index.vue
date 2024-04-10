<script lang="ts" setup>
import { ref } from 'vue'
import type { SwipeInts } from 'nutui-uniapp'

const swipe = ref<SwipeInts | null>(null)

const checked = ref<boolean>(false)

const number = ref<number>(0)

function onSwitchChange(value: boolean) {
  if (value)
    swipe.value?.open('left')
  else
    swipe.value?.close()
}

function onOpen(obj: any) {
  checked.value = true

  uni.showToast({ title: JSON.stringify(obj) })
}

function onClose(obj: any) {
  checked.value = false

  uni.showToast({ title: JSON.stringify(obj) })
}
</script>

<template>
  <div class="demo full h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-swipe>
      <nut-cell round-radius="0" title="左滑删除" />
      <template #right>
        <nut-button shape="square" custom-style="height: 100%" type="danger">
          删除
        </nut-button>
      </template>
    </nut-swipe>
    <h2 class="title">
      禁止滑动
    </h2>
    <nut-swipe disabled>
      <nut-cell round-radius="0" title="禁止滑动" />
      <template #right>
        <nut-button shape="square" custom-style="height: 100%" type="danger">
          删除
        </nut-button>
      </template>
    </nut-swipe>
    <h2 class="title">
      左右滑动
    </h2>
    <nut-swipe>
      <template #left>
        <nut-button shape="square" custom-style="height: 100%" type="success">
          选择
        </nut-button>
      </template>
      <nut-cell round-radius="0" title="左滑右滑都可以哦" />
      <template #right>
        <view style="height: 100%">
          <nut-button shape="square" custom-style="height: 100%" type="danger">
            删除
          </nut-button>
          <nut-button shape="square" custom-style="height: 100%" type="info">
            收藏
          </nut-button>
        </view>
      </template>
    </nut-swipe>
    <h2 class="title">
      异步控制
    </h2>
    <nut-swipe ref="swipe" :close-on-click="['right']" @open="onOpen" @close="onClose">
      <nut-cell title="异步打开关闭">
        <template #link>
          <nut-switch v-model="checked" active-text="开" inactive-text="关" @change="onSwitchChange" />
        </template>
      </nut-cell>
      <template #right>
        <nut-button shape="square" custom-style="height: 100%" type="danger">
          删除
        </nut-button>
      </template>
    </nut-swipe>
    <h2 class="title">
      自定义
    </h2>
    <nut-swipe>
      <template #left>
        <nut-button shape="square" custom-style="height: 100%" type="success">
          选择
        </nut-button>
      </template>
      <nut-cell title="商品描述">
        <template #link>
          <nut-input-number v-model="number" />
        </template>
      </nut-cell>
      <template #right>
        <view style="height: 100%">
          <nut-button shape="square" custom-style="height: 100%" type="danger">
            删除
          </nut-button>
          <nut-button shape="square" custom-style="height: 100%" type="info">
            收藏
          </nut-button>
        </view>
      </template>
    </nut-swipe>
    <h2 class="title">
      使用 SwipeGroup 控制 Swipe 之间互斥
    </h2>
    <nut-swipe-group lock>
      <nut-swipe name="11">
        <nut-cell round-radius="0" title="左滑删除" />
        <template #right>
          <nut-button shape="square" style="height: 100%" type="danger">
            删除
          </nut-button>
        </template>
      </nut-swipe>
      <nut-swipe name="22">
        <nut-cell round-radius="0" title="左滑删除" />
        <template #right>
          <nut-button shape="square" style="height: 100%" type="danger">
            删除
          </nut-button>
        </template>
      </nut-swipe>
      <div>
        <nut-swipe name="33">
          <nut-cell round-radius="0" title="左滑删除" />
          <template #right>
            <nut-button shape="square" style="height: 100%" type="danger">
              删除
            </nut-button>
          </template>
        </nut-swipe>
      </div>
    </nut-swipe-group>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Swipe"
  }
}
</route>

<style lang="scss" scoped></style>
