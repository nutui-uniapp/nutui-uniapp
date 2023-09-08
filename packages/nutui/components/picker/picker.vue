<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import type { PickerOption } from '../pickercolumn/types'
import { pxCheck } from '../_utils'
import { useTranslate } from '../../locale'

// #ifdef H5
import NutPickerColumn from '../pickercolumn/pickercolumn.vue'

// #endif
import { pickerEmits, pickerProps } from './picker'
import { componentName, usePicker } from './use-picker'

const props = defineProps(pickerProps)

const emit = defineEmits(pickerEmits)

const { translate } = useTranslate(componentName)

const {
  changeHandler,
  confirm,
  defaultValues,
  defaultIndexes,
  columnsList,
  selectedOptions,
  columnFieldNames,
  isSameValue,
  columnsType,
  classes,
  cancel,
  confirmHandler,
} = usePicker(props, emit)

function componentWeb() {
  const pickerColumn = ref<any[]>([])

  const swipeRef = (el: any) => {
    if (el && pickerColumn.value.length < columnsList.value.length)
      pickerColumn.value.push(el)
  }

  const columnStyle = computed(() => {
    const styles: CSSProperties = {}
    styles.height = `${+props.visibleOptionNum * +props.optionHeight}px`
    styles['--line-height'] = `${+props.optionHeight}px`
    return styles
  })

  return {
    classes,
    columnsType,
    columnsList,
    cancel,
    changeHandler,
    defaultValues,
    pickerColumn,
    swipeRef,
    translate,
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
    styles.height = `${+props.visibleOptionNum * +props.optionHeight}px`
    styles['--line-height'] = `${+props.optionHeight}px`
    return styles
  })

  // 平铺展示时，滚动选择
  const tileChange = (data: any) => {
    const prevDefaultValue = defaultIndexes.value
    let changeIndex = 0
    // 判断变化的是第几个
    for (let i = 0; i < data.detail.value.length; i++) {
      if (prevDefaultValue[i] !== data.detail.value?.[i]) {
        changeIndex = i
        break
      }
    }

    // 选择的是哪个 option
    changeHandler(changeIndex, columnsList.value[changeIndex][data.detail.value[changeIndex]])
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
  const handlePickstart = () => {
    state.picking = true
  }
  // 开始滚动
  const handlePickend = () => {
    state.picking = false
  }

  return {
    classes,
    ...toRefs(state),
    columnsType,
    columnsList,
    cancel,
    changeHandler,
    confirmHandler,
    defaultValues,
    defaultIndexes,
    tileChange,
    handlePickstart,
    translate,
    handlePickend,
    pickerViewStyles,
    pxCheck,
  }
}

// #ifdef H5
const {
  pickerColumn,
  swipeRef,
  columnStyle,
} = componentWeb()
// #endif

// #ifndef H5
const {
  confirmHandler: confirmHandlerMp,
  tileChange,
  handlePickstart,
  handlePickend,
  pickerViewStyles,
} = componentWeapp()
// #endif

function confirmIf() {
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
  <view :class="classes">
    <view v-if="showToolbar" class="nut-picker__bar">
      <view class="nut-picker__cancel nut-picker__left nut-picker__button" @click="cancel">
        {{
          cancelText || translate('cancel')
        }}
      </view>
      <view class="nut-picker__title">
        {{ title }}
      </view>
      <view class="nut-picker__confirm nut-picker__right nut-picker__button" @click="confirmIf ">
        {{
          okText || translate('confirm')
        }}
      </view>
    </view>
    <slot name="top" />

    <!-- Taro 下转换成 微信小程序 -->
    <!-- #ifndef H5 -->
    <picker-view
      :indicator-style="`height:${optionHeight}px`"
      :value="defaultIndexes"
      :style="pickerViewStyles"
      :immediate-change="true"
      @change="tileChange"
      @pickstart="handlePickstart"
      @pickend="handlePickend"
    >
      <picker-view-column
        v-for="(column, columnIndex) in columnsList"
        :key="columnIndex"
        :filed-names="columnFieldNames"
      >
        <view
          v-for="(item, index) in column"
          :key="item[columnFieldNames.value] ? item[columnFieldNames.value] : index"
          class="nut-picker-roller-item-tarotile"
          :style="{
            lineHeight: pxCheck(optionHeight),
          }"
        >
          {{ item[columnFieldNames.text] }}
        </view>
      </picker-view-column>
    </picker-view>
    <!-- #endif -->

    <!-- Uni 下转换成 H5 -->
    <!-- #ifdef H5 -->
    <view class="nut-picker__column" :style="columnStyle">
      <view v-for="(column, columnIndex) in columnsList" :key="columnIndex" class="nut-picker__columnitem">
        <NutPickerColumn
          :ref="swipeRef"
          :column="column"
          :columns-type="columnsType"
          :value="defaultValues[columnIndex]"
          :field-names="columnFieldNames"
          :three-dimensional="false"
          :swipe-duration="swipeDuration"
          :visible-option-num="visibleOptionNum"
          :option-height="optionHeight"
          @change="(option: PickerOption) => {
            changeHandler(columnIndex, option);
          }
          "
        />
      </view>
    </view>
    <!-- #endif -->
    <slot name="default" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
