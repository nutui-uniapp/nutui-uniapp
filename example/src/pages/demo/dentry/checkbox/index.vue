<script lang="ts" setup>
import type { CheckboxGroupInst } from 'nutui-uniapp'

const group1 = ref<CheckboxGroupInst | null>(null)
const group2 = ref<CheckboxGroupInst | null>(null)

const checkbox1 = ref(true)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
const checkbox4 = ref(true)
const checkbox5 = ref(false)
const checkbox6 = ref(false)
const checkbox7 = ref(false)
const checkbox8 = ref(false)
const checkbox9 = ref(true)
const checkbox10 = ref(false)
const checkbox11 = ref('200')

const checkboxgroup1 = ref(['2', '3'])
const checkboxgroup2 = ref(['2'])
const checkboxgroup3 = ref(['2'])
const checkboxgroup4 = ref(['2'])
const checkboxgroup5 = ref<string[]>([])
const checkboxgroup6 = ref<string[]>([])

const indeterminate = ref(false)

const checkboxSource = ref([
  { label: '1', value: '组合复选框' },
  { label: '2', value: '组合复选框' },
  { label: '3', value: '组合复选框' },
  { label: '4', value: '组合复选框' },
  { label: '5', value: '组合复选框' },
  { label: '6', value: '组合复选框' },
])

function onCheckboxChange(checked: boolean) {
  // eslint-disable-next-line no-console
  console.log(`${checked ? '选中' : '取消'}`)
}

function onCheckboxGroupChange(value: any[]) {
  // eslint-disable-next-line no-console
  console.log(toRaw(value))
}

function onCheckbox5Change(checked: boolean) {
  group2.value?.toggleAll(checked)
}

function onCheckbox6Change(values: string[]) {
  if (values.length >= 4) {
    indeterminate.value = false
    checkbox10.value = true
  }
  else if (values.length > 0) {
    indeterminate.value = true
  }
  else {
    indeterminate.value = false
    checkbox10.value = false
  }
}

function toggleAll(checked: boolean) {
  // eslint-disable-next-line no-console
  console.log(`${checked ? '全选' : '取消'}`)

  group1.value?.toggleAll(checked)
}

function toggleReverse() {
  group1.value?.toggleReverse()
}
</script>

