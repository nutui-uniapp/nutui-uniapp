<script lang="ts" setup>
import { computed, getCurrentInstance, inject, reactive, useSlots } from 'vue'
import { getMainClass } from '../_utils'
import { stepProps } from './step'

const COMPONENT_NAME = 'nut-step'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(stepProps)

const slots = useSlots()

const instance = getCurrentInstance()!

const parent = inject('parent') as any

parent.relation(instance)

const state = reactive({
  dot: parent.props.progressDot,
})

const innerIndex = computed(() => parent.state.children.indexOf(instance) + 1)

const status = computed(() => {
  const activeIndex = innerIndex.value
  const current = Number(parent.props.current)

  if (activeIndex < current)
    return 'finish'

  return activeIndex === current ? 'process' : 'wait'
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}-${status.value}`]: true,
  })
})

function handleStepClick() {
  parent.onEmit(innerIndex.value)
}
</script>

<template>
  <view :class="classes" :style="props.customStyle" @click="handleStepClick">
    <view class="nut-step-head">
      <view class="nut-step-line" />

      <view class="nut-step-icon" :class="{ 'is-icon': !state.dot }">
        <view class="nut-step-icon-inner">
          <slot v-if="slots.icon" name="icon" />

          <template v-else>
            <view v-if="!state.dot" class="nut-step-inner">
              {{ innerIndex }}
            </view>
          </template>
        </view>
      </view>
    </view>

    <view class="nut-step-main">
      <view class="nut-step-title">
        <slot v-if="slots.title" name="title" />

        <view v-else>
          {{ props.title }}
        </view>
      </view>

      <view v-if="props.content || slots.content" class="nut-step-content">
        <slot v-if="slots.content" name="content" />

        <rich-text v-else :nodes="props.content" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
