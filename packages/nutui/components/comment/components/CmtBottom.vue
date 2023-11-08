<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useTranslate } from '../../../locale'
import { PREFIX } from '../../_constants'
import NutIcon from '../../icon/icon.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'base', // simple，base，complex
  },
  info: {
    type: Object,
    default: () => ({}),
  },

  operation: {
    type: Array as PropType<string[]>,
    default: () => ['replay', 'like', 'more'],
  },
})
const emit = defineEmits(['clickOperate', 'handleClick'])

const showPopver = ref(false)

const mergeOp = ref([])

onMounted(() => {
  const deOp = ['replay', 'like', 'more']

  if (props.operation) {
    props.operation.forEach((name: string) => {
      if (deOp.includes(name))
        (mergeOp.value as any).push(name)
    })
  }
})

function operate(type: string) {
  if (type === 'more')
    showPopver.value = !showPopver.value

  emit('clickOperate', type)
}

function handleClick() {
  emit('handleClick')
}
</script>

<script  lang="ts">
const componentName = `${PREFIX}-comment-bottom`
const { translate } = useTranslate(componentName)
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
  <view class="nut-comment-bottom">
    <view class="nut-comment-bottom__lable" @click="handleClick">
      <span v-if="type !== 'complex'" style="display: inline;white-space:none;">
        {{ info.size }}
      </span>
    </view>

    <view class="nut-comment-bottom__cpx">
      <template v-for="(name, i) in mergeOp" :key="i">
        <view class="nut-comment-bottom__cpx-item" :class="[`nut-comment-bottom__cpx-item--${name}`]" @click="operate(name)">
          <template v-if="name !== 'more'">
            <text>{{ info[name] }}</text>
            <NutIcon v-if="name === 'like'" name="fabulous" />
            <NutIcon v-else name="comment" />
          </template>
          <template v-if="name === 'more'">
            <NutIcon name="more-x" />
            <view v-if="showPopver" class="nut-comment-bottom__cpx-item-popover" @click="operate('popover')">
              {{
                translate('complaintsText')
              }}
            </view>
          </template>
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
.nut-theme-dark {
  .nut-comment {
    &-bottom {
      &__cpx {
        color: $dark-color;

        &-item {
          text {
            color: $dark-color;
          }
        }
      }
    }
  }
}

.nut-comment{
    &-bottom {
    display: flex;
    justify-content: space-between;
    margin-right: 5px;
    color: $comment-bottom-label-color;

    &__lable {
      flex: 1;
      margin-right: 10px;

      /* stylelint-disable-next-line at-rule-no-unknown */
      @include oneline-ellipsis;
    }

    &__cpx {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: $black;

      &-item {
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 18px;

        text {
          margin-right: 5px;
          color: $black;
        }

        &:last-child {
          margin-right: 0;
        }

        &-popover {
          position: absolute;
          top: 35px;
          right: 18px;
          width: max-content;
          padding: 10px;
          background: $white;
          border-radius: 5px 0 5px 5px;
          box-shadow: 0 0 6px $disable-color;

          &::after {
            position: absolute;
            top: -20px;
            right: 0;
            width: 0;
            height: 0;
            content: '';
            border-top: 10px solid transparent;
            border-right: 0 solid transparent;
            border-bottom: 10px solid $white;
            border-left: 14px solid transparent;
          }

          &::before {
            position: absolute;
            top: -22px;
            right: -1px;
            width: 0;
            height: 0;
            content: '';
            border-top: 10px solid transparent;
            border-right: 0 solid transparent;
            border-bottom: 10px solid rgb(114 113 113 / 10%);
            border-left: 14px solid transparent;
          }
        }
      }
    }
  }
}
</style>