<template>
  <view class="demo">
    <nut-cell-group title="基础用法-左右">
      <nut-cell>
        <nut-checkbox v-model="checkbox1" @change="onCheckboxChange">
          复选框
        </nut-checkbox>
      </nut-cell>

      <nut-cell>
        <nut-checkbox v-model="checkbox2" text-position="left" @change="onCheckboxChange">
          复选框
        </nut-checkbox>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="半选状态">
      <nut-cell>
        <nut-checkbox v-model="checkbox9" :indeterminate="true">
          复选框
        </nut-checkbox>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="禁用状态">
      <nut-cell>
        <nut-checkbox v-model="checkbox3" disabled>
          未选时禁用状态
        </nut-checkbox>
      </nut-cell>

      <nut-cell>
        <nut-checkbox v-model="checkbox4" disabled>
          选中时禁用状态
        </nut-checkbox>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="自定义尺寸">
      <nut-cell>
        <nut-checkbox v-model="checkbox5" icon-size="25">
          自定义尺寸25
        </nut-checkbox>
      </nut-cell>

      <nut-cell>
        <nut-checkbox v-model="checkbox6" icon-size="10">
          自定义尺寸10
        </nut-checkbox>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="自定义图标">
      <nut-cell>
        <nut-checkbox v-model="checkbox7">
          <template #icon>
            <nut-icon name="checklist" />
          </template>
          <template #checkedIcon>
            <nut-icon name="loading" color="red" />
          </template>
          自定义图标
        </nut-checkbox>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="点击触发change事件">
      <nut-cell>
        <nut-checkbox v-model="checkbox8" @change="onCheckboxChange">
          change复选框
        </nut-checkbox>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="checkboxGroup使用">
      <nut-cell>
        <nut-checkbox-group v-model="checkboxgroup1">
          <nut-checkbox label="1">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="2">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="3">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="4">
            组合复选框
          </nut-checkbox>
        </nut-checkbox-group>
      </nut-cell>

      <nut-cell>
        <view class="demo-check">
          当前选中值
        </view>
        <view>{{ checkboxgroup1 }}</view>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="checkboxGroup禁用">
      <nut-cell>
        <nut-checkbox-group v-model="checkboxgroup2" disabled>
          <nut-checkbox label="1">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="2">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="3">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="4">
            组合复选框
          </nut-checkbox>
        </nut-checkbox-group>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="checkboxGroup 全选/取消">
      <nut-cell>
        <nut-checkbox-group ref="group1" v-model="checkboxgroup3" @change="onCheckboxGroupChange">
          <nut-checkbox v-for="item in checkboxSource" :key="item.label" :label="item.label">
            {{ item.value }}
          </nut-checkbox>
        </nut-checkbox-group>
      </nut-cell>

      <nut-cell>
        <view flex="~ gap-3">
          <nut-button type="primary" style="margin: 0 10px 0 0;" @click="toggleAll(true)">
            全选
          </nut-button>
          <nut-button type="info" style="margin: 0 10px 0 0;" @click="toggleAll(false)">
            取消
          </nut-button>
          <nut-button type="warning" @click="toggleReverse()">
            反选
          </nut-button>
        </view>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="checkboxGroup使用，限制最大可选数（2个）">
      <nut-cell>
        <nut-checkbox-group v-model="checkboxgroup4" :max="2">
          <nut-checkbox label="1" style="margin: 2px 20px 0 0;">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="2">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="3" style="margin: 2px 20px 0 0;">
            组合复选框
          </nut-checkbox>
          <nut-checkbox label="4">
            组合复选框
          </nut-checkbox>
        </nut-checkbox-group>
      </nut-cell>

      <nut-cell>
        <view class="demo-check">
          当前选中值
        </view>
        <view>{{ checkboxgroup4 }}</view>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="全选/半选/取消">
      <nut-cell>
        <nut-checkbox v-model="checkbox10" :indeterminate="indeterminate" @change="onCheckbox5Change">
          全选
        </nut-checkbox>
      </nut-cell>

      <nut-checkbox-group ref="group2" v-model="checkboxgroup5" @change="onCheckbox6Change">
        <nut-cell>
          <nut-checkbox label="1" style="margin: 2px 20px 0 0;">
            组合复选框
          </nut-checkbox>
        </nut-cell>

        <nut-cell>
          <nut-checkbox label="2">
            组合复选框
          </nut-checkbox>
        </nut-cell>

        <nut-cell>
          <nut-checkbox label="3">
            组合复选框
          </nut-checkbox>
        </nut-cell>

        <nut-cell>
          <nut-checkbox label="4">
            组合复选框
          </nut-checkbox>
        </nut-cell>
      </nut-checkbox-group>
    </nut-cell-group>

    <nut-cell-group title="按钮形状">
      <nut-cell>
        <nut-checkbox-group v-model="checkboxgroup6">
          <nut-checkbox label="1" shape="button">
            按钮形状
          </nut-checkbox>
          <nut-checkbox label="2" shape="button">
            按钮形状
          </nut-checkbox>
        </nut-checkbox-group>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="自定义选中/未选中状态的值">
      <nut-cell>
        <nut-checkbox v-model="checkbox11" checked-value="100" unchecked-value="200">
          复选框 {{ checkbox11 }}
        </nut-checkbox>
      </nut-cell>
    </nut-cell-group>
  </view>
</template>

<style lang="scss">
.demo-check {
  margin-right: 10px;
}

.nut-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 5px
}

.nut-checkbox {
  .nut-checkbox__label {
    margin-left: 10px;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Checkbox"
  }
}
</route>
