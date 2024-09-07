<script lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { computed, defineComponent, getCurrentInstance, ref } from 'vue'
import { PREFIX } from '../_constants'
import { useProvide, useRect } from '../_hooks'
import { getMainClass, getRandomId } from '../_utils'
import Icon from '../icon/icon.vue'
import { MENU_KEY, menuProps } from './menu'

const componentName = `${PREFIX}-menu`
export default defineComponent({
  name: componentName,
  components: { Icon },
  props: menuProps,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
  setup(props) {
    const barId = `nut-menu__bar${getRandomId()}`
    const offset = ref(0)
    const instance = getCurrentInstance() as ComponentInternalInstance

    const { children } = useProvide(MENU_KEY)({ props, offset })

    const opened = computed(() => children.some(item => item?.state?.showWrapper))

    const isScrollFixed = computed(() => {
      const { scrollFixed, scrollTop } = props

      if (!scrollFixed)
        return false

      return scrollTop > (typeof scrollFixed === 'boolean' ? 30 : Number(scrollFixed))
    })

    const classes = computed(() => {
      return getMainClass(props, componentName, {
        'scroll-fixed': isScrollFixed.value,
      })
    })

    function updateOffset(children: any) {
      setTimeout(() => {
        useRect(barId, instance).then((rect) => {
          if (props.direction === 'down')
            offset.value = rect.bottom! + uni.getSystemInfoSync().windowTop!

          else offset.value = uni.getSystemInfoSync().windowHeight - rect.top!

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

    return {
      barId,
      toggleItem,
      children,
      opened,
      classes,
      getClasses,
    }
  },
})
</script>

<template>
  <view :class="classes" :style="customStyle">
    <view :id="barId" class="nut-menu__bar" :class="{ opened }">
      <template v-for="(item, index) in children" :key="index">
        <view
          class="nut-menu__item"
          :class="{ disabled: item.disabled, active: item.state.showPopup }"
          :style="{ color: item.state.showPopup ? activeColor : '' }"
          @click="!item.disabled && toggleItem(index)"
        >
          <view class="nut-menu__title" :class="getClasses(item.state.showPopup)">
            <view class="nut-menu__title-text">
              {{ item.renderTitle() }}
            </view>
            <view class="nut-menu__title-icon">
              <!-- #ifdef MP-WEIXIN -->
              <Icon v-if="direction === 'up'" :name="upIcon" />
              <Icon v-else :name="downIcon" />
              <!-- #endif -->
              <!-- #ifndef MP-WEIXIN -->
              <slot name="icon">
                <Icon v-if="direction === 'up'" name="rect-up" />
                <Icon v-else name="rect-down" />
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
@import './index';
</style>
