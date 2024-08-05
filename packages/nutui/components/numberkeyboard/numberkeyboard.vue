<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { CLOSE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import NutPopup from '../popup/popup.vue'
import { getMainClass } from '../_utils'
import { numberkeyboardEmits, numberkeyboardProps } from './numberkeyboard'
import type { NumberKeyboardKeyItem } from './types'

const COMPONENT_NAME = 'nut-number-keyboard'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(numberkeyboardProps)

const emit = defineEmits(numberkeyboardEmits)

const { translate } = useTranslate(COMPONENT_NAME)

const clickKeyIndex = ref<string | undefined | number>(undefined)

const innerVisible = ref(props.visible)

const root = ref<HTMLElement>()

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

function getBasicKeys() {
  const keys: NumberKeyboardKeyItem[] = []

  for (let i = 1; i <= 9; i++)
    keys.push({ id: i, type: 'number' })

  if (props.randomKeys)
    return keys.sort(() => (Math.random() > 0.5 ? 1 : -1))

  return keys
}

function getDefaultKeys() {
  const { customKey } = props

  let object = {
    id: 'lock',
    type: 'lock',
  }

  const customKeys = Array.isArray(customKey) ? customKey : [customKey]

  if (customKeys.length === 1) {
    object = {
      id: customKeys[0] as string,
      type: 'custom',
    }
  }

  return [...getBasicKeys(), object, { id: 0, type: 'number' }, { id: 'delete', type: 'delete' }]
}

function genCustomKeys() {
  const { customKey } = props

  const keys = getBasicKeys()

  let customKeys = Array.isArray(customKey) ? customKey : [customKey]

  if (customKeys.length > 2)
    customKeys = [customKeys[0], customKeys[1]]

  if (customKeys.length === 2 && props.title && props.type !== 'rightColumn')
    customKeys = [customKeys[0]]

  if (customKeys.length === 1) {
    if (props.title && props.type !== 'rightColumn')
      keys.push({ id: customKeys[0] as string, type: 'custom' }, { id: 0, type: 'number' }, { id: 'delete', type: 'delete' })

    else
      keys.push({ id: 0, type: 'number' }, { id: customKeys[0] as string, type: 'custom' })
  }
  else if (customKeys.length === 2) {
    keys.push(
      { id: customKeys[0] as string, type: 'custom' },
      { id: 0, type: 'number' },
      { id: customKeys[1] as string, type: 'custom' },
    )
  }

  return keys
}

const keysList = computed(() => {
  if (props.type === 'rightColumn' || props.title !== '')
    return genCustomKeys()

  return getDefaultKeys()
})

watch(
  () => props.visible,
  (value) => {
    innerVisible.value = value
  },
)

function onTouchstart(item: { id: string | number, type: string }, event: TouchEvent) {
  event.stopPropagation()

  clickKeyIndex.value = item.id

  if (item.type === 'number' || item.type === 'custom') {
    emit(INPUT_EVENT, item.id)

    if (props.modelValue.length < (props.maxlength as number))
      emit(UPDATE_MODEL_EVENT, props.modelValue + item.id)
  }

  if (item.type === 'lock')
    closeBoard()

  if (item.type === 'delete') {
    emit('delete')
    emit(UPDATE_MODEL_EVENT, props.modelValue.slice(0, props.modelValue.length - 1))
  }
}

function onTouchMove(event: TouchEvent) {
  event.stopPropagation()
}

function onTouchEnd() {
  clickKeyIndex.value = undefined
}

function closeBoard() {
  emit(CLOSE_EVENT)
  emit(UPDATE_VISIBLE_EVENT, false)
}

function onConfirm() {
  emit('confirm')
}
</script>

<template>
  <NutPopup
    v-model:visible="innerVisible"
    position="bottom"
    :pop-class="props.popClass"
    :overlay="props.overlay"
    overlay-class="nut-number-keyboard-overlay"
    @click-overlay="closeBoard()"
  >
    <view ref="root" :class="classes" :style="props.customStyle">
      <view v-if="props.title" class="nut-number-keyboard__header">
        <h3 class="nut-number-keyboard__title">
          {{ props.title }}
        </h3>
        <text v-if="props.type === 'default'" class="nut-number-keyboard__close" @click="closeBoard()">
          {{ translate('done') }}
        </text>
      </view>

      <view class="nut-number-keyboard__body">
        <view class="nut-number-keyboard__keys">
          <view
            v-for="item in keysList"
            :key="`key${item.id}`"
            class="nut-key__wrapper"
            :class="{
              'nut-key__wrapper--wider':
                item.id === 0 && props.type === 'rightColumn' && Array.isArray(props.customKey) && props.customKey.length === 1,
            }"
          >
            <view
              class="nut-key"
              :class="{
                'nut-key--active': item.id === clickKeyIndex,
                'nut-key--lock': item.type === 'lock',
                'nut-key--delete': item.type === 'delete',
              }"
              @touchstart="(event: any) => onTouchstart(item, event)"
              @touchmove="(event: any) => onTouchMove(event)"
              @touchend="onTouchEnd"
            >
              <template v-if="item.type === 'number' || item.type === 'custom'">
                {{ item.id }}
              </template>

              <image
                v-if="item.type === 'lock'"
                src="https://img11.360buyimg.com/imagetools/jfs/t1/146371/38/8485/738/5f606425Eca239740/14f4b4f5f20d8a68.png"
              />
              <image
                v-if="item.type === 'delete'"
                src="https://img11.360buyimg.com/imagetools/jfs/t1/129395/8/12735/2030/5f61ac37E70cab338/fb477dc11f46056c.png"
              />
            </view>
          </view>
        </view>

        <view v-if="props.type === 'rightColumn'" class="nut-number-keyboard__sidebar">
          <view class="nut-key__wrapper">
            <view
              class="nut-key"
              :class="{ active: clickKeyIndex === 'delete' }"
              @touchstart="(event: any) => onTouchstart({ id: 'delete', type: 'delete' }, event)"
              @touchmove="(event: any) => onTouchMove(event)"
              @touchend="onTouchEnd"
            >
              <image
                src="https://img11.360buyimg.com/imagetools/jfs/t1/129395/8/12735/2030/5f61ac37E70cab338/fb477dc11f46056c.png"
              />
            </view>
          </view>

          <view class="nut-key__wrapper nut-key__wrapper--finish" @click="onConfirm">
            <view class="nut-key nut-key--finish" :class="{ activefinsh: clickKeyIndex === 'finish' }">
              {{ props.confirmText || translate('done') }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </NutPopup>
</template>

<style lang="scss">
@import "./index";
</style>
