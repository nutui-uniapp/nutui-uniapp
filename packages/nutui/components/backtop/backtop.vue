<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { backtopEmits, backtopProps } from './backtop'

const props = defineProps(backtopProps)

const emit = defineEmits(backtopEmits)

const backTop = ref(false)
const scrollTop = ref(1)
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    show: backTop.value,
  }
})
const style = computed(() => {
  return {
    right: `${props.right}px`,
    bottom: `${props.bottom}px`,
    zIndex: props.zIndex,
  }
})

function scroll(e: any) {
  scrollTop.value = 2
  backTop.value = e.detail.scrollTop >= props.distance
}

function click(e: MouseEvent) {
  scrollTop.value = 1
  emit('click', e)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-backtop`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view>
    <scroll-view
      :scroll-y="true"
      :style="{ height }"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      @scroll="scroll"
    >
      <slot name="content" />
    </scroll-view>
    <view :class="classes" :style="style" @click.stop="(click as any)">
      <slot name="icon">
        <NutIcon :custom-color="customColor" name="top" :size="19" custom-class="nut-backtop-main" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
