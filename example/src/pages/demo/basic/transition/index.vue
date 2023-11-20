<script setup lang="ts">
import { ref } from 'vue'
import type { NutAnimationName } from 'nutui-uniapp'

const showValue = ref(false)
const transitionName = ref('')
function show(name: string) {
  transitionName.value = name
  showValue.value = true
}

function log(msg: string) {
  // eslint-disable-next-line no-console
  return console.log(`[${transitionName.value}] ${msg}`)
}
</script>

<template>
  <div class="demo h-100vh!">
    <nut-transition
      :show="showValue" :name="transitionName as NutAnimationName" :duration="200" timing-function="ease-in"
      custom-class="fixed top-50 bottom-50 left-20 right-20 h-50 z-200 bg-primary rounded-lg flex items-center justify-center" @before-enter="log('before-enter')"
      @enter="log('enter')" @after-enter="log('after-enter')" @before-leave="log('before-leave')" @leave="log('leave')"
      @after-leave="log('after-leave')"
    >
      <div
        class="h-full flex items-center justify-center text-white w-full"
        @click="showValue = false"
      >
        内容
      </div>
    </nut-transition>

    <div class="p-4">
      基础用法
    </div>
    <nut-cell-group inset divider arrow>
      <nut-cell title="Fade" @click="show('fade')" />
      <nut-cell title="Fade Up" @click="show('fade-up')" />
      <nut-cell title="Fade Down" @click="show('fade-down')" />
      <nut-cell title="Fade Left" @click="show('fade-left')" />
      <nut-cell title="Fade Right" @click="show('fade-right')" />
      <nut-cell title="Slide Up" @click="show('slide-up')" />
      <nut-cell title="Slide Down" @click="show('slide-down')" />
      <nut-cell title="Slide Left" @click="show('slide-left')" />
      <nut-cell title="Slide Right" @click="show('slide-right')" />
      <nut-cell title="Zoom" @click="show('zoom')" />
    </nut-cell-group>
  </div>
</template>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Transition"
  }
}
</route>

<style lang="scss"></style>
