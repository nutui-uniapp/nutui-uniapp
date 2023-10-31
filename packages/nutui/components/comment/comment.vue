<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { commentEmits, commentProps } from './comment'
import CommentHeader from './components/CmtHeader.vue'
import ComentImages from './components/CmtImages.vue'
import ComentBottom from './components/CmtBottom.vue'

const props = defineProps(commentProps)
const emit = defineEmits(commentEmits)
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
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
  emit('click', props.info)
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
  <view v-if="info && Object.keys(info)" :class="classes">
    <!-- 根据展示信息的多少，分为3种展示风格：simple，base，complex -->
    <CommentHeader :type="headerType" :info="info" :labels="labels" @handleClick="handleClick">
      <template #labels>
        <slot name="comment-labels" />
      </template>
    </CommentHeader>

    <slot name="feature" />

    <rich-text
      class="nut-comment__main"
      :style="`-webkit-line-clamp:${conEllipsis}`"
      :nodes="info.content"
      @click="handleClick"
    />

    <ComentImages :images="images" :videos="videos" :type="imagesRows" @clickImages="clickImages" />

    <view v-if="follow && follow.days > 0" class="nut-comment__follow" @click="handleClick">
      <view class="nut-comment__follow-title">
        购买{{ follow.days }}天后追评
      </view>
      <view class="nut-comment__follow-com">
        {{ follow.content }}
      </view>
      <view v-if="follow.images && follow.images.length > 0" class="nut-comment__follow-img" @click="clickImages(follow.images)">
        {{ follow.images.length }} 张追评图片 <NutIcon name="right" size="12px" />
      </view>
    </view>

    <ComentBottom
      :type="headerType"
      :info="info"
      :operation="operation"
      @clickOperate="clickOperate"
      @handleClick="handleClick"
    />

    <slot name="comment-shop-reply" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
