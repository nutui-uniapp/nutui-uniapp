<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { getMainClass, pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import { useTranslate } from '../../locale'
import { emptyProps } from './empty'

const props = defineProps(emptyProps)
interface statusOptions {
  [key: string]: string
}

const defaultStatus: statusOptions = {
  empty: 'https://static-ftcms.jd.com/p/files/61a9e3183985005b3958672b.png',
  error: 'https://ftcms.jd.com/p/files/61a9e33ee7dcdbcc0ce62736.png',
  network: 'https://static-ftcms.jd.com/p/files/61a9e31de7dcdbcc0ce62734.png',
}
const classes = computed(() => {
  return getMainClass(props, componentName)
})
const style = computed(() => {
  if (props.imageSize) {
    return {
      width: pxCheck(props.imageSize),
      height: pxCheck(props.imageSize),
    }
  }
  return {}
})

const isHttpUrl
      = props.image.startsWith('https://') || props.image.startsWith('http://') || props.image.startsWith('//')
const src = isHttpUrl ? props.image : defaultStatus[props.image]
</script>

<script lang="ts">
const componentName = `${PREFIX}-empty`
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
  <view :class="classes" :style="customStyle">
    <view class="nut-empty__box" :style="style">
      <slot name="image">
        <image v-if="src" class="nut-empty__box--img" :src="src" />
      </slot>
    </view>

    <slot name="description">
      <view class="nut-empty__description">
        {{ description || translate('noData') }}
      </view>
    </slot>

    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
