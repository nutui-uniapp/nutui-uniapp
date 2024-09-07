<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { commentEmits, commentProps } from './comment'
import ComentBottom from './components/CmtBottom.vue'
import CommentHeader from './components/CmtHeader.vue'
import ComentImages from './components/CmtImages.vue'

const props = defineProps(commentProps)
const emit = defineEmits(commentEmits)
const classes = computed(() => {
  return getMainClass(props, componentName)
})

const conEllipsis = computed(() => {
  if (props.ellipsis)
    return props.ellipsis

  return props.headerType === 'complex' ? 6 : 2
})
function clickOperate(t: string) {
  emit('clickOperate', t)
}

function handleClick() {
  emit(CLICK_EVENT, props.info)
}

function clickImages(value: any) {
  emit('clickImages', value)
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-comment`

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
  <view v-if="info && Object.keys(info)" :class="classes" :style="customStyle">
    <!-- 根据展示信息的多少，分为3种展示风格：simple，base，complex -->
    <CommentHeader
      :type="headerType"
      :info="info"
      :labels="labels"
      @handle-click="handleClick"
    >
      <template #labels>
        <slot name="commentLabels" />
      </template>
    </CommentHeader>

    <slot name="feature" />

    <!-- #ifndef H5 -->
    <!--  BUG web端使用 rich-text自定义 style 会导致内存泄漏 -->
    <rich-text
      class="nut-comment__main"
      :style="`-webkit-line-clamp:${conEllipsis}`"
      :nodes="info.content"
      @click="handleClick"
    />
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <text
      class="nut-comment__main"
      :style="`-webkit-line-clamp:${conEllipsis}`"
      @click="handleClick"
    >
      {{ info.content }}
    </text>
    <!-- #endif -->

    <ComentImages
      :images="images"
      :videos="videos"
      :type="imagesRows"
      @click-images="clickImages"
    />

    <view v-if="follow && follow.days > 0" class="nut-comment__follow" @click="handleClick">
      <view class="nut-comment__follow-title">
        购买{{ follow.days }}天后追评
      </view>
      <view class="nut-comment__follow-com">
        {{ follow.content }}
      </view>
      <view
        v-if="follow.images && follow.images.length > 0"
        class="nut-comment__follow-img"
        @click="clickImages(follow.images)"
      >
        {{ follow.images.length }} 张追评图片 <NutIcon name="right" size="12px" />
      </view>
    </view>

    <ComentBottom
      :type="headerType"
      :info="info"
      :operation="operation"
      @click-operate="clickOperate"
      @handle-click="handleClick"
    />

    <slot name="commentShopReply" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
