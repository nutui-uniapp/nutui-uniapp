<script setup lang="ts">
import { defineComponent } from 'vue'
import { PREFIX } from '../../_utils'
import NutRate from '../../rate/rate.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default', // default，complex
  },
  info: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['handleClick'])

function handleClick() {
  emit('handleClick')
}
</script>

<script  lang="ts">
const componentName = `${PREFIX}-comment-header`

export default defineComponent ({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view>
    <view v-if="info" class="nut-comment-header" @click="handleClick">
      <view class="nut-comment-header__user">
        <view class="nut-comment-header__user-avter">
          <img v-if="info.avatar" :src="info.avatar">
        </view>

        <view v-if="type === 'default'" :class="[`nut-comment-header__user-${type}`]">
          <view :class="[`nut-comment-header__user-${type}-name`]">
            <span>{{ info.nickName }}</span>
            <slot name="labels" />
          </view>

          <view class="nut-comment-header__user-score">
            <!-- eslint-disable vue/no-mutating-props -->
            <NutRate v-model="info.score" size="12" spacing="5" readonly @change="handleClick" />
          </view>
        </view>

        <view v-else :class="[`nut-comment-header__user-${type}`]">
          <span :class="[`nut-comment-header__user-${type}-name`]">{{ info.nickName }}</span>
          <slot name="labels" />
        </view>
      </view>
      <view v-if="info.time" class="nut-comment-header__time">
        {{ info.time }}
      </view>
    </view>
    <view v-if="type === 'complex'" :class="[`nut-comment-header__${type}-score`]">
      <NutRate v-model="info.score" size="12" spacing="3" readonly />
      <i :class="[`nut-comment-header__${type}-score-i`]" />
      <view :class="[`nut-comment-header__${type}-score-size`]">
        {{ info.size }}
      </view>
    </view>
  </view>
</template>
