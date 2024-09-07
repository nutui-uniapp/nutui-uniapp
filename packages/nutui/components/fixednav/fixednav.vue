<script lang="ts" setup>
import { computed, ref } from 'vue'
import { SELECTED_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import { useTranslate } from '../../locale'
import NutIcon from '../icon/icon.vue'
import NutOverlay from '../overlay/overlay.vue'
import { fixednavEmits, fixednavProps } from './fixednav'

const COMPONENT_NAME = 'nut-fixed-nav'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(fixednavProps)

const emit = defineEmits(fixednavEmits)

const { translate } = useTranslate(COMPONENT_NAME)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
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

function selected(item: any, event: any) {
  emit(SELECTED_EVENT, {
    item,
    event,
  })

  current.value = item.id
}
</script>

<template>
  <view :class="classes" :style="styles">
    <NutOverlay
      v-if="props.overlay"
      :visible="props.visible"
      :z-index="200"
      @click="updateValue(false)"
    />

    <slot name="list">
      <view class="nut-fixed-nav__list">
        <view
          v-for="(item, index) in props.navList"
          :key="item.id || index"
          class="nut-fixed-nav__list-item"
          :class="{ active: item.id === current }"
          @click="selected(item, $event)"
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

    <view class="nut-fixed-nav__btn" @click="updateValue()">
      <slot name="btn">
        <NutIcon name="left" custom-color="#fff" />

        <view class="text">
          {{ props.visible ? props.activeText || translate('activeText') : props.unActiveText || translate('unActiveText') }}
        </view>
      </slot>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
