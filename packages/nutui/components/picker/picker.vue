<script setup lang="ts">
import type { PickerViewOnChangeEvent } from '@uni-helper/uni-app-types'
import type { CSSProperties } from 'vue'
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import { pxCheck } from '../_utils'
import { useTranslate } from '../../locale'
import type { PickerOption } from '../pickercolumn'
// #ifdef H5
import NutPickerColumn from '../pickercolumn/pickercolumn.vue'
// #endif
import { pickerEmits, pickerProps } from './picker'
import { componentName, usePicker } from './use-picker'

const props = defineProps(pickerProps)

const emit = defineEmits(pickerEmits)

const innerVisibleOptionNum = computed(() => {
  return Number(props.visibleOptionNum)
})

const innerOptionHeight = computed(() => {
  return Number(props.optionHeight)
})

const { translate } = useTranslate(componentName)

const {
  changeHandler,
  confirm,
  defaultValues,
  defaultIndexes,
  delayDefaultIndexes,
  columnsList,
  columnFieldNames,
  classes,
  cancel,
  confirmHandler,
} = usePicker(props, emit)

function componentWeb() {
  const columnRefs = ref<any[]>([])

  const columnRef = (el: any) => {
    if (el && columnRefs.value.length < columnsList.value.length)
      columnRefs.value.push(el)
  }

  const columnStyle = computed(() => {
    const styles: CSSProperties = {}
    styles.height = `${innerVisibleOptionNum.value * innerOptionHeight.value}px`
    styles['--line-height'] = `${innerOptionHeight.value}px`
    return styles
  })

  return {
    columnRefs,
    columnRef,
    columnStyle,
  }
}

function componentWeapp() {
  const state = reactive({
    show: false,
    picking: false,
  })

  // 选中项的位置
  const pickerViewStyles = computed(() => {
    const styles: CSSProperties = {}
    styles.height = `${innerVisibleOptionNum.value * innerOptionHeight.value}px`
    styles['--line-height'] = `${innerOptionHeight.value}px`
    return styles
  })

  // 平铺展示时，滚动选择
  const handleTileChange = (event: PickerViewOnChangeEvent) => {
    const indexes = event.detail.value
    const prevIndexes = defaultIndexes.value

    let changeIndex = 0
    // 判断变化的是第几个
    for (let i = 0; i < indexes.length; i++) {
      if (prevIndexes[i] !== indexes[i]) {
        changeIndex = i
        break
      }
    }

    // 选择的是哪个 option
    changeHandler(changeIndex, columnsList.value[changeIndex][indexes[changeIndex]])
  }

  // 确定
  const confirmHandler = () => {
    if (state.picking) {
      setTimeout(() => {
        confirm()
      }, 0)
    }
    else {
      confirm()
    }
  }

  // 开始滚动
  const handlePickStart = () => {
    state.picking = true
  }

  // 开始滚动
  const handlePickEnd = () => {
    state.picking = false
  }

  return {
    ...toRefs(state),
    pickerViewStyles,
    handleTileChange,
    confirmHandler,
    handlePickStart,
    handlePickEnd,
  }
}

// #ifdef H5
const {
  columnRef,
  columnStyle,
} = componentWeb()
// #endif

// #ifndef H5
const {
  confirmHandler: confirmHandlerMp,
  handleTileChange,
  handlePickStart,
  handlePickEnd,
  pickerViewStyles,
} = componentWeapp()
// #endif

function onConfirm() {
  // #ifdef H5
  confirmHandler()
  // #endif
  // #ifndef H5
  confirmHandlerMp()
  // #endif
}
</script>

<script lang="ts">
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
  <view :class="classes" :style="props.customStyle">
    <view v-if="props.showToolbar" class="nut-picker__bar">
      <view class="nut-picker__cancel nut-picker__left nut-picker__button" @click="cancel">
        {{ props.cancelText || translate('cancel') }}
      </view>
      <view class="nut-picker__title">
        {{ props.title }}
      </view>
      <view class="nut-picker__confirm nut-picker__right nut-picker__button" @click="onConfirm ">
        {{ props.okText || translate('confirm') }}
      </view>
    </view>

    <slot name="top" />

    <!-- #ifndef H5 -->
    <picker-view
      :style="pickerViewStyles"
      :indicator-style="`height:${innerOptionHeight}px`"
      :value="delayDefaultIndexes"
      :immediate-change="true"
      mask-class="nut-picker__mask"
      @change="handleTileChange"
      @pickstart="handlePickStart"
      @pickend="handlePickEnd"
    >
      <picker-view-column v-for="(column, columnIndex) in (columnsList as PickerOption[])" :key="columnIndex">
        <view
          v-for="(item, index) in column"
          :key="item[columnFieldNames.value] ? item[columnFieldNames.value] : index"
          class="nut-picker-roller-item-tarotile"
          :style="{ lineHeight: pxCheck(innerOptionHeight) }"
        >
          {{ item[columnFieldNames.text] }}
        </view>
      </picker-view-column>
    </picker-view>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <view class="nut-picker__column" :style="columnStyle">
      <view
        v-for="(column, columnIndex) in (columnsList as PickerOption[][])"
        :key="columnIndex"
        class="nut-picker__columnitem"
      >
        <NutPickerColumn
          :ref="columnRef"
          :column="column"
          :value="defaultValues[columnIndex]"
          :field-names="columnFieldNames"
          :three-dimensional="props.threeDimensional"
          :swipe-duration="props.swipeDuration"
          :visible-option-num="innerVisibleOptionNum"
          :option-height="innerOptionHeight"
          @change="(option: PickerOption) => { changeHandler(columnIndex, option) }"
        />
      </view>
    </view>
    <!-- #endif -->

    <slot name="default" />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
