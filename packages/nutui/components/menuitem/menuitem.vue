<script lang="ts">
import type { Ref } from 'vue'
import { computed, defineComponent, reactive } from 'vue'
import { CLOSE_EVENT, OPEN_EVENT, PREFIX } from '../_constants'
import PopUp from '../popup/popup.vue'
import Icon from '../icon/icon.vue'
import { getMainClass, getMainStyle } from '../_utils'
import { useInject } from '../_hooks'
import { MENU_KEY } from '../menu/menu'
import type { MenuProps } from '../menu'
import { type MenuItemOption, menuitemEmits, menuitemProps } from './menuitem'

const componentName = `${PREFIX}-menu-item`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
  components: {
    PopUp,
    Icon,
  },
  props: menuitemProps,
  emits: menuitemEmits,
  setup(props, { emit, expose }) {
    const state = reactive({
      showPopup: false,
      showWrapper: false,
    })

    const { parent } = useInject<{
      props: MenuProps
      offset: Ref<number>
    }>(MENU_KEY)

    const classes = computed(() => {
      return getMainClass(props, componentName, {
        'nut-hidden': !state.showWrapper,
      })
    })

    const styles = computed(() => {
      const obj = parent?.props.direction === 'down'
        ? { top: `${parent?.offset.value}px` }
        : { bottom: `${parent?.offset.value}px` }
      return getMainStyle(props, obj)
    })

    const placeholderElementStyle = computed(() => {
      const heightStyle = { height: `${parent?.offset.value}px` }

      if (parent?.props.direction === 'down')
        return { ...heightStyle, top: 0 }

      return { ...heightStyle, top: 'auto' }
    })

    const open = () => {
      // TODO 触发更新offset
      state.showPopup = true
      state.showWrapper = true
    }

    const close = () => {
      state.showPopup = false
    }

    const toggle = (show = !state.showPopup) => {
      if (show === state.showPopup)
        return

      if (show)
        open()
      else
        close()
    }

    const change = (value: MenuItemOption['value']) => {
      if (value === props.modelValue)
        return

      emit('update:modelValue', value)
      emit('change', value)
    }

    const renderTitle = () => {
      if (props.title)
        return props.title

      const match: any = props.options?.find((option: any) => option.value === props.modelValue)

      return match ? match.text : ''
    }

    const onClick = (option: MenuItemOption) => {
      state.showPopup = false

      emit('itemClick', option)

      change(option.value)
    }

    const handleClose = () => {
      state.showWrapper = false
    }

    const handleClickOutside = () => {
      state.showPopup = false
    }

    const handleVisible = (visible: boolean) => {
      if (visible)
        emit(OPEN_EVENT)

      else
        emit(CLOSE_EVENT)
    }

    expose({
      change,
      open,
      close,
      toggle,
    })

    return {
      classes,
      styles,
      placeholderElementStyle,
      renderTitle,
      state,
      parent,
      toggle,
      onClick,
      handleClose,
      handleVisible,
      handleClickOutside,
    }
  },
})
</script>

<template>
  <view :class="classes" :style="styles">
    <view
      class="nut-menu-item-placeholder-element"
      :class="{ 'nut-hidden': !state.showPopup, 'placeholder-element-up': parent?.props.direction === 'up' }"
      :style="placeholderElementStyle"
      @click="handleClickOutside"
    />
    <PopUp
      v-bind="$attrs"
      v-model:visible="state.showPopup"
      :custom-style="{ position: 'absolute' }"
      :overlay-style="{ position: 'absolute' }"
      :position="parent?.props.direction === 'down' ? 'top' : 'bottom'"
      :duration="parent?.props.duration"
      pop-class="nut-menu__pop"
      :destroy-on-close="false"
      :safe-area-inset-top="false"
      :overlay="parent?.props.overlay"
      :lock-scroll="parent?.props.lockScroll"
      :close-on-click-overlay="parent?.props.closeOnClickOverlay"
      @closed="handleClose"
      @open="handleVisible(true)"
      @close="handleVisible(false)"
    >
      <scroll-view :scroll-y="true">
        <view id="nut-menu-item__content" class="nut-menu-item__content">
          <view
            v-for="(option, index) in options"
            :key="index"
            class="nut-menu-item__option"
            :class="[{ active: option.value === modelValue }]"
            :style="{ 'flex-basis': `${100 / cols}%` }"
            @click="onClick(option)"
          >
            <view
              v-if="option.value === modelValue"
              class="nut-menu-item__span"
              :class="[option.value === modelValue ? activeTitleClass : inactiveTitleClass]"
            >
              <!-- #ifndef MP-WEIXIN -->
              <slot name="icon">
                <Icon name="Check" :custom-color="parent?.props.activeColor" />
              </slot>
              <!-- #endif -->
              <!-- #ifdef MP-WEIXIN -->
              <Icon :name="optionIcon" :custom-color="parent?.props.activeColor" />
              <!-- #endif -->
            </view>
            <view
              :class="[option.value === modelValue ? activeTitleClass : inactiveTitleClass]"
              :style="{ color: option.value === modelValue ? parent?.props.activeColor : '' }"
            >
              {{ option.text }}
            </view>
          </view>
          <slot />
        </view>
      </scroll-view>
    </PopUp>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
