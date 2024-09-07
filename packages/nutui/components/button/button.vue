<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, useSlots } from 'vue'
import { CLICK_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { buttonEmits, buttonProps } from './button'

const COMPONENT_NAME = 'nut-button'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})

const props = defineProps(buttonProps)

const emit = defineEmits(buttonEmits)

const slots = useSlots()

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--${props.type}`]: !!props.type,
    [`${COMPONENT_NAME}--${props.size}`]: !!props.size,
    [`${COMPONENT_NAME}--${props.shape}`]: !!props.shape,
    [`${COMPONENT_NAME}--plain`]: props.plain,
    [`${COMPONENT_NAME}--block`]: props.block,
    [`${COMPONENT_NAME}--disabled`]: props.disabled,
    [`${COMPONENT_NAME}--loading`]: props.loading,
    [`${COMPONENT_NAME}--hovercls`]: props.hoverClass !== 'button-hover',
  })
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (props.customColor) {
    if (props.plain) {
      value.color = props.customColor
      value.background = '#fff'

      if (!props.customColor.includes('gradient'))
        value.borderColor = props.customColor
    }
    else {
      value.color = '#fff'
      value.background = props.customColor
    }
  }

  return getMainStyle(props, value)
})

function handleClick(event: any) {
  if (props.disabled || props.loading)
    return

  emit(CLICK_EVENT, event)
}
</script>

<template>
  <button
    :class="classes"
    :style="styles"
    :form-type="props.formType === 'button' ? undefined : props.formType"
    :open-type="props.disabled || props.loading ? undefined : props.openType"
    :hover-class="props.hoverClass"
    :hover-start-time="props.hoverStartTime"
    :hover-stay-time="props.hoverStayTime"
    hover-stop-propagation
    :lang="props.lang"
    :session-from="props.sessionFrom"
    :send-message-title="props.sendMessageTitle"
    :send-message-path="props.sendMessagePath"
    :send-message-img="props.sendMessageImg"
    :show-message-card="props.showMessageCard"
    :group-id="props.groupId"
    :guild-id="props.guildId"
    :public-id="props.publicId"
    :data-im-id="props.dataImId"
    :data-im-type="props.dataImType"
    :data-goods-id="props.dataGoodsId"
    :data-order-id="props.dataOrderId"
    :data-biz-line="props.dataBizLine"
    @click="handleClick"
    @getphonenumber="emit('getphonenumber', $event)"
    @getuserinfo="emit('getuserinfo', $event)"
    @error="emit('error', $event)"
    @opensetting="emit('opensetting', $event)"
    @addgroupapp="emit('addgroupapp', $event)"
    @chooseaddress="emit('chooseaddress', $event)"
    @chooseavatar="emit('chooseavatar', $event)"
    @chooseinvoicetitle="emit('chooseinvoicetitle', $event)"
    @launchapp="emit('launchapp', $event)"
    @login="emit('login', $event)"
    @subscribe="emit('subscribe', $event)"
    @contact="emit('contact', $event)"
    @agreeprivacyauthorization="emit('agreeprivacyauthorization', $event)"
    @im="emit('im', $event)"
  >
    <view class="nut-button__wrap">
      <NutIcon v-if="props.loading" name="loading" class="nut-icon-loading" />

      <slot v-if="slots.icon && !props.loading" name="icon" />

      <view v-if="slots.default" :class="{ 'nut-button__text': slots.icon || props.loading }">
        <slot />
      </view>
    </view>
  </button>
</template>

<style lang="scss">
@import "./index";
</style>
