<script setup lang="ts">
import { type CSSProperties, computed, defineComponent, onMounted, ref } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { SIDEN_NAVBAR_KEY, type SidenavbarProps } from '../sidenavbar'
import { useInject } from '../_hooks'
import { getMainClass } from '../_utils'
import { subsidenavbarEmits, subsidenavbarProps } from './subsidenavbar'

const props = defineProps(subsidenavbarProps)
const emit = defineEmits(subsidenavbarEmits)
const direction = ref('')
const classes = computed(() => {
  return getMainClass(props, componentName)
})
const Parent = useInject<{ props: Required<SidenavbarProps> }>(SIDEN_NAVBAR_KEY)

const paddingStyle = computed(() => {
  return {
    paddingLeft: `${Number(Parent.parent?.props?.offset)}px`,
  } as CSSProperties
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
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="classes" :style="customStyle" :ikey="ikey">
    <view class="nut-sub-side-navbar__title" :style="[paddingStyle]" @click.stop="handleClick">
      <text class="nut-sub-side-navbar__title__text">
        {{ title }}
      </text>
      <view class="nut-sub-side-navbar__title__icon">
        <NutIcon v-if="!direction" custom-class="icon" name="arrow-down2" size="12px" />
        <NutIcon v-else name="arrow-up2" size="12px" />
      </view>
    </view>
    <view
      v-show="!direction"
      class="nut-sub-side-navbar__list"
      :class="!direction ? 'nutFadeIn' : 'nutFadeOut'"
      :style="[style]"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
