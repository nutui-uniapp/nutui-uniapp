<script lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, provide, reactive, ref } from 'vue'
import { onPageScroll } from '@dcloudio/uni-app'
import { PREFIX, refRandomId } from '../_constants'
import { useRect } from '../_hooks'
import Icon from '../icon/icon.vue'
import { getMainClass } from '../_utils'
import { menuProps } from './menu'

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
    const barId = `nut-menu__bar${refRandomId}`
    const offset = ref(0)
    const isScrollFixed = ref(false)
    const instance = getCurrentInstance() as ComponentInternalInstance

    function useChildren() {
      const publicChildren: any[] = reactive([])
      const internalChildren: any[] = reactive([])

      const linkChildren = (value?: any) => {
        const link = (child: any) => {
          if (child.proxy) {
            internalChildren.push(child)
            publicChildren.push(child.proxy as any)
          }
        }

        const removeLink = (child: any) => {
          if (child.proxy) {
            const internalIndex = internalChildren.indexOf(child)
            if (internalIndex > -1)
              internalChildren.splice(internalIndex, 1)

            const publicIndex = publicChildren.indexOf(child.proxy)
            if (internalIndex > -1)
              publicChildren.splice(publicIndex, 1)
          }
        }

        provide(
          'menuParent',
          Object.assign(
            {
              removeLink,
              link,
              children: publicChildren,
              internalChildren,
            },
            value,
          ),
        )
      }

      return {
        children: publicChildren,
        linkChildren,
      }
    }

    const { children, linkChildren } = useChildren()

    const opened = computed(() => children.some(item => item?.state?.showWrapper))

    const classes = computed(() => {
      return getMainClass(props, componentName, {
        'scroll-fixed': isScrollFixed.value,
      })
    })

    function updateOffset(children: any) {
      setTimeout(() => {
        useRect(barId, instance).then((rect: any) => {
          if (props.direction === 'down')
            offset.value = rect.bottom - 3

          else offset.value = uni.getSystemInfoSync().windowHeight - rect.top

          children.toggle()
        })
      }, 100)
    }

    linkChildren({ props, offset })

    function toggleItem(active: number) {
      children.forEach((item, index) => {
        if (index === active)
          updateOffset(item)

        else if (item.state.showPopup)
          item.toggle(false, { immediate: true })
      })
    }

    function onScroll(res: { scrollTop: number }) {
      const { scrollFixed } = props

      const scrollTop = res.scrollTop

      isScrollFixed.value = scrollTop > (typeof scrollFixed === 'boolean' ? 30 : Number(scrollFixed))
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

    onPageScroll((res) => {
      const { scrollFixed } = props
      if (scrollFixed)
        onScroll(res)
    })
    return {
      barId,
      toggleItem,
      children,
      opened,
      classes,
      refRandomId,
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
