<script lang="ts">
import { reactive } from 'vue'

export default {

  props: {},
  setup() {
    const state = reactive({
      tab1value: '0',
      tab11value: '0',
      tab2value: '0',
      tab3value: '0',
      tab4value: '0',
      tab5value: '0',
      tab6value: '0',
      tab7value: 'c1',
      list3: Array.from(Array.from({ length: 2 }).keys()),
      list4: Array.from(Array.from({ length: 10 }).keys()),
      list5: Array.from(Array.from({ length: 2 }).keys()),
      list6: [
        {
          title: '自定义 1',
          paneKey: 'c1',
          icon: 'dongdong',
        },
        {
          title: '自定义 2',
          paneKey: 'c2',
          icon: 'JD',
        },
        {
          title: '自定义 3',
          paneKey: 'c3',
        },
      ],
    })
    setTimeout(() => {
      state.list3.push(999)
    }, 3000)
    return { state }
  },
}
</script>

<template>
  <div class="demo full">
    <h2 class="title">
      基础用法
    </h2>
    <nut-tabs v-model="state.tab1value">
      <nut-tab-pane title="Tab 1">
        Tab 1
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      自定义标题对齐方式
    </h2>
    <nut-tabs v-model="state.tab1value" align="left">
      <nut-tab-pane title="Tab 1">
        Tab 1
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>

    <h2 class="title">
      手势滑动切换
    </h2>
    <nut-tabs v-model="state.tab1value" swipeable>
      <nut-tab-pane title="Tab 1">
        Tab 1
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      基础用法-微笑曲线
    </h2>
    <nut-tabs v-model="state.tab11value" type="smile">
      <nut-tab-pane title="Tab 1">
        Tab 1
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      通过 pane-key 匹配
    </h2>
    <nut-tabs v-model="state.tab2value" swipeable>
      <nut-tab-pane title="Tab 1" pane-key="0">
        Tab 1
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2" pane-key="1" :disabled="true">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3" pane-key="2">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      Tab Pane 自动高度
    </h2>
    <nut-tabs v-model="state.tab2value" :auto-height="true">
      <nut-tab-pane title="Tab 1" pane-key="0">
        <p>Tab 1</p>
        <p>Tab 1</p>
        <p>Tab 1</p>
        <p>Tab 1</p>
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2" pane-key="1">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3" pane-key="2">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      数据异步渲染 3s
    </h2>
    <nut-tabs v-model="state.tab3value">
      <nut-tab-pane v-for="item in state.list3" :key="item" :title="`Tab ${item}`">
        Tab {{ item }}
      </nut-tab-pane>
    </nut-tabs>

    <h2 class="title">
      数量多，滚动操作（横向）
    </h2>
    <nut-tabs v-model="state.tab4value" title-scroll title-gutter="10">
      <nut-tab-pane v-for="item in state.list4" :key="item" :title="`Tab ${item}`">
        Tab {{ item }}
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      数量多，滚动操作（纵向）
    </h2>
    <nut-tabs
      v-model="state.tab4value" title-scroll direction="vertical"
      custom-style="height: 220px;"
    >
      <nut-tab-pane v-for="item in state.list4" :key="item" :title="`Tab ${item}`">
        Tab {{ item }}
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      左右布局
    </h2>
    <nut-tabs v-model="state.tab5value" custom-style="height: 300px;" title-scroll direction="vertical">
      <nut-tab-pane v-for="item in state.list5" :key="item" :pane-key="item" :title="`Tab ${item}`">
        Tab {{ item }}
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      左右布局-微笑曲线
    </h2>
    <nut-tabs v-model="state.tab6value" custom-style="height: 300px;" type="smile" title-scroll direction="vertical">
      <nut-tab-pane v-for="item in state.list5" :key="item" :pane-key="item" :title="`Tab ${item}`">
        Tab {{ item }}
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      标签栏字体尺寸 large normal small
    </h2>
    <nut-tabs v-model="state.tab1value" size="large">
      <nut-tab-pane title="Tab 1">
        Tab 1
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
    <nut-tabs v-model="state.tab1value" size="normal">
      <nut-tab-pane title="Tab 1">
        Tab 1
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
    <nut-tabs v-model="state.tab1value" size="small">
      <nut-tab-pane title="Tab 1">
        Tab 1
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
    <h2 class="title">
      自定义标签栏
    </h2>
    <nut-tabs v-model="state.tab7value" swipeable>
      <template #titles>
        <div class="title-list">
          <view
            v-for="item in state.list6" :key="item.paneKey" class="title-item"
            :class="{ 'tabs-active': state.tab7value === item.paneKey }" @click="state.tab7value = item.paneKey"
          >
            <nut-icon name="dongdong" />
            <view class="nut-tabs__titles-item__text">
              {{ item.title }}
            </view>
            <view class="item__line" />
          </view>
        </div>
      </template>
      <nut-tab-pane v-for="item in state.list6" :key="item.paneKey" title="" :pane-key="item.paneKey">
        {{ item.title }}
      </nut-tab-pane>
    </nut-tabs>
    <nut-tabs v-model="state.tab11value" direction="vertical">
      <nut-tab-pane title="Tab 1" pane-key="0">
        <nut-tabs v-model="state.tab1value">
          <nut-tab-pane title="Tab 1" pane-key="0.0">
            Tab 1
          </nut-tab-pane>
          <nut-tab-pane title="Tab 2" pane-key="0.1">
            Tab 2
          </nut-tab-pane>
          <nut-tab-pane title="Tab 3" pane-key="0.2">
            Tab 3
          </nut-tab-pane>
        </nut-tabs>
      </nut-tab-pane>
      <nut-tab-pane title="Tab 2" pane-key="1">
        Tab 2
      </nut-tab-pane>
      <nut-tab-pane title="Tab 3" pane-key="2">
        Tab 3
      </nut-tab-pane>
    </nut-tabs>
  </div>
</template>

<style lang="scss" scoped>
.title-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  .title-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .tabs-active {
    font-weight: bold;
    color: $tabs-titles-item-active-color;
    opacity: $tabs-titles-item-line-opacity;
    transition: width 0.3s ease;

    .item__line {
      position: absolute;
      bottom: -10%;
      left: 50%;
      overflow: hidden;
      content: ' ';
      border-radius: $tabs-titles-item-line-border-radius;
      opacity: $tabs-titles-item-line-opacity;
      transition: width 0.3s ease;
      transform: translate(-50%, 0);
      width: $tabs-horizontal-titles-item-active-line-width;
      height: 3px;
      content: ' ';
      background: $tabs-horizontal-tab-line-color;
    }
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Tabs"
  }
}
</route>
