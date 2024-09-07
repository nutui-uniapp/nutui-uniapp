<script lang="ts" setup>
import { computed, defineComponent, useSlots } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { cellgroupProps } from './cellgroup'

const props = defineProps(cellgroupProps)

const slots = useSlots()

const classes = computed(() => {
  return getMainClass(props, componentName)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-cell-group`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <slot v-if="slots.title" name="title" />

    <template v-else>
      <view v-if="props.title" class="nut-cell-group__title">
        {{ props.title }}
      </view>
    </template>

    <slot v-if="slots.desc" name="desc" />

    <template v-else>
      <view v-if="props.desc" class="nut-cell-group__desc">
        {{ props.desc }}
      </view>
    </template>

    <view class="nut-cell-group__wrap">
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
