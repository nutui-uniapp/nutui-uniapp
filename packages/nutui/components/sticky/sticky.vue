<script setup lang="ts">
import { type CSSProperties, type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, onMounted, reactive, watch } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'
import { PREFIX } from '../_utils'
import { useRect } from '../_hooks'
import { stickyEmits, stickyProps } from './sticky'

const props = defineProps(stickyProps)
const emit = defineEmits(stickyEmits)
const instance = getCurrentInstance() as ComponentInternalInstance

const refRandomId = Math.random().toString(36).slice(-8)
const rootId = `rootRef-${refRandomId}`
const state = reactive({
  fixed: false,
  height: 0,
  width: 0,
})
const rootStyle = computed<CSSProperties | undefined>(() => {
  if (state.fixed)
    return { height: `${state.height}px` }
  return {}
})
const stickyStyle = computed<CSSProperties>(() => {
  if (!state.fixed)
    return {}
  return {
    top: `${props.top}px`,
    height: `${state.height}px`,
    width: `${state.width}px`,
    position: state.fixed ? 'fixed' : undefined,
    zIndex: Number(props.zIndex),
  }
})
function handleScroll() {
  useRect(rootId, instance).then((rootRect) => {
    state.height = rootRect.height
    state.width = rootRect.width
    state.fixed = Number(props.top) >= rootRect.top
  })
}
watch(
  () => state.fixed,
  (val) => {
    emit('change', val)
  },
)
if (props.scrollTop !== -1) {
  onPageScroll(() => {
    handleScroll()
  })
}

else { watch(() => props.scrollTop, handleScroll) }

onMounted(handleScroll)
</script>

<script lang="ts">
const componentName = `${PREFIX}-sticky`
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
  <view :id="rootId" class="nut-sticky" :style="rootStyle">
    <view class="nut-sticky__box" :style="stickyStyle">
      <slot />
    </view>
  </view>
</template>
