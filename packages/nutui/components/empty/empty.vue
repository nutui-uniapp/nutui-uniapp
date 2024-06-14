<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { getMainClass, pxCheck } from '../_utils'
import { useTranslate } from '../../locale'
import { emptyProps } from './empty'

interface StatusOptions {
  [key: string]: string
}

const COMPONENT_NAME = 'nut-empty'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(emptyProps)

const { translate } = useTranslate(COMPONENT_NAME)

const defaultStatus: StatusOptions = {
  empty: 'https://static-ftcms.jd.com/p/files/61a9e3183985005b3958672b.png',
  error: 'https://ftcms.jd.com/p/files/61a9e33ee7dcdbcc0ce62736.png',
  network: 'https://static-ftcms.jd.com/p/files/61a9e31de7dcdbcc0ce62734.png',
}

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (props.imageSize) {
    Object.assign(value, {
      width: pxCheck(props.imageSize),
      height: pxCheck(props.imageSize),
    })
  }

  return value
})

const src = computed(() => {
  const isHttpUrl = props.image.startsWith('https://')
    || props.image.startsWith('http://')
    || props.image.startsWith('//')

  return isHttpUrl ? props.image : defaultStatus[props.image]
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view class="nut-empty__box" :style="styles">
      <slot name="image">
        <image v-if="src" class="nut-empty__box--img" :src="src" />
      </slot>
    </view>

    <slot name="description">
      <view class="nut-empty__description">
        {{ props.description || translate('noData') }}
      </view>
    </slot>

    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
