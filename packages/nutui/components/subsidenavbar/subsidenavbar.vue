<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, onMounted, ref } from 'vue'
import NutIcon from '../icon/icon.vue'
import type { SideNavbarProps } from '../sidenavbar'
import { SIDE_NAVBAR_KEY } from '../sidenavbar'
import { useInject } from '../_hooks'
import { getMainClass } from '../_utils'
import { subsidenavbarEmits, subsidenavbarProps } from './subsidenavbar'

const COMPONENT_NAME = 'nut-sub-side-navbar'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(subsidenavbarProps)

const emit = defineEmits(subsidenavbarEmits)

const { parent } = useInject<{ props: Required<SideNavbarProps> }>(SIDE_NAVBAR_KEY)

const direction = ref<'' | 'up'>('')

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const styles = computed<CSSProperties>(() => {
  return {
    height: !direction.value ? 'auto' : '0px',
  }
})

const paddingStyles = computed(() => {
  const value: CSSProperties = {}

  if (parent != null) {
    value.paddingLeft = `${Number(parent.props.offset)}px`
  }

  return value
})

function handleClick() {
  emit('titleClick')

  direction.value = !direction.value ? 'up' : ''
}

onMounted(() => {
  direction.value = props.open ? '' : 'up'
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view class="nut-sub-side-navbar__title" :style="[paddingStyles]" @click.stop="handleClick">
      <text class="nut-sub-side-navbar__title__text">
        {{ props.title }}
      </text>

      <view class="nut-sub-side-navbar__title__icon">
        <NutIcon
          v-if="!direction"
          custom-class="icon"
          name="arrow-down2"
          size="12px"
        />

        <NutIcon v-else name="arrow-up2" size="12px" />
      </view>
    </view>

    <view
      class="nut-sub-side-navbar__list"
      :class="[{ 'nut-hidden': !!direction }, direction ? 'nutFadeOut' : 'nutFadeIn']"
      :style="[styles]"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
