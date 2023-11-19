<script lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, inject, nextTick, onUnmounted, reactive, ref } from 'vue'
import { PREFIX } from '../_constants'
import PopUp from '../popup/popup.vue'
import Icon from '../icon/icon.vue'
import { useSelectorQuery } from '../_hooks'
import { getMainClass, getMainStyle } from '../_utils'
import { type MenuItemOption, menuitemEmits, menuitemProps } from './menuitem'

let _zIndex = 2000

const componentName = `${PREFIX}-menu-item`
export default defineComponent({
  name: componentName,
  components: {
    PopUp,
    Icon,
  },
  props: menuitemProps,
  emits: menuitemEmits,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
  setup(props, { emit }) {
    const state = reactive({
      zIndex: _zIndex,
      showPopup: false,
      transition: true,
      showWrapper: false,
      isShowPlaceholderElement: false,
    })
    const instance = getCurrentInstance() as ComponentInternalInstance
    const { query } = useSelectorQuery(instance)

    const useParent: any = () => {
      const parent = inject('menuParent', null)

      if (parent) {
        // 获取子组件自己的实例
        const instance = getCurrentInstance()!

        const { link, removeLink } = parent as any

        link(instance)

        onUnmounted(() => {
          removeLink(instance)
        })

        return {
          parent,
        }
      }
    }

    const { parent } = useParent()

    const classes = computed(() => {
      return getMainClass(props, componentName)
    })
    const styles = computed(() => {
      return getMainStyle(props, { zIndex: state.zIndex })
    })

    const placeholderElementStyle = computed(() => {
      const heightStyle = { height: `${parent.offset.value}px` }

      if (parent.props.direction === 'down')
        return { ...heightStyle, top: 0 }

      else
        return { ...heightStyle, top: 'auto' }
    })
    const contentHeight = ref('auto')
    const toggle = (show = !state.showPopup, _options: { immediate?: boolean } = {}) => {
      if (show) {
        nextTick(() => {
          setTimeout(() => {
            query.selectAll('#nut-menu-item__content').boundingClientRect()
            query.exec((res: any[]) => {
              const data = res[0]
              const _height = data.filter((item: { height: number }) => item.height > 0)
              contentHeight.value = `${_height?.[0]?.height}px`
            })
          }, 500)
        })
      }

      if (show === state.showPopup)
        return

      state.showPopup = show
      state.isShowPlaceholderElement = show
      // state.transition = !options.immediate;

      if (show) {
        state.showWrapper = true
        state.zIndex = ++_zIndex
      }
    }

    const renderTitle = () => {
      if (props.title)
        return props.title

      const match: any = props.options?.find((option: any) => option.value === props.modelValue)

      return match ? match.text : ''
    }

    const onClick = (option: MenuItemOption) => {
      state.showPopup = false
      state.isShowPlaceholderElement = false

      if (option.value !== props.modelValue) {
        emit('update:modelValue', option.value)
        emit('change', option.value)
      }
    }

    const handleClose = () => {
      state.showWrapper = false
      state.isShowPlaceholderElement = false
    }

    const handleClickOutside = () => {
      state.showPopup = false
    }

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
      handleClickOutside,
      contentHeight,
    }
  },

})
</script>

<template>
  <view v-show="state.showWrapper" :class="classes" :style="styles">
    <div
      v-show="state.isShowPlaceholderElement"
      class="nut-menu-item-placeholder-element"
      :class="{ 'placeholder-element-up': parent.props.direction === 'up' }"
      :style="placeholderElementStyle"
      @click="handleClickOutside"
    />
    <PopUp
      v-bind="$attrs"
      v-model:visible="state.showPopup"
      :z-index="state.zIndex - 2"
      :custom-style="
        parent.props.direction === 'down'
          ? {
            top: `${parent.offset.value}px`,
            height: state.showPopup ? contentHeight : 0,
          }
          : {
            bottom: `${parent.offset.value}px`,
            height: state.showPopup ? contentHeight : 0,
          }
      "
      :overlay-style="
        parent.props.direction === 'down'
          ? { top: `${parent.offset.value}px` }
          : { bottom: `${parent.offset.value}px`, top: 'auto' }
      "
      transition="fade"
      :position="parent.props.direction === 'down' ? 'top' : 'bottom'"
      :duration="parent.props.duration"
      pop-class="nut-menu__pop"
      :destroy-on-close="false"
      :overlay="parent.props.overlay"
      :lock-scroll="parent.props.lockScroll"
      :close-on-click-overlay="parent.props.closeOnClickOverlay"
      @closed="handleClose"
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
                <Icon name="Check" :custom-color="parent.props.activeColor" />
              </slot>
              <!-- #endif -->
              <!-- #ifdef MP-WEIXIN -->
              <Icon :name="optionIcon" :custom-color="parent.props.activeColor" />
              <!-- #endif -->
            </view>
            <view
              :class="[option.value === modelValue ? activeTitleClass : inactiveTitleClass]"
              :style="{ color: option.value === modelValue ? parent.props.activeColor : '' }"
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
