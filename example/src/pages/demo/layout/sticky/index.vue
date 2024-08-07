<template>
  <div class="sticky-demo">
    <h2 class="title">
      基础用法
    </h2>

    <nut-cell title="滚动页面，即可看到下方的按钮会吸顶" />

    <nut-sticky>
      <nut-button style="margin-left: 50px" type="primary">
        吸顶按钮
      </nut-button>
    </nut-sticky>

    <h2 class="title">
      吸顶距离
    </h2>

    <nut-sticky offset-top="100">
      <nut-button style="margin-left: 50px" type="primary">
        吸顶距离 100px
      </nut-button>
    </nut-sticky>

    <view style="height: 1500px" />

    <nut-divider>已到底部</nut-divider>
  </div>
</template>

<style lang="scss" scoped>
.nut-theme-dark {
  .sticky-demo {
    background: black !important;
  }
}

.sticky-demo {
  padding: 17px 17px 17px;
  background: #f7f8fa;

  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  .title {
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: normal;
    color: rgb(144 156 164 / 100%);
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Sticky"
  }
}
</route>
