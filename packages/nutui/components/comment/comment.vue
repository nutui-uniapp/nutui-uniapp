<script lang="ts" setup>
import { computed } from 'vue'
import { CLICK_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { commentEmits, commentProps } from './comment'
import CommentHeader from './components/CmtHeader.vue'
import CommentImages from './components/CmtImages.vue'
import CommentBottom from './components/CmtBottom.vue'

const COMPONENT_NAME = 'nut-comment'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(commentProps)

const emit = defineEmits(commentEmits)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
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

<template>
  <view
    v-if="props.info && Object.keys(props.info)"
    :class="classes"
    :style="props.customStyle"
  >
    <!-- 根据展示信息的多少，分为3种展示风格：simple，base，complex -->
    <CommentHeader
      :type="props.headerType"
      :info="props.info"
      :labels="props.labels"
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
      :nodes="props.info.content"
      @click="handleClick"
    />
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <text
      class="nut-comment__main"
      :style="`-webkit-line-clamp:${conEllipsis}`"
      @click="handleClick"
    >
      {{ props.info.content }}
    </text>
    <!-- #endif -->

    <CommentImages
      :type="props.imagesRows"
      :images="props.images"
      :videos="props.videos"
      @click-images="clickImages"
    />

    <view
      v-if="props.follow && props.follow.days > 0"
      class="nut-comment__follow"
      @click="handleClick"
    >
      <view class="nut-comment__follow-title">
        购买{{ props.follow.days }}天后追评
      </view>

      <view class="nut-comment__follow-com">
        {{ props.follow.content }}
      </view>

      <view
        v-if="props.follow.images && props.follow.images.length > 0"
        class="nut-comment__follow-img"
        @click="clickImages(props.follow.images)"
      >
        {{ props.follow.images.length }} 张追评图片 <NutIcon name="right" size="12px" />
      </view>
    </view>

    <CommentBottom
      :type="props.headerType"
      :info="props.info"
      :operation="props.operation"
      @click-operate="clickOperate"
      @handle-click="handleClick"
    />

    <slot name="commentShopReply" />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
