<script setup lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { PREFIX } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { subsidenavbarEmits, subsidenavbarProps } from './subsidenavbar'

const props = defineProps(subsidenavbarProps)
const emit = defineEmits(subsidenavbarEmits)
const direction = ref('')
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})
const style = computed(() => {
  return {
    height: !direction.value ? 'auto' : '0px',
  }
})
function handleClick() {
  emit('titleClick')
  direction.value = !direction.value ? 'up' : ''
}
onMounted(() => {
  direction.value = props.open ? '' : 'up'
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-sub-side-navbar`

export default defineComponent({
  name: componentName,
})
</script>

<template>
  <view :class="classes" :ikey="ikey">
    <view class="nut-sub-side-navbar__title" @click.stop="handleClick">
      <span class="nut-sub-side-navbar__title__text">{{ title }}</span>
      <span class="nut-sub-side-navbar__title__icon">
        <NutIcon v-if="!direction" custom-class="icon" name="arrow-down2" size="12px" />
        <NutIcon v-else name="arrow-up2" size="12px" />
      </span>
    </view>
    <view
      v-show="!direction"
      class="nut-sub-side-navbar__list"
      :class="!direction ? 'nutFadeIn' : 'nutFadeOut'"
      :style="style"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
