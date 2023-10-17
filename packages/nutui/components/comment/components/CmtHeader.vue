<script setup lang="ts">
import { defineComponent } from 'vue'
import { PREFIX } from '../../_constants'
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
          <image v-if="info.avatar" :src="info.avatar" />
        </view>

        <view v-if="type === 'default'" :class="[`nut-comment-header__user-${type}`]">
          <view :class="[`nut-comment-header__user-${type}-name`]">
            <text>{{ info.nickName }}</text>
            <slot name="labels" />
          </view>

          <view class="nut-comment-header__user-score">
            <!-- eslint-disable vue/no-mutating-props -->
            <NutRate v-model="info.score" size="12" spacing="5" readonly @change="handleClick" />
          </view>
        </view>

        <view v-else :class="[`nut-comment-header__user-${type}`]">
          <text :class="[`nut-comment-header__user-${type}-name`]">
            {{ info.nickName }}
          </text>
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

<style lang="scss">
.nut-theme-dark {
  .nut-comment {
    &-header {
      &__user {
        &-name {
          color: $dark-color;
        }

        &-default {
          &-name {
            color: $dark-color;
          }
        }
      }
    }
  }
}

.nut-comment {
    &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    &__user {
      display: flex;
      flex: 1;
      align-items: center;

      &-avter {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        overflow: hidden;
        border-radius: 50%;

        image {
          width: 20px;
          height: 20px;
        }
      }

      &-name {
        /* stylelint-disable-next-line at-rule-no-unknown */
        @include oneline-ellipsis;

        width: auto;
        max-width: 80px;
        margin-right: 5px;
        font-size: 12px;
        color: $comment-header-user-name-color;
      }

      &-default {
        flex: 1;

        &-name {
          display: flex;
          align-items: center;
          margin-bottom: 3px;

          /* stylelint-disable-next-line at-rule-no-unknown */
          @include oneline-ellipsis;

          font-size: 12px;
          color: $comment-header-user-name-color;

          > text {
            margin-right: 8px;
          }
        }
      }

      &-complex {
        display: flex;
        align-items: center;
        color: $comment-header-user-name-color;

        &-name {
          max-width: 80px;
          margin-right: 10px;

          /* stylelint-disable-next-line at-rule-no-unknown */
          @include text-ellipsis;
        }

        image {
          max-width: 50px;
          height: 16px;
        }
      }

      &-score {
        .nut-rate-item {
          display: block !important;
          line-height: 10px;

          .nut-icon {
            line-height: 10px;
          }
        }
      }
    }

    &__time {
      width: 100px;
      font-size: 12px;
      color: $comment-header-time-color;
      text-align: right;
    }

    &__complex-score {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .nut-rate-item {
        display: block !important;
        line-height: 12px;

        .nut-icon {
          line-height: 12px;
        }
      }

      &-i {
        display: inline-block;
        width: 1px;
        height: 6px;
        margin: 0 8px 0 6px;
        font-style: inherit;
        background: $text-color;
        opacity: 0.4;
      }

      &-size {
        /* stylelint-disable-next-line at-rule-no-unknown */
        @include oneline-ellipsis;
      }
    }

    &__labels--item {
      display: inline-block;
      height: 16px;
      margin-right: 4px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
