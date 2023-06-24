<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const active = ref(2)
    const activeName = ref('category')
    function tabSwitch(item: any, index: number) {

      // uni.showToast({
      //   title: `${JSON.stringify(item)},${index}`,
      //   icon: 'none',
      // })
    }
    const activeImg = ref(
      'https://img11.360buyimg.com/imagetools/jfs/t1/70423/4/20553/3652/62e74629E23ba550e/aeeed0e3b9f43ae6.png',
    )
    const unactiveImg = ref(
      'https://img13.360buyimg.com/imagetools/jfs/t1/23319/19/18329/3084/62e7c346E957c54ef/6c3e8a49e52b76f2.png',
    )
    const List = [
      {
        title: '标签',
        icon: 'home',
        name: 'home',
      },
      {
        title: '标签',
        icon: 'category',
        name: 'category',
      },
      {
        title: '标签',
        icon: 'find',
        name: 'find',
      },
      {
        title: '标签',
        icon: 'cart',
        name: 'cart',
      },
      {
        title: '标签',
        icon: 'my',
        name: 'my',
      },
    ]
    return {
      active,
      activeImg,
      unactiveImg,
      activeName,
      List,
      tabSwitch,

    }
  },
}
</script>

<template>
  <div class="demo">
    <h2 class="title">
      基础用法
    </h2>
    <nut-tabbar @tab-switch="tabSwitch">
      <nut-tabbar-item badge-hidden tab-title="首页">
        <template #icon>
          <nut-icon size="16" name="home" />
        </template>
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="分类">
        <template #icon>
          <nut-icon size="16" name="category" />
        </template>
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="发现">
        <template #icon>
          <nut-icon size="16" name="find" />
        </template>
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="购物车">
        <template #icon>
          <nut-icon size="16" name="cart" />
        </template>
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="我的">
        <template #icon>
          <nut-icon size="16" name="my" />
        </template>
      </nut-tabbar-item>
    </nut-tabbar>
    <h2 class="title">
      通过名称匹配
    </h2>

    <nut-tabbar v-model="activeName" @tab-switch="tabSwitch">
      <nut-tabbar-item
        v-for="(item, index) in List"
        :key="index"
        :name="item.name"
        :tab-title="item.title"
        :icon="item.icon"
      />
    </nut-tabbar>
    <h2 class="title">
      自定义图标
    </h2>
    <nut-tabbar @tab-switch="tabSwitch">
      <nut-tabbar-item tab-title="首页">
        <template #icon="props">
          <img v-if="props.active" class="icon-img" :src="activeImg">
          <img v-else class="icon-img" :src="unactiveImg">
        </template>
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="分类">
        <template #icon="props">
          <img v-if="props.active" class="icon-img" :src="activeImg">
          <img v-else class="icon-img" :src="unactiveImg">
        </template>
      </nut-tabbar-item>
      <nut-tabbar-item tab-title="发现">
        <template #icon="props">
          <img v-if="props.active" class="icon-img" :src="activeImg">
          <img v-else class="icon-img" :src="unactiveImg">
        </template>
      </nut-tabbar-item>
    </nut-tabbar>

    <h2 class="title">
      自定义选中
    </h2>
    <nut-tabbar v-model="active">
      <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon" />
    </nut-tabbar>

    <h2 class="title">
      徽标提示
    </h2>
    <nut-tabbar>
      <nut-tabbar-item tab-title="首页" icon="home" :value="11" />
      <nut-tabbar-item tab-title="分类" icon="category" :dot="true" />
      <nut-tabbar-item tab-title="发现" icon="find" :value="110" />
      <nut-tabbar-item tab-title="购物车" icon="cart" />
      <nut-tabbar-item tab-title="我的" icon="my" />
    </nut-tabbar>

    <h2 class="title">
      自定义颜色
    </h2>
    <nut-tabbar unactive-color="#7d7e80" active-color="#1989fa">
      <nut-tabbar-item v-for="(item, index) in List" :key="index" :tab-title="item.title" :icon="item.icon" />
    </nut-tabbar>
    <h2 class="title">
      三个icon的tabbar
    </h2>
    <nut-tabbar unactive-color="#7d7e80" active-color="#1989fa">
      <nut-tabbar-item tab-title="首页" icon="home" />
      <nut-tabbar-item tab-title="分类" icon="category" />
      <nut-tabbar-item tab-title="发现" icon="find" />
    </nut-tabbar>
    <h2 class="title">
      固定底部，可自由跳转
    </h2>
    <nut-tabbar :bottom="true" :safe-area-inset-bottom="true" placeholder>
      <nut-tabbar-item tab-title="首页" href="" icon="home" />
      <nut-tabbar-item tab-title="分类" icon="category" />
      <nut-tabbar-item tab-title="发现" icon="find" />
      <nut-tabbar-item tab-title="购物车" icon="cart" />
      <nut-tabbar-item tab-title="我的" icon="my" />
    </nut-tabbar>
  </div>
</template>

<style lang="scss">
.icon-img{
  width: 18px;
  height: 18px;
}
</style>

<route lang="json">
{
"style": {
    "navigationBarTitleText": "TabBar"
  }
}
</route>
