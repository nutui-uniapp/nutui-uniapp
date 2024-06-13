<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import NutPopup from '../popup/popup.vue'
import NutIcon from '../icon/icon.vue'
import { CANCEL_EVENT, CHOOSE_EVENT, CLOSE_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import type { ActionSheetOption } from './actionsheet'
import { actionsheetEmits, actionsheetProps } from './actionsheet'

const COMPONENT_NAME = 'nut-action-sheet'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(actionsheetProps)

const emit = defineEmits(actionsheetEmits)

const slotDefault = !!useSlots().default

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

function isHighlight(item: ActionSheetOption) {
  return props.chooseTagValue && props.chooseTagValue === item[props.optionTag] ? props.customColor : ''
}

function cancelActionSheet() {
  emit(CANCEL_EVENT)
  emit(UPDATE_VISIBLE_EVENT, false)
}

function chooseItem(item: ActionSheetOption, index: number) {
  if (!item.disable && !item.loading) {
    emit(CHOOSE_EVENT, item, index)
    emit(UPDATE_VISIBLE_EVENT, false)
  }
}

function close() {
  if (props.closeAbled) {
    emit(CLOSE_EVENT)
    emit(UPDATE_VISIBLE_EVENT, false)
  }
}
</script>

<template>
  <NutPopup
    v-bind="props"
    :visible="props.visible"
    position="bottom"
    round
    :close-on-click-overlay="props.closeAbled"
    @click-overlay="close"
  >
    <view :class="classes" :style="props.customStyle">
      <view v-if="props.title" class="nut-action-sheet__title">
        {{ props.title }}
      </view>

      <slot />

      <view v-if="!slotDefault">
        <view v-if="props.description" class="nut-action-sheet__item nut-action-sheet__desc">
          {{ props.description }}
        </view>

        <view v-if="props.menuItems.length" class="nut-action-sheet__menu">
          <view
            v-for="(item, index) of props.menuItems"
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
              {{ item[props.optionTag] }}
            </view>

            <view class="nut-action-sheet__subdesc">
              {{ item[props.optionSubTag] }}
            </view>
          </view>
        </view>

        <view v-if="props.cancelTxt" class="nut-action-sheet__cancel" @click="cancelActionSheet">
          {{ props.cancelTxt }}
        </view>
      </view>
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import "./index";
</style>
