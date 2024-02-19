<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import type { PopoverLocation } from 'nutui-uniapp'

export default {
  setup() {
    const state = reactive({
      showIcon: false,
      placement: false,
      darkTheme: false,
      lightTheme: false,
      Customized: false,
      disableAction: false,
      topLocation: false, // 向上弹出
      rightLocation: false, // 向右弹出
      leftLocation: false, // 向左弹出
      customPositon: false,

      showPicker: false,
      customTarget: false,
      customColor: false,
    })
    const curPostion = ref<PopoverLocation>('top')

    const columns = ref([
      { text: 'top', value: 'top' },
      { text: 'top-start', value: 'top-start' },
      { text: 'top-end', value: 'top-end' },
      { text: 'right', value: 'right' },
      { text: 'right-start', value: 'right-start' },
      { text: 'right-end', value: 'right-end' },
      { text: 'bottom', value: 'bottom' },
      { text: 'bottom-start', value: 'bottom-start' },
      { text: 'bottom-end', value: 'bottom-end' },
      { text: 'left', value: 'left' },
      { text: 'left-start', value: 'left-start' },
      { text: 'left-end', value: 'left-end' },
    ])

    const iconItemList = reactive([
      {
        name: 'option1',
      },
      {
        name: 'option2',
      },
      {
        name: 'option3',
      },
    ])

    const positionList = reactive([
      {
        name: 'option1',
      },
      {
        name: 'option2',
      },
    ])

    const itemList = reactive([
      {
        name: 'option1',
        icon: 'my2',
      },
      {
        name: 'option2',
        icon: 'cart2',
      },
      {
        name: 'option3',
        icon: 'location',
      },
    ])

    const itemListDisabled = reactive([
      {
        name: 'option1',
        disabled: true,
      },
      {
        name: 'option2',
        disabled: true,
      },
      {
        name: 'option3',
      },
    ])

    const selfContent = reactive([
      {
        name: 'service',
        desc: 'option1',
      },
      {
        name: 'notice',
        desc: 'option2',
      },
      {
        name: 'location',
        desc: 'option3',
      },
      {
        name: 'category',
        desc: 'option4',
      },
      {
        name: 'scan-2',
        desc: 'option5',
      },
      {
        name: 'message',
        desc: 'option6',
      },
    ])

    const chooseItem = (item: unknown, index: number) => {
    /* eslint-disable no-console */
      console.log(item, index)
    }

    const handlePicker = () => {
      state.showPicker = true
      setTimeout(() => {
        state.customPositon = true
      }, 1000)
    }

    const change = ({ selectedValue }: any) => {
      curPostion.value = selectedValue[0]
      if (state.showPicker)
        state.customPositon = true
    }

    const clickCustomHandle = () => {
      state.customTarget = !state.customTarget
    }

    const closePicker = () => {
      state.customPositon = false
      state.showPicker = false
    }

    return {
      iconItemList,
      itemList,
      ...toRefs(state),
      itemListDisabled,
      selfContent,
      chooseItem,
      curPostion,
      positionList,
      columns,
      change,
      handlePicker,
      clickCustomHandle,
      closePicker,
    }
  },
}
</script>

<template>
  <div class="demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-row type="flex">
      <nut-col :span="8">
        <nut-popover
          v-model:visible="lightTheme"
          :list="iconItemList"
          location="bottom-start"
          @choose="chooseItem"
        >
          <template #reference>
            <nut-button type="primary" shape="square">
              明朗风格
            </nut-button>
          </template>
        </nut-popover>
      </nut-col>
      <nut-col :span="8">
        <nut-popover v-model:visible="darkTheme" theme="dark" :list="iconItemList">
          <template #reference>
            <nut-button type="primary" shape="square">
              暗黑风格
            </nut-button>
          </template>
        </nut-popover>
      </nut-col>
    </nut-row>

    <h2 class="title">
      选项配置
    </h2>
    <nut-row type="flex">
      <nut-col :span="8">
        <nut-popover v-model:visible="showIcon" theme="dark" :list="itemList" custom-class="popover-demo-custom">
          <template #reference>
            <nut-button type="primary" shape="square">
              展示图标
            </nut-button>
          </template>
        </nut-popover>
      </nut-col>
      <nut-col :span="8">
        <nut-popover
          v-model:visible="disableAction"
          :list="itemListDisabled"
          location="right-start"
          custom-class="popover-demo-custom"
        >
          <template #reference>
            <nut-button type="primary" shape="square">
              禁用选项
            </nut-button>
          </template>
        </nut-popover>
      </nut-col>
    </nut-row>

    <h2 class="title">
      自定义内容
    </h2>
    <nut-popover v-model:visible="Customized" location="right" custom-class="customClass">
      <template #reference>
        <nut-button type="primary" shape="square">
          自定义内容
        </nut-button>
      </template>

      <template #content>
        <div class="p-10px">
          <div> Custom Content Custom Content </div>
          <div> Custom Content Custom Content </div>
        </div>
      </template>
    </nut-popover>

    <h2 class="title">
      位置自定义
    </h2>
    <nut-cell title="点击查看更多方向" @click="handlePicker" />

    <nut-popup v-model:visible="showPicker" :destroy-on-close="false" position="bottom" custom-class="popover-demo-custom">
      <nut-picker
        :columns="columns as any"
        @change="change"
        @confirm="closePicker"
        @close="closePicker"
      >
        <template #top>
          <div class="brick-box">
            <div id="picker-target" class="brick" />
          </div>
        </template>
      </nut-picker>
    </nut-popup>

    <nut-popover
      v-model:visible="customPositon"
      target-id="picker-target"
      :location="curPostion"
      theme="dark"
      :list="positionList"
    />

    <h2 class="title">
      自定义颜色
    </h2>

    <nut-popover
      v-model:visible="customColor"
      :list="iconItemList"
      location="right-start"
      bg-color="#f00"
      theme="dark"
      custom-class="popover-demo-custom"
    >
      <template #reference>
        <nut-button type="primary" shape="square">
          自定义颜色
        </nut-button>
      </template>
    </nut-popover>
  </div>
</template>

<style lang="scss">
.nut-popover-content {
  width: 100px;
}

.brick-box {
  margin: 80px 0;
  display: flex;
  justify-content: center;
}
.brick {
  width: 60px;
  height: 60px;
  background: #fa2c19;
  border-radius: 10px;
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Popover"
  }
}
</route>
