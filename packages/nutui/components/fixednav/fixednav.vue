<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { PREFIX, SELECTED_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import NutOverlay from '../overlay/overlay.vue'
import NutIcon from '../icon/icon.vue'
import { getMainClass, getMainStyle } from '../_utils'
import { fixednavEmits, fixednavProps } from './fixednav'

const props = defineProps(fixednavProps)
const emit = defineEmits(fixednavEmits)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    active: props.visible,
    [props.type]: true,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    ...props.position,
  })
})

const current = ref(-1)

function updateValue(value = !props.visible) {
  emit(UPDATE_VISIBLE_EVENT, value)
}
function selected(item: any, event: Event) {
  emit(SELECTED_EVENT, {
    item,
    event,
  })
  current.value = item.id
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-fixed-nav`
const { translate } = useTranslate(componentName)

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
  <view :class="classes" :style="styles">
    <NutOverlay v-if="overlay" :visible="visible" :z-index="200" @click="updateValue(false)" />
    <slot name="list">
      <view class="nut-fixed-nav__list">
        <view
          v-for="(item, index) in navList" :key="item.id || index"
          class="nut-fixed-nav__list-item" :class="{ active: item.id === current }" @click="selected(item, $event as any)"
        >
          <image :src="item.icon" />
          <view class="span">
            {{ item.text }}
          </view>
          <view v-if="item.num" class="b">
            {{ item.num }}
          </view>
        </view>
      </view>
    </slot>
    <div class="nut-fixed-nav__btn" @click="updateValue()">
      <slot name="btn">
        <NutIcon name="left" custom-color="#fff" />
        <view class="text">
          {{ visible ? activeText || translate('activeText') : unActiveText
            || translate('unActiveText') }}
        </view>
      </slot>
    </div>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
