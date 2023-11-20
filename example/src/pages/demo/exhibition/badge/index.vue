<script lang="ts" setup>

</script>

<template>
  <view class="demo badge-demo h-100vh!">
    <h2 class="title">
      基础用法
    </h2>
    <nut-row>
      <nut-badge :value="8">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge :value="76">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge value="NEW">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge value="NEW" bubble>
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge dot>
        <nut-avatar shape="square" />
      </nut-badge>
    </nut-row>
    <h2 class="title">
      最大值
    </h2>
    <nut-row>
      <nut-badge :value="200" :max="9">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge :value="200" :max="20">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge :value="200" :max="99">
        <nut-avatar shape="square" />
      </nut-badge>
    </nut-row>

    <h2 class="title">
      自定义颜色
    </h2>
    <nut-row>
      <nut-badge :value="8" color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge :value="76" color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge value="NEW" color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge dot color="linear-gradient(315deg, rgba(73,143,242,1) 0%,rgba(73,101,242,1) 100%)">
        <nut-avatar shape="square" />
      </nut-badge>
    </nut-row>

    <h2 class="title">
      自定义徽标内容
    </h2>
    <nut-row>
      <nut-badge>
        <template #icon>
          <nut-icon name="check" color="#1919" size="12px" />
        </template>
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge>
        <template #icon>
          <nut-icon name="link" color="#ffffff" size="12px" />
        </template>
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge>
        <template #icon>
          <nut-icon name="download" color="#ffffff" size="12px" />
        </template>
        <nut-avatar shape="square" />
      </nut-badge>
    </nut-row>

    <h2 class="title">
      自定义位置
    </h2>
    <nut-row>
      <nut-badge :value="8" top="5" right="5">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge :value="76" top="10" right="10">
        <nut-avatar shape="square" />
      </nut-badge>
      <nut-badge value="NEW">
        <nut-avatar shape="square" />
      </nut-badge>
    </nut-row>

    <h2 class="title">
      独立展示
    </h2>
    <nut-row>
      <nut-badge :value="8" />
      <nut-badge :value="76" />
      <nut-badge value="NEW" />
    </nut-row>
  </view>
</template>

<style lang="scss">
.badge-demo {
  .nut-badge {
    margin-top: 20px;
    margin-right: 40px;
  }
}
</style>

<route lang="json">
{
"style": {
    "navigationBarTitleText": "Badge"
  }
}
</route>
