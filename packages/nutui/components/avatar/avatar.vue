<script setup lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { PREFIX } from '../_utils'
import { AVATAR_KEY, type AvatarGroupProps } from '../avatargroup'
import { useInject } from '../_hooks'
import { avatarProps } from './avatar'

const props = defineProps(avatarProps)

const { size, shape, bgColor, color } = toRefs(props)
const sizeValue = ['large', 'normal', 'small']
const avatarRef = ref(null)

const { parent, index } = useInject<{ props: Required<AvatarGroupProps> }>(AVATAR_KEY)
const state = reactive({
  index: 1,
  showMax: false, // 是否显示的最大头像个数
  maxIndex: 0, // parent里的avatar的个数
})
const { showMax, maxIndex } = toRefs(state)

onMounted(() => {
  const children = parent?.internalChildren

  if (children)
    avatarLength(children)
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`nut-avatar-${size.value || parent?.props?.size || 'normal'}`]: true,
    [`nut-avatar-${shape.value || parent?.props?.shape || 'normal'}`]: true,
  }
})

const styles = computed(() => {
  return {
    width: sizeValue.includes(size.value) ? '' : `${size.value}px`,
    height: sizeValue.includes(size.value) ? '' : `${size.value}px`,
    backgroundColor: `${bgColor.value}`,
    color: `${color.value}`,
    marginLeft: state.index !== 1 && (parent?.props?.span ? `${parent?.props?.span}px` : ''),
    zIndex: parent?.props?.zIndex === 'right' ? `${Math.abs(state.maxIndex - state.index)}` : '',
  }
})

const maxStyles = computed(() => {
  return {
    backgroundColor: `${parent?.props?.maxBgColor}`,
    color: `${parent?.props?.maxColor}`,
  }
})

function avatarLength(children: any[]) {
  state.maxIndex = children.length
  state.index = index.value
  if (state.index === state.maxIndex && state.index !== parent?.props?.maxCount)
    state.showMax = true
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-avatar`

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
  <view
    v-if="showMax || !parent?.props?.maxCount || index <= Number(parent?.props?.maxCount)"
    ref="avatarRef"
    :style="!showMax ? styles : maxStyles"
    :class="classes"
  >
    <template v-if="!parent?.props?.maxCount || index <= Number(parent?.props?.maxCount)">
      <slot />
    </template>
    <!-- 折叠头像 -->
    <template v-if="showMax && parent?.props?.maxCount">
      {{
        parent?.props?.maxContent ? parent?.props?.maxContent : `+ ${maxIndex - +parent?.props?.maxCount}`
      }}
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
