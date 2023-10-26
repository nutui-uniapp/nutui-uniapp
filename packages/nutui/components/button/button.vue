<script lang="ts" setup>
import { type CSSProperties, defineComponent } from 'vue'
import { computed, toRefs } from 'vue'
import Icon from '../icon/icon.vue'
import { PREFIX } from '../_constants'
import { buttonEmits, buttonProps } from './button'

const props = defineProps(buttonProps)

const emits = defineEmits(buttonEmits)

const { type, size, shape, disabled, loading, customColor, plain, block } = toRefs(props)

function handleClick(event: MouseEvent) {
  if (!loading.value && !disabled.value)
    emits('click', event)
}

const classes = computed(() => {
  return {
    [componentName]: true,
    [`${componentName}--${type.value}`]: type.value,
    [`${componentName}--${size.value}`]: size.value,
    [`${componentName}--${shape.value}`]: shape.value,
    [`${componentName}--plain`]: plain.value,
    [`${componentName}--block`]: block.value,
    [`${componentName}--disabled`]: disabled.value,
    [`${componentName}--loading`]: loading.value,
  }
})

const getStyle = computed(() => {
  const style: CSSProperties = {}
  if (customColor?.value) {
    if (plain.value) {
      style.color = customColor.value
      style.background = '#fff'
      if (!customColor.value?.includes('gradient'))
        style.borderColor = customColor.value
    }
    else {
      style.color = '#fff'
      style.background = customColor.value
    }
  }

  return style
})
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
    :class="[classes, customClass]"
    :style="[getStyle, customStyle]"
    :form-type="props.formType === 'button' ? undefined : props.formType"
    :open-type="props.openType"
    :hover-start-time="10000000"
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
    @click="(handleClick as any)"
    @getphonenumber="emits('getphonenumber', $event)"
    @getuserinfo="emits('getuserinfo', $event)"
    @error="emits('error', $event)"
    @opensetting="emits('opensetting', $event)"
    @addgroupapp="emits('addgroupapp', $event)"
    @chooseaddress="emits('chooseaddress', $event)"
    @chooseavatar="emits('chooseavatar', $event)"
    @chooseinvoicetitle="emits('chooseinvoicetitle', $event)"
    @launchapp="emits('launchapp', $event)"
    @login="emits('login', $event)"
    @subscribe="emits('subscribe', $event)"
    @contact="emits('contact', $event)"
    @agreeprivacyauthorization="emits('agreeprivacyauthorization', $event)"
    @im="emits('im', $event)"
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
