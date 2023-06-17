<script lang="ts">
import { isH5 } from '@uni-helper/uni-env'

export default {

  setup(props) {
    return {
      isH5,
    }
  },
}
</script>

<template>
  <div class="demo full layout-demo" :class="{ web: isH5 }">
    <h2 class="title">
      基础布局
    </h2>
    <div class="box-item n-bg-2">
      <nut-row>
        <nut-col :span="24">
          <div class="flex-content">
            span:24
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="12">
          <div class="flex-content">
            span:12
          </div>
        </nut-col>
        <nut-col :span="12">
          <div class="flex-content flex-content-light">
            span:12
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="8">
          <div class="flex-content">
            span:8
          </div>
        </nut-col>
        <nut-col :span="8">
          <div class="flex-content flex-content-light">
            span:8
          </div>
        </nut-col>
        <nut-col :span="8">
          <div class="flex-content">
            span:8
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content flex-content-light">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
      </nut-row>
    </div>
    <h2 class="title">
      分栏间隔
    </h2>
    <div class="box-item n-bg-2">
      <nut-row :gutter="10">
        <nut-col :span="8">
          <div class="flex-content">
            span:8
          </div>
        </nut-col>
        <nut-col :span="8">
          <div class="flex-content flex-content-light">
            span:8
          </div>
        </nut-col>
        <nut-col :span="8">
          <div class="flex-content">
            span:8
          </div>
        </nut-col>
      </nut-row>
    </div>
    <h2 class="title">
      Flex布局
    </h2>
    <div class="box-item n-bg-2">
      <nut-row type="flex" wrap="nowrap">
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content flex-content-light">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
      </nut-row>
      <nut-row type="flex" justify="center">
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content flex-content-light">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
      </nut-row>
      <nut-row type="flex" justify="end">
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content flex-content-light">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
      </nut-row>
      <nut-row type="flex" justify="space-between">
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content flex-content-light">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
      </nut-row>
      <nut-row type="flex" justify="space-around">
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content flex-content-light">
            span:6
          </div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content">
            span:6
          </div>
        </nut-col>
      </nut-row>
    </div>
  </div>
</template>

<style lang="scss">
.box-item n-bg-2 {
  background: #fff;
  margin-bottom: 20px;
  padding: 20px 0;
}
.layout-demo .nut-row {
  overflow: hidden;
  &:not(:last-child) .nut-col {
    margin-bottom: 15px;
  }
}
.flex-content {
  line-height: 40px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  background: #ff8881;
  &.flex-content-light {
    background: #ffc7c4;
  }
  &.flex-content-height {
    height: 50px;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Layout"
  }
}
</route>
