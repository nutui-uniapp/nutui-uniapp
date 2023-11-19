<script setup lang="ts">
import { computed, defineComponent, ref, useSlots } from 'vue'
import { CHOOSE_EVENT, CLOSE_EVENT, PREFIX, SELECT_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import type { CalendarInst } from '../calendaritem/type'
import NutPoPUp from '../popup/popup.vue'
import NutCalendarItem from '../calendaritem/calendaritem.vue'
import { calendarEmits, calendarProps } from './calendar'

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)
const slots = useSlots()
defineExpose({
  scrollToDate,
  initPosition,
})
const showTopBtn = computed(() => {
  return slots.btn
})
const topInfo = computed(() => {
  return slots.topInfo
})
const dayInfo = computed(() => {
  return slots.day
})
const bottomInfo = computed(() => {
  return slots.bottomInfo
})
const footerInfo = computed(() => {
  return slots.footer
})
// element refs
const calendarRef = ref<null | CalendarInst>(null)
function scrollToDate(date: string) {
  calendarRef.value?.scrollToDate(date)
}
function initPosition() {
  calendarRef.value?.initPosition()
}

// methods
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

function closePopup() {
  close()
}
function select(param: string) {
  // close();
  emit(SELECT_EVENT, param)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-calendar`
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
  <NutPoPUp
    v-if="poppable"
    v-bind="props"
    :visible="visible"
    position="bottom"
    round
    closeable
    :custom-style="{ height: '85vh' }"
    @click-overlay="closePopup"
    @click-close-icon="closePopup"
  >
    <NutCalendarItem
      ref="calendarRef"
      :type="type"
      :is-auto-back-fill="isAutoBackFill"
      :poppable="poppable"
      :custom-class="customClass"
      :custom-style="customStyle"
      :title="title"
      :default-value="defaultValue"
      :start-date="startDate"
      :end-date="endDate"
      :confirm-text="confirmText"
      :start-text="startText"
      :end-text="endText"
      :show-today="showToday"
      :show-title="showTitle"
      :show-sub-title="showSubTitle"
      :to-date-animation="toDateAnimation"
      :first-day-of-week="firstDayOfWeek"
      :disabled-date="disabledDate"
      :footer-slot="footerSlot"
      @update="update"
      @close="close"
      @choose="choose"
      @select="select"
    >
      <template v-if="showTopBtn" #btn>
        <slot name="btn" />
      </template>
      <template v-if="dayInfo" #day="date">
        <slot name="day" :date="date.date" />
      </template>
      <template v-if="topInfo" #topInfo="date">
        <slot name="topInfo" :date="date.date" />
      </template>
      <template v-if="bottomInfo" #bottomInfo="date">
        <slot name="bottomInfo" :date="date.date" />
      </template>
      <template #footer="date">
        <slot name="footer" :date="date.date" />
      </template>
    </NutCalendarItem>
  </NutPoPUp>
  <NutCalendarItem
    v-else
    :type="type"
    :is-auto-back-fill="isAutoBackFill"
    :poppable="poppable"
    :title="title"
    :confirm-text="confirmText"
    :start-text="startText"
    :end-text="endText"
    :default-value="defaultValue"
    :start-date="startDate"
    :end-date="endDate"
    :show-title="showTitle"
    :show-sub-title="showSubTitle"
    :to-date-animation="toDateAnimation"
    :show-today="showToday"
    :first-day-of-week="firstDayOfWeek"
    :disabled-date="disabledDate"
    :footer-slot="footerSlot"
    @close="close"
    @choose="choose"
    @select="select"
  >
    <template v-if="showTopBtn" #btn>
      <slot name="btn" />
    </template>
    <template v-if="dayInfo" #day="date">
      <slot name="day" :date="date.date" />
    </template>
    <template v-if="topInfo" #topInfo="date">
      <slot name="topInfo" :date="date.date" />
    </template>
    <template v-if="bottomInfo" #bottomInfo="date">
      <slot name="bottomInfo" :date="date.date" />
    </template>
    <template v-if="footerInfo" #footer="date">
      <slot name="footer" :date="date.date" />
    </template>
  </NutCalendarItem>
</template>

<style lang="scss">
@import './index';
</style>
