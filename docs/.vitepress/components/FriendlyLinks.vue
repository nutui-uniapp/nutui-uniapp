<script lang="ts" setup>
import VPFeature from 'vitepress/dist/client/theme-default/components/VPFeature.vue'
import { computed } from 'vue'

const _list = [
  {
    id: 'uni-helper',
    icon: 'https://oss.xiaohe.ink/images/uni-helper.png',
    title: 'Uni Helper',
    details: '旨在增强 uni-app 系列产品的开发体验',
    link: 'https://uni-helper.cn',
  },
  {
    id: 'uni-echarts',
    icon: 'https://oss.xiaohe.ink/images/uni-echarts.png',
    title: 'Uni ECharts',
    details: '适用于 uni-app 的 Apache ECharts 组件',
    link: 'https://uni-echarts.xiaohe.ink',
  },
]

const list = computed(() => {
  return _list.map(item => ({
    ...item,
    icon: {
      src: item.icon,
    },
  }))
})

const itemClasses = computed(() => {
  const value: any[] = []

  const length = list.value.length

  if (length === 2) {
    return 'grid-2'
  }
  else if (length === 3) {
    return 'grid-3'
  }
  else if (length % 3 === 0) {
    return 'grid-6'
  }
  else if (length > 3) {
    return 'grid-4'
  }

  return value
})
</script>

<template>
  <div v-if="list.length > 0" class="VPFeatures">
    <div class="container">
      <h1 class="friendly-title">友情链接</h1>

      <div class="items">
        <div
          v-for="(item) in list"
          :key="item.id"
          class="item"
          :class="itemClasses"
        >
          <VPFeature
            :icon="item.icon"
            :title="item.title"
            :details="item.details"
            :link="item.link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* stylelint-disable selector-class-pattern */

.VPFeatures {
  position: relative;
  padding: 0 24px;
}

@media (width >= 640px) {
  .VPFeatures {
    padding: 0 48px;
  }
}

@media (width >= 960px) {
  .VPFeatures {
    padding: 0 64px;
  }
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

.friendly-title {
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 24px;
  text-align: center;
}

.items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}

.item {
  width: 100%;
  padding: 8px;
}

@media (width >= 640px) {
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}

@media (width >= 768px) {
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }

  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
}

@media (width >= 960px) {
  .item.grid-4 {
    width: calc(100% / 4);
  }
}
</style>
