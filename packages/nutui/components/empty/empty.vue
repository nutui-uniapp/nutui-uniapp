<script setup lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { PREFIX } from '../_utils'
import { useTranslate } from '../../locale'
import { emptyProps } from './empty'

const props = defineProps(emptyProps)
interface statusOptions {
  [key: string]: string
}

/**
 * 内置图片地址
 */
const defaultStatus: statusOptions = {
  empty: 'https://static-ftcms.jd.com/p/files/61a9e3183985005b3958672b.png',
  error: 'https://ftcms.jd.com/p/files/61a9e33ee7dcdbcc0ce62736.png',
  network: 'https://static-ftcms.jd.com/p/files/61a9e31de7dcdbcc0ce62734.png',
}

const { image, imageSize } = toRefs(props)

/**
     * 根据imgSize计算行内样式
     */
const imgStyle = computed(() => {
  if (!imageSize.value)
    return ''

  if (typeof imageSize.value === 'number')
    return `width:${imageSize.value}px;height:${imageSize.value}px`

  return `width:${imageSize.value};height:${imageSize.value}`
})

// 是否 URL
const isHttpUrl
      = image.value.startsWith('https://') || image.value.startsWith('http://') || image.value.startsWith('//')
const imageUrl = isHttpUrl ? image.value : defaultStatus[image.value]
</script>

<script lang="ts">
const componentName = `${PREFIX}-empty`
const { translate } = useTranslate(componentName)

export default defineComponent({
  name: componentName,
})
</script>

<template>
  <view class="nut-empty">
    <!-- 占位图 -->
    <view class="nut-empty__box" :style="imgStyle">
      <template v-if="$slots.image">
        <slot name="image" />
      </template>
      <template v-else>
        <img v-if="imageUrl" class="nut-empty__box--img" :src="imageUrl">
      </template>
    </view>

    <!-- 文本区 -->
    <template v-if="$slots.description">
      <slot name="description" />
    </template>
    <template v-else>
      <view class="nut-empty__description">
        {{ description || translate('noData') }}
      </view>
    </template>

    <!-- 自定义slot -->
    <template v-if="$slots.default">
      <slot />
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
