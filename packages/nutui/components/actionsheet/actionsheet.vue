<script setup lang="ts">
import { computed, defineComponent, useSlots } from 'vue'
import NutPopup from '../popup/popup.vue'
import NutIcon from '../icon/icon.vue'
import { PREFIX } from '../_utils'
import { actionsheetEmits, actionsheetProps } from './actionsheet'

const props = defineProps(actionsheetProps)
const emit = defineEmits(actionsheetEmits)

const slotDefault = !!useSlots().default
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

function isHighlight(item: { [x: string]: string | boolean }) {
  return props.chooseTagValue && props.chooseTagValue === item[props.optionTag] ? props.customColor : ''
}

function cancelActionSheet() {
  emit('cancel')
  emit('update:visible', false)
}

function chooseItem(item: { disable: boolean; loading: boolean }, index: any) {
  if (!item.disable && !item.loading) {
    emit('choose', item, index)
    emit('update:visible', false)
  }
}

function close() {
  emit('close')
  emit('update:visible', false)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-action-sheet`

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
  <NutPopup v-bind="props" :visible="visible" position="bottom" round :close-on-click-overlay="closeAbled" @click-overlay="close">
    <view :class="classes">
      <view v-if="title" class="nut-action-sheet__title">
        {{ title }}
      </view>
      <slot />
      <view v-if="!slotDefault">
        <view v-if="description" class="nut-action-sheet__item nut-action-sheet__desc">
          {{ description }}
        </view>
        <view v-if="menuItems.length" class="nut-action-sheet__menu">
          <view
            v-for="(item, index) of menuItems"
            :key="index"
            class="nut-action-sheet__item"
            :class="{
              'nut-action-sheet__item--disabled': item.disable,
              'nut-action-sheet__item--loading': item.loading,
            }"
            :style="{ color: isHighlight(item) || item.color }"
            @click="chooseItem(item, index)"
          >
            <NutIcon v-if="item.loading" name="loading" />
            <view v-else>
              {{ item[optionTag] }}
            </view>
            <view class="nut-action-sheet__subdesc">
              {{ item[optionSubTag] }}
            </view>
          </view>
        </view>
        <view v-if="cancelTxt" class="nut-action-sheet__cancel" @click="cancelActionSheet">
          {{ cancelTxt }}
        </view>
      </view>
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import './index';
</style>
