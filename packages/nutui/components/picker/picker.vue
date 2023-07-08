<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import type { PickerOption } from '../pickercolumn/types'
import { pxCheck } from '../_utils'
import { useTranslate } from '../../locale'
import NutPickerColumn from '../pickercolumn/pickercolumn.vue'
import { pickerEmits, pickerProps } from './picker'
import { componentName, usePicker } from './use-picker'

const props = defineProps(pickerProps)

const emit = defineEmits(pickerEmits)

const { translate } = useTranslate(componentName)

const {
  changeHandler,
  confirm,
  defaultValues,
  columnsList,
  selectedOptions,
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

  // 选中项的位置  taro
  const defaultIndexes = ref<number[]>([])

  const pickerViewStyles = computed(() => {
    const styles: CSSProperties = {}
    styles.height = `${+props.visibleOptionNum * +props.optionHeight}px`
    styles['--line-height'] = `${+props.optionHeight}px`
    return styles
  })

  const defaultValuesConvert = () => {
    const defaultIndexs: number[] = []
    if (defaultValues.value.length > 0) {
      defaultValues.value.forEach((value, index) => {
        for (let i = 0; i < columnsList.value[index].length; i++) {
          if (columnsList.value[index][i].value === value) {
            defaultIndexs.push(i)
            break
          }
        }
      })
    }
    else {
      if (columnsList && columnsList.value.length > 0) {
        columnsList.value.forEach((item) => {
          defaultIndexs.push(0)
          item.length > 0 && defaultValues.value.push(item[0].value)
        })
      }
    }

    return defaultIndexs
  }

  // 平铺展示时，滚动选择
  const tileChange = (data: any) => {
    const prevDefaultValue = defaultIndexes.value
    let changeIndex = 0
    // 判断变化的是第几个
    data.detail.value.forEach((col: number, index: number) => {
      if (prevDefaultValue[index] !== col)
        changeIndex = index
    })

    // 选择的是哪个 option
    changeHandler(changeIndex, columnsList.value[changeIndex][data.detail.value[changeIndex]])
    // console.log('设置默认值');

    defaultIndexes.value = defaultValuesConvert()
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

  onMounted(() => {
    if (defaultValues.value.length > 0)
      defaultIndexes.value = defaultValuesConvert()
  })

  watch(
    () => props.modelValue,
    (newValues) => {
      if (!isSameValue(newValues, defaultValues.value)) {
        setTimeout(() => {
          defaultIndexes.value = defaultValuesConvert()
        }, 100)
      }
    },
    { deep: true },
  )

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
  defaultIndexes,
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
      <picker-view-column v-for="(column, columnIndex) in columnsList" :key="columnIndex">
        <view
          v-for="(item, index) in column"
          :key="item.value ? item.value : index"
          class="nut-picker-roller-item-tarotile"
          :style="{
            lineHeight: pxCheck(optionHeight),
          }"
        >
          {{ item.text }}
        </view>
      </picker-view-column>
    </picker-view>
    <!-- #endif -->

    <!-- Taro 下转换成 H5 -->
    <!-- #ifdef H5 -->
    <view class="nut-picker__column" :style="columnStyle">
      <view v-for="(column, columnIndex) in columnsList" :key="columnIndex" class="nut-picker__columnitem">
        <NutPickerColumn
          :ref="swipeRef"
          :column="column"
          :columns-type="columnsType"
          :value="defaultValues[columnIndex]"
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
