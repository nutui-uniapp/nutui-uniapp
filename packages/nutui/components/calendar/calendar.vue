<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue'
import { CHOOSE_EVENT, CLOSE_EVENT, SELECT_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import type { CalendarInst } from '../calendaritem/type'
import NutPopup from '../popup/popup.vue'
import NutCalendarItem from '../calendaritem/calendaritem.vue'
import { calendarEmits, calendarProps } from './calendar'

const COMPONENT_NAME = 'nut-calendar'

// eslint-disable-next-line vue/define-macros-order
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

const visible = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit('update:visible', val)
  },
})

const calendarRef = ref<CalendarInst | null>(null)

function scrollToDate(date: string) {
  calendarRef.value?.scrollToDate(date)
}

function initPosition() {
  calendarRef.value?.initPosition()
}

function update() {
  emit(UPDATE_VISIBLE_EVENT, false)
}

function close() {
  emit(CLOSE_EVENT)
  emit(UPDATE_VISIBLE_EVENT, false)
}

function choose(param: string | object) {
  close()
  emit(CHOOSE_EVENT, param)
}

function opened() {
  if (props.defaultValue) {
    if (Array.isArray(props.defaultValue)) {
      if (props.defaultValue?.length)
        calendarRef.value?.scrollToDate(props.defaultValue?.[0])
    }
    else {
      calendarRef.value?.scrollToDate(props.defaultValue)
    }
  }
}

function select(param: string) {
  emit(SELECT_EVENT, param)
}

function onClickCloseIcon() {
  emit('clickCloseIcon')
}

function onClickOverlay() {
  emit('clickOverlay')
}

defineExpose({
  scrollToDate,
  initPosition,
})
</script>

<template>
  <NutPopup
    v-if="props.poppable"
    v-bind="props"
    v-model:visible="visible"
    :custom-style="{ height: '85vh' }"
    position="bottom"
    round
    closeable
    :destroy-on-close="false"
    @opened="opened"
    @click-close-icon="onClickCloseIcon"
    @click-overlay="onClickOverlay"
  >
    <NutCalendarItem
      ref="calendarRef"
      :custom-class="props.customClass"
      :custom-style="props.customStyle"
      :visible="visible"
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
      @update="update"
      @close="close"
      @choose="choose"
      @select="select"
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

  <NutCalendarItem
    v-else
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
    @close="close"
    @choose="choose"
    @select="select"
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

<style lang="scss">
@import "./index";
</style>
