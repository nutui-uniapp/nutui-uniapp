<script setup lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { computed, defineComponent, getCurrentInstance, inject, reactive } from 'vue'
import { PREFIX } from '../_constants'
import { stepEmits, stepProps } from './step'

const props = defineProps(stepProps)
const emit = defineEmits(stepEmits)
const instance = getCurrentInstance() as ComponentInternalInstance
const parent: any = inject('parent')
parent.relation(instance)

const state = reactive({
  dot: parent.props.progressDot,
})

const index = computed(() => parent.state.children.indexOf(instance) + 1)
function getCurrentStatus() {
  const activeIndex = index.value
  if (activeIndex < +parent.props.current)
    return 'finish'
  return activeIndex === +parent.props.current ? 'process' : 'wait'
}

const status = computed(() => {
  return getCurrentStatus()
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}-${status.value}`]: true,
  }
})

function handleClickStep() {
  parent.onEmit(index.value)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-step`

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
  <view :class="[classes]" @click="handleClickStep">
    <view class="nut-step-head">
      <view class="nut-step-line" />
      <view class="nut-step-icon" :class="[!state.dot ? 'is-icon' : '']">
        <view class="nut-step-icon-inner">
          <slot name="icon">
            <template v-if="state.dot" />
            <template v-else>
              <view class="nut-step-inner">
                {{ index }}
              </view>
            </template>
          </slot>
        </view>
      </view>
    </view>
    <view class="nut-step-main">
      <view class="nut-step-title">
        <view v-if="!$slots.title">
          {{ title }}
        </view>
        <slot name="title" />
      </view>
      <view v-if="content || $slots.content" class="nut-step-content">
        <view v-if="!$slots.content" v-html="content" />
        <slot name="content" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
