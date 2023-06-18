<script setup lang="ts">
import { type Ref, computed, defineComponent, inject, onMounted, reactive, ref, toRefs } from 'vue'
import { PREFIX } from '../_utils'
import { avatarProps } from './avatar'

const props = defineProps(avatarProps)

const { size, shape, bgColor, color } = toRefs(props)
const sizeValue = ['large', 'normal', 'small']
const avatarGroup: any = inject('avatarGroup', null)
const avatarRef = ref(null) as Ref

const state = reactive({
  index: 1,
  showMax: false, // 是否显示的最大头像个数
  maxIndex: 0, // avatarGroup里的avatar的个数
})
const { index, showMax, maxIndex } = toRefs(state)

onMounted(() => {
  const children = avatarGroup?.avatarGroupRef?.value?.children
  if (children)
    avatarLength(children)
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`nut-avatar-${size.value || avatarGroup?.props?.size || 'normal'}`]: true,
    [`nut-avatar-${shape.value || avatarGroup?.props?.shape || 'normal'}`]: true,
  }
})

const styles = computed(() => {
  return {
    // width: sizeValue.includes(size.value) ? false : `${size.value}px`,
    // height: sizeValue.includes(size.value) ? false : `${size.value}px`,
    backgroundColor: `${bgColor.value}`,
    color: `${color.value}`,
    marginLeft: state.index !== 1 && (avatarGroup?.props?.span ? `${avatarGroup?.props?.span}px` : ''),
    zIndex: avatarGroup?.props?.zIndex === 'right' ? `${Math.abs(state.maxIndex - state.index)}` : '',
  }
})

const maxStyles = computed(() => {
  return {
    backgroundColor: `${avatarGroup?.props?.maxBgColor}`,
    color: `${avatarGroup?.props?.maxColor}`,
  }
})

function avatarLength(children: any) {
  state.maxIndex = children.length
  for (let i = 0; i < children.length; i++)
    children[i].setAttribute('data-index', i + 1)

  if (avatarRef?.value?.props)
    state.index = avatarRef?.value?.props['data-index']

  if (state.index === state.maxIndex && state.index !== avatarGroup?.props?.maxCount)
    state.showMax = true
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-avatar`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
  },
})
</script>

<template>
  <!-- 头像样式有问题 -->
  <view
    v-if="showMax || !avatarGroup?.props?.maxCount || index <= avatarGroup?.props?.maxCount"
    ref="avatarRef"
    :style="!showMax ? styles : maxStyles"
    :class="classes"
  >
    <template v-if="!avatarGroup?.props?.maxCount || index <= avatarGroup?.props?.maxCount">
      <slot />
    </template>
    <!-- 折叠头像 -->
    <template v-if="showMax && avatarGroup?.props?.maxCount">
      {{
        avatarGroup?.props?.maxContent ? avatarGroup?.props?.maxContent : `+ ${maxIndex - avatarGroup?.props?.maxCount}`
      }}
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
