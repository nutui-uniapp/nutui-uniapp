<script setup lang="ts">
import type { PropType } from 'vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useTranslate } from '../../../locale'
import { PREFIX } from '../../_utils'
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
      <span v-if="type !== 'complex'" style="display: inline">{{ info.size }}</span>
    </view>

    <view class="nut-comment-bottom__cpx">
      <template v-for="(name, i) in mergeOp" :key="i">
        <view class="nut-comment-bottom__cpx-item" :class="[`nut-comment-bottom__cpx-item--${name}`]" @click="operate(name)">
          <template v-if="name !== 'more'">
            <span>{{ info[name] }}</span>
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
