<!-- eslint-disable padded-blocks -->
<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { CLOSE_EVENT, INPUT_EVENT, PREFIX, UPDATE_MODEL_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import NutPopup from '../popup/popup.vue'
import { getMainClass } from '../_utils'
import { numberkeyboardEmits, numberkeyboardProps } from './numberkeyboard'

export interface keys {
  id: number | string
  type: string
}
const props = defineProps(numberkeyboardProps)
const emit = defineEmits(numberkeyboardEmits)
const clickKeyIndex: Ref<string | undefined | number> = ref(undefined)
const show = ref(props.visible)
const root = ref<HTMLElement>()
const classes = computed(() => {
  return getMainClass(props, componentName)
})
function defaultKey() {
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

function getBasicKeys() {
  const keys: keys[] = []
  for (let i = 1; i <= 9; i++)
    keys.push({ id: i, type: 'number' })

  if (props.randomKeys)
    return keys.sort(() => (Math.random() > 0.5 ? 1 : -1))

  return keys
}

function genCustomKeys() {
  const keys = getBasicKeys()
  const { customKey } = props
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

  return defaultKey()
})
watch(
  () => props.visible,
  (value) => {
    show.value = value
  },
)

function onTouchstart(item: { id: string | number; type: string }, event: TouchEvent) {
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
</script>

<script lang="ts">
const componentName = `${PREFIX}-number-keyboard`
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
  <NutPopup
    v-model:visible="show"
    position="bottom"
    :pop-class="popClass"
    :overlay="overlay"
    overlay-class="nut-number-keyboard-overlay"
    @click-overlay="closeBoard()"
  >
    <div ref="root" :class="classes" :style="customStyle">
      <div v-if="title" class="nut-number-keyboard__header">
        <h3 class="nut-number-keyboard__title">
          {{ title }}
        </h3>
        <text v-if="type === 'default'" class="van-number-keyboard__close" @click="closeBoard()">
          {{
            translate('done')
          }}
        </text>
      </div>
      <div class="nut-number-keyboard__body">
        <div class="nut-number-keyboard__keys">
          <div
            v-for="item of keysList" :key="`key${item.id}`"
            class="nut-key__wrapper"
            :class="[
              {
                'nut-key__wrapper--wider':
                  item.id === 0 && type === 'rightColumn' && Array.isArray(customKey) && customKey.length === 1,
              },
            ]"
          >
            <div
              class="nut-key" :class="[
                { 'nut-key--active': item.id === clickKeyIndex },
                { 'nut-key--lock': item.type === 'lock' },
                { 'nut-key--delete': item.type === 'delete' },
              ]"
              @touchstart="(event: TouchEvent) => onTouchstart(item, event)"
              @touchmove="(event: TouchEvent) => onTouchMove(event)"
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
            </div>
          </div>
        </div>
        <div v-if="type === 'rightColumn'" class="nut-number-keyboard__sidebar">
          <div class="nut-key__wrapper">
            <div
              class="nut-key" :class="[{ active: clickKeyIndex === 'delete' }]"
              @touchstart="(event: TouchEvent) => onTouchstart({ id: 'delete', type: 'delete' }, event)"
              @touchmove="(event: TouchEvent) => onTouchMove(event)"
              @touchend="onTouchEnd"
            >
              <image
                src="https://img11.360buyimg.com/imagetools/jfs/t1/129395/8/12735/2030/5f61ac37E70cab338/fb477dc11f46056c.png"
              />
            </div>
          </div>
          <div class="nut-key__wrapper nut-key__wrapper--finish" @click="closeBoard()">
            <div class="nut-key nut-key--finish " :class="[{ activefinsh: clickKeyIndex === 'finish' }]">
              {{ confirmText || translate('done') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </NutPopup>
</template>

<style lang="scss">
@import './index';
</style>
