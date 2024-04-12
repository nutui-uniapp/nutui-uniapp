<script lang="ts" setup>
const show = ref<boolean>(true)

function close() {
  show.value = false
}
</script>

<template>
  <view class="demo h-100vh!">
    <nut-cell-group title="基础用法">
      <nut-cell title="primary 类型">
        <template #link>
          <nut-tag type="primary">
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="success 类型">
        <template #link>
          <nut-tag type="success">
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="danger 类型">
        <template #link>
          <nut-tag type="danger">
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="warning 类型">
        <template #link>
          <nut-tag type="warning">
            标签
          </nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="样式风格">
      <nut-cell title="空心样式">
        <template #link>
          <nut-tag plain>
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="圆角样式">
        <template #link>
          <nut-tag type="primary" round>
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="标记样式">
        <template #link>
          <nut-tag type="primary" mark>
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="可关闭标签">
        <template #link>
          <nut-tag v-if="show" type="primary" closeable @close="close">
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="关闭图标大小">
        <template #link>
          <nut-tag type="primary" closeable close-icon-size="8">
            标签
          </nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="颜色自定义">
      <nut-cell title="背景颜色">
        <template #link>
          <nut-tag custom-color="#fa685d">
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="文字颜色">
        <template #link>
          <nut-tag custom-color="#e9e9e9" text-color="#999999">
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="空心颜色">
        <template #link>
          <nut-tag custom-color="#fa2400" plain>
            标签
          </nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>

    <nut-cell-group title="禁用状态">
      <nut-cell title="普通标签">
        <template #link>
          <nut-tag type="primary" disabled>
            标签
          </nut-tag>
        </template>
      </nut-cell>
      <nut-cell title="可关闭标签">
        <template #link>
          <nut-tag v-if="show" type="primary" closeable disabled @close="close">
            标签
          </nut-tag>
        </template>
      </nut-cell>
    </nut-cell-group>
  </view>
</template>

<style lang="scss" scoped>
.nut-tag {
  margin-right: 15px;

  &:last-child {
    margin-bottom: 0;
    margin-right: 0;
  }
}

.nut-cell {
  align-items: flex-end;
  border-radius: 0;

  .nut-cell__title {
    font-size: 13px;
    font-weight: 500;
    color: #666;
  }
}
</style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "Tag"
  }
}
</route>
