<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'
import {
  CHOOSE_EVENT,
  CLOSE_EVENT,
  CLOSED_EVENT,
  OPEN_EVENT,
  OPENED_EVENT,
  SELECT_EVENT,
  UPDATE_VISIBLE_EVENT,
} from '../_constants'
import { getMainClass } from '../_utils'
import NutCalendarItem from '../calendaritem/calendaritem.vue'
import type { CalendarInst } from '../calendaritem/types'
import NutPopup from '../popup/popup.vue'
import { calendarEmits, calendarProps } from './calendar'

const COMPONENT_NAME = 'nut-calendar'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(calendarProps)

const emit = defineEmits(calendarEmits)

const slots = useSlots()

const innerVisible = computed({
  get() {
    return props.visible
  },
  set(value) {
    emit('update:visible', value)
  },
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const popClasses = computed(() => {
  return `${COMPONENT_NAME}__popup ${props.popClass}`
})

const popStyles = computed(() => {
  return [{
    height: '85vh',
  }, props.popStyle]
})

const overlayClasses = computed(() => {
  return `${COMPONENT_NAME}__overlay ${props.overlayClass}`
})

const calendarRef = ref<CalendarInst | null>(null)

function scrollToDate(date: string) {
  calendarRef.value?.scrollToDate(date)
}

function initPosition() {
  calendarRef.value?.initPosition()
}

function close() {
  emit(UPDATE_VISIBLE_EVENT, false)
  emit(CLOSE_EVENT)
}

function choose(param: string | object) {
  close()

  emit(CHOOSE_EVENT, param)
}

function select(param: string) {
  emit(SELECT_EVENT, param)
}

function update() {
  emit(UPDATE_VISIBLE_EVENT, false)
}

function handleCloseIconClick() {
  emit('clickCloseIcon')
}

function handleOverlayClick() {
  emit('clickOverlay')
}

function handleOpen() {
  emit(OPEN_EVENT)
}

function handleOpened() {
  emit(OPENED_EVENT)

  if (props.defaultValue) {
    if (Array.isArray(props.defaultValue)) {
      if (props.defaultValue.length > 0) {
        scrollToDate(props.defaultValue[0])
      }
    }
    else {
      scrollToDate(props.defaultValue)
    }
  }
}

function handleClose() {
  emit(CLOSE_EVENT)
}

function handleClosed() {
  emit(CLOSED_EVENT)
}

defineExpose({
  scrollToDate,
  initPosition,
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <template v-if="props.poppable">
      <NutPopup
        v-model:visible="innerVisible"
        :custom-class="popClasses"
        :custom-style="popStyles"
        :overlay-class="overlayClasses"
        :overlay-style="props.overlayStyle"
        position="bottom"
        round
        :closeable="props.closeable"
        :close-icon="props.closeIcon"
        :close-icon-position="props.closeIconPosition"
        :z-index="props.zIndex"
        :lock-scroll="props.lockScroll"
        :overlay="props.overlay"
        :close-on-click-overlay="props.closeOnClickOverlay"
        :destroy-on-close="false"
        @click-close-icon="handleCloseIconClick"
        @click-overlay="handleOverlayClick"
        @open="handleOpen"
        @opened="handleOpened"
        @close="handleClose"
        @closed="handleClosed"
      >
        <NutCalendarItem
          ref="calendarRef"
          :custom-class="props.customClass"
          :custom-style="props.customStyle"
          :visible="innerVisible"
          :type="props.type"
          :is-auto-back-fill="props.isAutoBackFill"
          :poppable="props.poppable"
          :title="props.title"
          :default-value="props.defaultValue"
          :start-date="props.startDate"
          :end-date="props.endDate"
          :confirm-text="props.confirmText"
          :start-text="props.startText"
          :end-text="props.endText"
          :show-today="props.showToday"
          :show-title="props.showTitle"
          :show-sub-title="props.showSubTitle"
          :to-date-animation="props.toDateAnimation"
          :first-day-of-week="props.firstDayOfWeek"
          :disabled-date="props.disabledDate"
          :footer-slot="props.footerSlot"
          :btn-slot="props.btnSlot"
          @choose="choose"
          @select="select"
          @update="update"
          @close="close"
        >
          <template v-if="slots.btn" #btn>
            <slot name="btn" />
          </template>

          <template v-if="slots.day" #day="{ date }">
            <slot name="day" :date="date" />
          </template>

          <template v-if="slots.topInfo" #topInfo="{ date }">
            <slot name="topInfo" :date="date" />
          </template>

          <template v-if="slots.bottomInfo" #bottomInfo="{ date }">
            <slot name="bottomInfo" :date="date" />
          </template>

          <template v-if="slots.footer" #footer="{ date }">
            <slot name="footer" :date="date" />
          </template>
        </NutCalendarItem>
      </NutPopup>
    </template>

    <template v-else>
      <NutCalendarItem
        ref="calendarRef"
        :custom-class="props.customClass"
        :custom-style="props.customStyle"
        :type="props.type"
        :is-auto-back-fill="props.isAutoBackFill"
        :poppable="props.poppable"
        :title="props.title"
        :default-value="props.defaultValue"
        :start-date="props.startDate"
        :end-date="props.endDate"
        :confirm-text="props.confirmText"
        :start-text="props.startText"
        :end-text="props.endText"
        :show-today="props.showToday"
        :show-title="props.showTitle"
        :show-sub-title="props.showSubTitle"
        :to-date-animation="props.toDateAnimation"
        :first-day-of-week="props.firstDayOfWeek"
        :disabled-date="props.disabledDate"
        :footer-slot="props.footerSlot"
        :btn-slot="props.btnSlot"
        @choose="choose"
        @select="select"
        @close="close"
      >
        <template v-if="slots.btn" #btn>
          <slot name="btn" />
        </template>

        <template v-if="slots.day" #day="{ date }">
          <slot name="day" :date="date" />
        </template>

        <template v-if="slots.topInfo" #topInfo="{ date }">
          <slot name="topInfo" :date="date" />
        </template>

        <template v-if="slots.bottomInfo" #bottomInfo="{ date }">
          <slot name="bottomInfo" :date="date" />
        </template>

        <template v-if="slots.footer" #footer="{ date }">
          <slot name="footer" :date="date" />
        </template>
      </NutCalendarItem>
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
