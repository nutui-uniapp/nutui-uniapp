<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { PREFIX } from '../_constants'
import { useTranslate } from '../../locale'
import NutOverlay from '../overlay/overlay.vue'
import NutIcon from '../icon/icon.vue'
import { fixednavEmits, fixednavProps } from './fixednav'

const props = defineProps(fixednavProps)
const emit = defineEmits(fixednavEmits)

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    active: props.visible,
    [props.type]: true,
  }
})

const current = ref(-1)

function updateValue(value = !props.visible) {
  emit('update:visible', value)
}
function selected(item: any, event: Event) {
  emit('selected', {
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
  <view :class="classes" :style="position">
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
