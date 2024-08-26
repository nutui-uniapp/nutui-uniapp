<script lang="ts" setup>
import { computed, getCurrentInstance, ref } from 'vue'
import { useProvide, useRect } from '../_hooks'
import NutIcon from '../icon/icon.vue'
import { getMainClass, getRandomId } from '../_utils'
import { MENU_KEY, menuProps } from './menu'

const COMPONENT_NAME = 'nut-menu'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(menuProps)

const instance = getCurrentInstance()!

const barId = `nut-menu__bar${getRandomId()}`

const offset = ref(0)

const { children } = useProvide(MENU_KEY)({ props, offset })

const isScrollFixed = computed(() => {
  const { scrollFixed, scrollTop } = props

  if (!scrollFixed)
    return false

  return scrollTop > (typeof scrollFixed === 'boolean' ? 30 : Number(scrollFixed))
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    'scroll-fixed': isScrollFixed.value,
  })
})

const opened = computed(() => children.some(item => item?.state?.showWrapper))

function updateOffset(children: any) {
  setTimeout(() => {
    useRect(barId, instance).then((rect) => {
      if (props.direction === 'down')
        offset.value = rect.bottom! + uni.getSystemInfoSync().windowTop!

      else
        offset.value = uni.getSystemInfoSync().windowHeight - rect.top!

      children.toggle()
    })
  }, 100)
}

function toggleItem(active: number) {
  children.forEach((item, index) => {
    if (index === active)
      updateOffset(item)

    else if (item.state.showPopup)
      item.toggle(false, { immediate: true })
  })
}

function getClasses(showPopup: boolean) {
  let str = ''
  const { titleClass } = props

  if (showPopup)
    str += 'active'

  if (titleClass)
    str += ` ${titleClass}`

  return str
}
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view :id="barId" class="nut-menu__bar" :class="{ opened }">
      <template v-for="(item, index) in children" :key="index">
        <view
          class="nut-menu__item"
          :class="{ disabled: item.disabled, active: item.state.showPopup }"
          :style="{ color: item.state.showPopup ? props.activeColor : '' }"
          @click="!item.disabled && toggleItem(index)"
        >
          <view class="nut-menu__title" :class="getClasses(item.state.showPopup)">
            <view class="nut-menu__title-text">
              {{ item.renderTitle() }}
            </view>

            <view class="nut-menu__title-icon">
              <!-- #ifdef MP-WEIXIN -->
              <NutIcon v-if="props.direction === 'up'" :name="props.upIcon" />
              <NutIcon v-else :name="props.downIcon" />
              <!-- #endif -->

              <!-- #ifndef MP-WEIXIN -->
              <slot name="icon">
                <NutIcon v-if="props.direction === 'up'" name="rect-up" />
                <NutIcon v-else name="rect-down" />
              </slot>
              <!-- #endif -->
            </view>
          </view>
        </view>
      </template>
    </view>

    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
