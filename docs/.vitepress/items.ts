export const components = [
  {
    text: '基础组件',
    collapsed: false,
    items: [
      { text: 'Button 按钮', link: '/components/basic/button' },
      { text: 'Cell 单元格', link: '/components/basic/cell' },
      { text: 'ConfigProvider 全局配置', link: '/components/basic/configprovider' },
      { text: 'Icon 图标', link: '/components/basic/icon' },
      { text: 'Overlay 遮照层', link: '/components/basic/overlay' },
      { text: 'Popup 弹出层', link: '/components/basic/popup' },
      { text: 'Transition 过渡', link: '/components/basic/transition' },
    ],
  },
  {
    text: '布局组件',
    collapsed: false,
    items: [
      { text: 'Divider 分割线', link: '/components/layout/divider' },
      { text: 'Grid 宫格', link: '/components/layout/grid' },
      { text: 'Layout 布局', link: '/components/layout/layout' },
      { text: 'Sticky 粘性布局', link: '/components/layout/sticky' },
    ],
  },
  {
    text: '导航组件',
    collapsed: false,
    items: [
      { text: 'Elevator 电梯楼层', link: '/components/nav/elevator' },
      { text: 'FixedNav 悬浮导航', link: '/components/nav/fixednav' },
      { text: 'Indicator 指示器', link: '/components/nav/indicator' },
      { text: 'Menu 菜单', link: '/components/nav/menu' },
      { text: 'Navbar 头部导航', link: '/components/nav/navbar' },
      { text: 'Pagination 分页', link: '/components/nav/pagination' },
      { text: 'SideNavbar 侧边栏导航', link: '/components/nav/sidenavbar' },
      { text: 'Tabbar 标签栏', link: '/components/nav/tabbar' },
      { text: 'Tabs 选项卡切换', link: '/components/nav/tabs' },

    ],
  },
  {
    text: '操作反馈',
    collapsed: false,
    items: [
      { text: 'ActionSheet 动作面板', link: '/components/feedback/actionsheet' },
      { text: 'Backtop 返回顶部', link: '/components/feedback/backtop' },
      { text: 'Dialog 对话框', link: '/components/feedback/dialog' },
      { text: 'Drag 拖拽', link: '/components/feedback/drag' },
      { text: 'Notify 消息通知', link: '/components/feedback/notify' },
      { text: 'Swipe 滑动手势', link: '/components/feedback/swipe' },
      { text: 'Switch 开关', link: '/components/feedback/switch' },
      { text: 'Toast 吐司', link: '/components/feedback/toast' },

    ],
  },
]

export const navComponents = components.map(i => ({ text: i.text, link: i.items[0].link }))

export const guides = [
  { text: '快速上手', link: '/guide/quick-start' },
  { text: '安装', link: '/guide/install' },
  // { text: '概览', link: '/guide/overview' },
  { text: '国际化', link: '/guide/i18n' },
  { text: '定制主题', link: '/guide/theme' },
  // { text: '暗黑模式', link: '/guide/dark' },
  { text: '更新日志', link: '/guide/changelog' },
]
