<script setup lang="ts">
import { type ComponentInternalInstance, defineComponent, getCurrentInstance, onMounted, provide, reactive, ref, toRefs, watch } from 'vue'
import { PREFIX } from '../_utils'
import { tabbarEmits, tabbarProps } from './tabbar'

const props = defineProps(tabbarProps)
const emit = defineEmits(tabbarEmits)
const instance = getCurrentInstance() as ComponentInternalInstance
const { bottom, placeholder } = toRefs(props)
const mdValue = reactive({
  val: props.modelValue,
  children: [],
})
const height = ref()
function changeIndex(index: number, active: number | string) {
  emit('update:modelValue', active)
  parentData.modelValue = active

  emit('tabSwitch', parentData.children[index], active)
}
let parentData = reactive({
  children: mdValue.children,
  size: props.size,
  modelValue: mdValue.val,
  unactiveColor: props.unactiveColor,
  activeColor: props.activeColor,
  dot: props.dot,
  changeIndex,
})
provide('parent', parentData)
watch(
  () => props.modelValue,
  (value) => {
    parentData.modelValue = value
  },
)
onMounted(() => {
  if (bottom.value && placeholder.value) {
    setTimeout(() => {
      const query = uni.createSelectorQuery().in(instance)
      query.select('.nut-tabbar').boundingClientRect()
      query.exec((res) => {
        height.value = res[0].height
      })
    }, 500)
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-tabbar`

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
  <div :class="{ 'nut-tabbar__placeholder': bottom && placeholder }" :style="{ height: `${height}px` }">
    <view
      class="nut-tabbar"
      :class="{ 'nut-tabbar-bottom': bottom, 'nut-tabbar-safebottom': safeAreaInsetBottom }"
    >
      <slot />
    </view>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
