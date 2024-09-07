<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import Icon from '../icon/icon.vue'
import { buttonEmits, buttonProps } from './button'

const props = defineProps(buttonProps)

const emit = defineEmits(buttonEmits)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--${props.type}`]: !!props.type,
    [`${componentName}--${props.size}`]: !!props.size,
    [`${componentName}--${props.shape}`]: !!props.shape,
    [`${componentName}--plain`]: props.plain,
    [`${componentName}--block`]: props.block,
    [`${componentName}--disabled`]: props.disabled,
    [`${componentName}--loading`]: props.loading,
    [`${componentName}--hovercls`]: props.hoverClass !== 'button-hover',
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

<script lang="ts">
const componentName = `${PREFIX}-button`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
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
      <Icon v-if="loading" name="loading" class="nut-icon-loading" />
      <slot v-if="$slots.icon && !loading" name="icon" />
      <view v-if="$slots.default" :class="{ 'nut-button__text': $slots.icon || loading }">
        <slot />
      </view>
    </view>
  </button>
</template>

<style lang="scss">
@import './index';
</style>
