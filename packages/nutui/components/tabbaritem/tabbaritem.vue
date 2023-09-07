<script setup lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, inject, reactive, useSlots } from 'vue'
import { PREFIX } from '../_constants'
import NutBadge from '../badge/badge.vue'
import NutIcon from '../icon/icon.vue'
import type { provideData } from '../tabbar/type'
import { tabbaritemProps } from './tabbaritem'

const props = defineProps(tabbaritemProps)
const slots = useSlots()

function isHaveSlot(slot: string) {
  return slots[slot]
}
const parent = inject<provideData>('parent')
const state = reactive({
  unactiveColor: parent?.unactiveColor, // 未选中的颜色
  activeColor: parent?.activeColor, // 选中的颜色
  active: parent?.modelValue, // 是否选中
  index: 0,
})
function relation(child: ComponentInternalInstance): void {
  if (child.proxy) {
    parent?.children.push(child.proxy)
    const index = parent?.children.indexOf(child.proxy)
    state.index = (props.name ? props.name : index) as number
  }
}
relation(getCurrentInstance() as ComponentInternalInstance)
const active = computed(() => state.index === parent?.modelValue)
function change() {
  const key = props.name ? props.name : state.index
  let indexValue = null
  if (props.name) {
    indexValue = parent?.children.findIndex((item: { name: string | number }) => {
      return item.name === key
    })
  }
  parent?.changeIndex(indexValue !== null ? +indexValue! : +key, state.index)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-tabbar-item`

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
  <div
    class="nut-tabbar-item"
    :class="{ 'nut-tabbar-item__icon--unactive': !active }"
    :style="{
      color: active ? state.activeColor : state.unactiveColor,
    }"
    @click="change()"
  >
    <NutBadge v-bind="props">
      <view class="nut-tabbar-item_icon-box">
        <div v-if="isHaveSlot('icon')" class="nut-tabbar-item_icon-box_icon">
          <slot name="icon" :active="active" />
        </div>
        <view v-if="icon && !isHaveSlot('icon')">
          <NutIcon :name="icon" custom-class="nut-popover-item-img" />
        </view>

        <view
          class="nut-tabbar-item_icon-box_nav-word" :class="[
            { 'nut-tabbar-item_icon-box_big-word': !icon && !isHaveSlot('icon') },
          ]"
        >
          <slot>
            <view v-if="tabTitle">
              {{ tabTitle }}
            </view>
          </slot>
        </view>
      </view>
    </NutBadge>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
