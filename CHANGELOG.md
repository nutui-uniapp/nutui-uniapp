## [1.8.4](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.8.3...v1.8.4) (2025-05-16)

### Bug Fixes

* **transition:** 修复部分环境编译报错 ([#462](https://github.com/nutui-uniapp/nutui-uniapp/issues/462)) ([683ad81](https://github.com/nutui-uniapp/nutui-uniapp/commit/683ad81d1d9fc57690b198e6d47eb739d9c15ef9))

### Features

* **form-item:** 新增 `is-link` 属性 ([#458](https://github.com/nutui-uniapp/nutui-uniapp/issues/458)) ([e701697](https://github.com/nutui-uniapp/nutui-uniapp/commit/e70169776b91725a0a7bd0ba7d1f3be91067beb5))

## [1.8.3](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.8.2...v1.8.3) (2025-03-07)

### Bug Fixes

* **toast,notify,guessgift,addresslist:** 修复setTimeout类型错误 ([c2f86f5](https://github.com/nutui-uniapp/nutui-uniapp/commit/c2f86f53607ec1f3cab3fa8dd18e7fabfb6aba20))

### Features

* **input:** 新增 password 属性 ([#456](https://github.com/nutui-uniapp/nutui-uniapp/issues/456)) ([98d40ce](https://github.com/nutui-uniapp/nutui-uniapp/commit/98d40cee93dc6f17e706746f7af88719e7154da1))

## [1.8.2](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.8.1...v1.8.2) (2025-01-15)

### Bug Fixes

* **hooks:** 修复useSelectorQuery在app平台查询节点数据为空的问题 ([#446](https://github.com/nutui-uniapp/nutui-uniapp/issues/446)) ([4e7ceb6](https://github.com/nutui-uniapp/nutui-uniapp/commit/4e7ceb6a62bd541a574957c288491eefffc74edf))
* **input :** 修复自动聚焦时默认光标位置在最左侧 ([#451](https://github.com/nutui-uniapp/nutui-uniapp/issues/451)) ([255c067](https://github.com/nutui-uniapp/nutui-uniapp/commit/255c06791e8beeab7276a9434892e93054ef9ade))
* **menu:** 修复点击菜单无法正常切换的问题 ([#449](https://github.com/nutui-uniapp/nutui-uniapp/issues/449)) ([fa60cbb](https://github.com/nutui-uniapp/nutui-uniapp/commit/fa60cbb8c10d1ff0f8978e268392d22219d54d94))
* **table:** 修复column的align、sorter类型声明错误 ([d936d5f](https://github.com/nutui-uniapp/nutui-uniapp/commit/d936d5ffde9e7275b46d67f5a661f96dbd127414))
* **uploader:** 修复data外部修改后提交时依然是旧值问题 ([#445](https://github.com/nutui-uniapp/nutui-uniapp/issues/445)) ([c1e7a58](https://github.com/nutui-uniapp/nutui-uniapp/commit/c1e7a58373b894fdaca5576bd22eb508afed387b))

### Features

* **progress:** 新增ProgressStatus类型导出 ([ea5fb65](https://github.com/nutui-uniapp/nutui-uniapp/commit/ea5fb652fddc03c9660690e6caee2a7c3c2c7c6f))

## [1.8.1](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.8.0...v1.8.1) (2024-10-30)

### Bug Fixes

* **menu:** 修复menu组件在app平台报错的问题 ([#443](https://github.com/nutui-uniapp/nutui-uniapp/issues/443)) ([9501324](https://github.com/nutui-uniapp/nutui-uniapp/commit/9501324f5dc9402bf794e5d1ca554bd308a1faf0))
* **picker:** 修复深色模式下选中项边框颜色突兀 ([7b3bc4b](https://github.com/nutui-uniapp/nutui-uniapp/commit/7b3bc4b637b89ebe3686a107c723df20b1aeee64))
* **picker:** 修复showToolbar为false时,picker组件宽度为0不显示的问题 ([#442](https://github.com/nutui-uniapp/nutui-uniapp/issues/442)) ([76bd48d](https://github.com/nutui-uniapp/nutui-uniapp/commit/76bd48d6bc8c121084346f3cf80082214468626a))
* **uploader:** 修复uploader组件在app端，succes事件之后还执行progress事件的问题 ([#441](https://github.com/nutui-uniapp/nutui-uniapp/issues/441)) ([d750496](https://github.com/nutui-uniapp/nutui-uniapp/commit/d7504969eee73b9b0fee6220872fa558c03d4cf6))

# [1.8.0](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.17...v1.8.0) (2024-10-14)

### Bug Fixes

* **dialog:** 修复小程序平台启用 `close-on-popstate` 时 `onMounted` 报错 ([#435](https://github.com/nutui-uniapp/nutui-uniapp/issues/435)) ([93127f5](https://github.com/nutui-uniapp/nutui-uniapp/commit/93127f557ad6cbbf04b88611868f9fb59a786875))
* **popup:** 修复 `visible` 初始值为 `true` 时丢失 `z-index` 问题 ([#437](https://github.com/nutui-uniapp/nutui-uniapp/issues/437)) ([47adc2a](https://github.com/nutui-uniapp/nutui-uniapp/commit/47adc2a17ac85413d310d7849186782b1414e809))
* **short-password:** 修复 `close-on-click-overlay` 属性无效 ([#436](https://github.com/nutui-uniapp/nutui-uniapp/issues/436)) ([e62dfb0](https://github.com/nutui-uniapp/nutui-uniapp/commit/e62dfb0ac69fa2b7c4834d640dee0426d43cb5b8))

## [1.7.17](https://github.com/xiaohe0601/nutui-uniapp/compare/v1.7.16...v1.7.17) (2024-09-18)

### Bug Fixes

* **inputnumber:** 新增step-strictly属性 ([#421](https://github.com/xiaohe0601/nutui-uniapp/issues/421)) ([c0a3c47](https://github.com/xiaohe0601/nutui-uniapp/commit/c0a3c47099f19db14716704d5ba2b52dc31541ec))
* **inputnumber:** 修复失焦后未正确按照最大/最小值修改输入值 ([#420](https://github.com/xiaohe0601/nutui-uniapp/issues/420)) ([be3059f](https://github.com/xiaohe0601/nutui-uniapp/commit/be3059f5e82e713a7df5f33eb31cc8fc89b7766a))

### Features

* **cell:** 新增title-width属性 ([#418](https://github.com/xiaohe0601/nutui-uniapp/issues/418)) ([3079495](https://github.com/xiaohe0601/nutui-uniapp/commit/3079495a522af1ae75073efa0830dde43835bd00))

## [1.7.16](https://github.com/xiaohe0601/nutui-uniapp/compare/v1.7.15...v1.7.16) (2024-09-04)

### Bug Fixes

* **popover,shakedice,tour:** fix scss warning ([#413](https://github.com/xiaohe0601/nutui-uniapp/issues/413)) ([28df492](https://github.com/xiaohe0601/nutui-uniapp/commit/28df492f6daa00da26e72f619e8f2d5073489785))

### Features

* **notify:** 新增useNotify ([873b454](https://github.com/xiaohe0601/nutui-uniapp/commit/873b4545ec277b6227ea90d23d8880d0d531edb8))

## [1.7.15](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.14...v1.7.15) (2024-08-17)

### Bug Fixes

* 修复部分机型不支持css inset ([#400](https://github.com/nutui-uniapp/nutui-uniapp/issues/400)) ([f282aad](https://github.com/nutui-uniapp/nutui-uniapp/commit/f282aad819bad85060f2ec6b4302df9c7e1ad61c))
* **number-keyboard:** 修复部分机型不支持inset ([#396](https://github.com/nutui-uniapp/nutui-uniapp/issues/396)) ([d06336e](https://github.com/nutui-uniapp/nutui-uniapp/commit/d06336e2996fbe264b56de7d8e142c9a5368ddea))
* **range:** 修复可能存在flex-shrink为0时的样式异常 ([0f3ced7](https://github.com/nutui-uniapp/nutui-uniapp/commit/0f3ced77bdb2edc0c3bbd1691af8a6916cc39da3))
* **short-password:** 修复部分机型不支持inset ([#397](https://github.com/nutui-uniapp/nutui-uniapp/issues/397)) ([7d4eb7e](https://github.com/nutui-uniapp/nutui-uniapp/commit/7d4eb7ed4caf13a0ff9b76411602e0e359a8a359))
* **short-password:** 修复忘记密码文本对齐问题 ([#393](https://github.com/nutui-uniapp/nutui-uniapp/issues/393)) ([bb000ae](https://github.com/nutui-uniapp/nutui-uniapp/commit/bb000ae7dc1add2f58a5a1927c9a12339f8dcbe9))
* **sticky:** 修复降级为fixed实现时效果异常 ([#402](https://github.com/nutui-uniapp/nutui-uniapp/issues/402)) ([15f8338](https://github.com/nutui-uniapp/nutui-uniapp/commit/15f83380e467dfbd3fad6cfe77e157668b024260))
* update type declaration from '@vue/runtime-core' to 'vue' for Vu… ([#407](https://github.com/nutui-uniapp/nutui-uniapp/issues/407)) ([14d9d78](https://github.com/nutui-uniapp/nutui-uniapp/commit/14d9d785b71b0a8be3437b286f42b2fda5340d42))

### Features

* **form:** 为form组件的validate方法的返回添加类型声明 ([#389](https://github.com/nutui-uniapp/nutui-uniapp/issues/389)) ([b3e2f3b](https://github.com/nutui-uniapp/nutui-uniapp/commit/b3e2f3b6e93f96f9cbf0cdf3b186b6d4a6fcb4ec))

## [1.7.14](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.13...v1.7.14) (2024-08-05)

### Bug Fixes

* **range:** 修复点击控制导致NaN问题 ([415c87c](https://github.com/nutui-uniapp/nutui-uniapp/commit/415c87c7d7738d57f4406387208875409cebfa31))

### Features

* **cell:** 新增icon、clickable属性 ([#384](https://github.com/nutui-uniapp/nutui-uniapp/issues/384)) ([3e4ff54](https://github.com/nutui-uniapp/nutui-uniapp/commit/3e4ff54ff558fbe37ace5201aa2721fbd07e659f))
* **checkbox:** 新增checked-value、unchecked-value属性 ([#385](https://github.com/nutui-uniapp/nutui-uniapp/issues/385)) ([9ef1b34](https://github.com/nutui-uniapp/nutui-uniapp/commit/9ef1b34f9ac63eb12d54cf60ac5f6ad9c6945043))

## [1.7.13](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.12...v1.7.13) (2024-07-30)

### Bug Fixes

* **avatar:** 修复支付宝小程序不支持??语法 ([b7df6be](https://github.com/nutui-uniapp/nutui-uniapp/commit/b7df6beddf1044a078c67681f75d7f3eb90bf4e6))
* **navbar:** 修复 navbar safe-area-inset-top 不生效的问题 ([#379](https://github.com/nutui-uniapp/nutui-uniapp/issues/379)) ([74ff480](https://github.com/nutui-uniapp/nutui-uniapp/commit/74ff480985067e7f0ebeebb74d264fe5aa3aa1d4))
* **popup,safearea:** 修复部分低版本系统safearea不生效问题 ([271e24a](https://github.com/nutui-uniapp/nutui-uniapp/commit/271e24a9b206487627bf5b59a364b306e79f50fa))

### Features

* **menu:** add scroll-top prop ([#377](https://github.com/nutui-uniapp/nutui-uniapp/issues/377)) ([7b31fdf](https://github.com/nutui-uniapp/nutui-uniapp/commit/7b31fdf9db08a0696a6ce4d6c8c52d437666aa64))

## [1.7.12](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.11...v1.7.12) (2024-07-09)

### Bug Fixes

* **input:** 修复由于[#324](https://github.com/nutui-uniapp/nutui-uniapp/issues/324)、[#325](https://github.com/nutui-uniapp/nutui-uniapp/issues/325)引出的blur事件失效 ([afb5c76](https://github.com/nutui-uniapp/nutui-uniapp/commit/afb5c76bf10972321d79c51c7a240be5eb9559a6))

## [1.7.11](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.10...v1.7.11) (2024-07-08)

### Bug Fixes

* 修复comment生产环境web端卡死 ([#352](https://github.com/nutui-uniapp/nutui-uniapp/issues/352)) ([be73ccc](https://github.com/nutui-uniapp/nutui-uniapp/commit/be73cccab1afc1d4a93d8c653437bd17b7ce4a23))
* **actionsheet:** 修复custom-style表现异常 ([#360](https://github.com/nutui-uniapp/nutui-uniapp/issues/360)) ([25fc6a1](https://github.com/nutui-uniapp/nutui-uniapp/commit/25fc6a12fa943fd1b6c233dc15b529867fd03446))
* **input:** 修复小程序端clear清除困难问题 ([#324](https://github.com/nutui-uniapp/nutui-uniapp/issues/324)) ([155b00b](https://github.com/nutui-uniapp/nutui-uniapp/commit/155b00bcb3255763634a0227f197894dd2e1aae2))
* **input:** 修复由于capture引起的blur参数丢失 ([#325](https://github.com/nutui-uniapp/nutui-uniapp/issues/325)) ([a1351ad](https://github.com/nutui-uniapp/nutui-uniapp/commit/a1351addfe187914983fad1da4f9039348574eda))
* **popup:** 修复z-index表现异常 ([#364](https://github.com/nutui-uniapp/nutui-uniapp/issues/364)) ([cd50fc3](https://github.com/nutui-uniapp/nutui-uniapp/commit/cd50fc31d3b8e13771b30429de003cf6522e81ee))
* **toast:** 修复部分情况下toast的duration属性无效 ([1885ded](https://github.com/nutui-uniapp/nutui-uniapp/commit/1885ded405a0cadf00dd2adb9865c98a05f7e682))

### Features

* **menuitem:** 新增item-click事件 ([#323](https://github.com/nutui-uniapp/nutui-uniapp/issues/323)) ([df9eeed](https://github.com/nutui-uniapp/nutui-uniapp/commit/df9eeed564f89f3ed111f91f2837c0ec8b0088cc))
* **tab-pane:** 新增padding、background样式变量 ([#326](https://github.com/nutui-uniapp/nutui-uniapp/issues/326)) ([bf5ebae](https://github.com/nutui-uniapp/nutui-uniapp/commit/bf5ebae39aa9769c9c212fae0910c2e12621fdec))

## [1.7.10](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.9...v1.7.10) (2024-05-08)

### Bug Fixes

* **input-number:** 修复小程序不支持vBind ([60427bc](https://github.com/nutui-uniapp/nutui-uniapp/commit/60427bc61a23383a42985fa276c40ada4a5c6b6d))

## [1.7.9](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.8...v1.7.9) (2024-05-08)

### Features

* **input-number:** 支持透传属性至 input 元素 ([7547ed0](https://github.com/nutui-uniapp/nutui-uniapp/commit/7547ed0d7f458babb76c19ddd3c5bd093e021474))
* **number-keyboard:** 新增 confirm 事件 ([0a6b06c](https://github.com/nutui-uniapp/nutui-uniapp/commit/0a6b06cfd21fe3e7957e082115947e393a7072f7))

## [1.7.8](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.7...v1.7.8) (2024-04-23)

### Bug Fixes

* 修复useSelectorQuery在app-plus环境获取instance报错 ([#307](https://github.com/nutui-uniapp/nutui-uniapp/issues/307)) ([3499c41](https://github.com/nutui-uniapp/nutui-uniapp/commit/3499c41bd6a3d2420ba32d5272a41b12c8da86d7))
* 修改tabs选项卡微笑曲线属性，在navbar组件content slot中样式出错bug ([0f04867](https://github.com/nutui-uniapp/nutui-uniapp/commit/0f048670229498aa5a3dc8ec63c0fe744d8cfad2))
* **address:** 修复在选择地址后，下一级地址无法滚动到顶部 ([#301](https://github.com/nutui-uniapp/nutui-uniapp/issues/301)) ([6971ece](https://github.com/nutui-uniapp/nutui-uniapp/commit/6971ece48b5e039f82d184e672556bad5aafb6af))
* **cell:** 修复to属性无效 ([#294](https://github.com/nutui-uniapp/nutui-uniapp/issues/294)) ([f691dff](https://github.com/nutui-uniapp/nutui-uniapp/commit/f691dffeed47aed81a83d42aad625526b4efe85a))
* **sku:** 移除defineExpose导入 ([e10294b](https://github.com/nutui-uniapp/nutui-uniapp/commit/e10294bfd4f6217df21a2bbc5c620c1587a178e9))
* **tabs:** 修复 vertical 方式 tab 数量过多时滚动定位不准确的问题 ([a1334df](https://github.com/nutui-uniapp/nutui-uniapp/commit/a1334df9eebec32ebe0638242922d70ad5a9fe23))
* **uploader:** 修复uid生成可能重复 ([1f49808](https://github.com/nutui-uniapp/nutui-uniapp/commit/1f49808b03fbaa0aab5865a2cbe65cbf933ce00c)), closes [#306](https://github.com/nutui-uniapp/nutui-uniapp/issues/306)

### Features

* **sku:** 新增重置商品数量方法 ([#305](https://github.com/nutui-uniapp/nutui-uniapp/issues/305)) ([8e8260b](https://github.com/nutui-uniapp/nutui-uniapp/commit/8e8260bfddf884169a8c4f3f271a7dd58bc0c66a))
* **switch:** add disabled prop & mark disable deprecated ([#299](https://github.com/nutui-uniapp/nutui-uniapp/issues/299)) ([9e8ac05](https://github.com/nutui-uniapp/nutui-uniapp/commit/9e8ac05e4edd41116fa5f7f80d2cf98f0d3a81cd))

## [1.7.7](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.6...v1.7.7) (2024-04-12)

### Bug Fixes

* **ecard:** 修复输入框表现异常 ([#291](https://github.com/nutui-uniapp/nutui-uniapp/issues/291)) ([5763f25](https://github.com/nutui-uniapp/nutui-uniapp/commit/5763f25855bdd33e0068a9a1c7b2556f1e9dfaaa))
* **swipe:** 修复组件宽度超出范围以及点击关闭问题 ([#284](https://github.com/nutui-uniapp/nutui-uniapp/issues/284)) ([48cc120](https://github.com/nutui-uniapp/nutui-uniapp/commit/48cc12026e0ec9befb7bc7215621649dee75032c))

### Features

* **datepicker:** 事件新增date参数 ([#289](https://github.com/nutui-uniapp/nutui-uniapp/issues/289)) ([29947b5](https://github.com/nutui-uniapp/nutui-uniapp/commit/29947b5660586650e6d8d281fa353ec47a6e6680))
* **tag:** 新增disbaled、close-icon-size属性 ([#293](https://github.com/nutui-uniapp/nutui-uniapp/issues/293)) ([85b329c](https://github.com/nutui-uniapp/nutui-uniapp/commit/85b329cdb897164be082f4abe35c56289db1710c))

## [1.7.6](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.5...v1.7.6) (2024-04-10)

### Bug Fixes

* **input:** 修复H5环境下type为number无效 ([#279](https://github.com/nutui-uniapp/nutui-uniapp/issues/279)) ([ec41815](https://github.com/nutui-uniapp/nutui-uniapp/commit/ec41815ae502f56341575706364e3a0eafeb9253))
* **picker:** 修复非H5平台mask缺失 ([96666cf](https://github.com/nutui-uniapp/nutui-uniapp/commit/96666cf7c93c8e38c5b22c3118e2c1a7fe7a2247))
* **searchbar:** 修复app端输入框对齐问题 ([#282](https://github.com/nutui-uniapp/nutui-uniapp/issues/282)) ([1f77dab](https://github.com/nutui-uniapp/nutui-uniapp/commit/1f77dab96d3fa0d589e383565c9a1254a309a31a))

### Features

* **addresslist:** 新增是否使用插槽相关属性 ([#274](https://github.com/nutui-uniapp/nutui-uniapp/issues/274)) ([1727859](https://github.com/nutui-uniapp/nutui-uniapp/commit/1727859c45d65322271e3f7121b825f10845ccac))
* **calendar:** 添加calendar组件点击遮罩关闭事件和点击关闭图标事件 ([#273](https://github.com/nutui-uniapp/nutui-uniapp/issues/273)) ([e70e654](https://github.com/nutui-uniapp/nutui-uniapp/commit/e70e654b57a8884cc4589877f56670652160c33d))

## [1.7.5](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.4...v1.7.5) (2024-03-29)

### Bug Fixes

* **popover:** 修复Popover 气泡弹出框功能问题 ([#269](https://github.com/nutui-uniapp/nutui-uniapp/issues/269)) ([bbf03e5](https://github.com/nutui-uniapp/nutui-uniapp/commit/bbf03e5a973b95d66f76edeb59114872afc606a6))
* **list:** List 虚拟列表 listData 类型错误 ([8cba423](https://github.com/nutui-uniapp/nutui-uniapp/commit/8cba4236b178c2def23ccfd07ee1528f7530c007))
* **checkbox:** 修复checkbox重复添加至checkboxgroup.children的问题 ([#266](https://github.com/nutui-uniapp/nutui-uniapp/issues/266)) ([3f2c2b3](https://github.com/nutui-uniapp/nutui-uniapp/commit/3f2c2b3afa0348032eadff9ef5aa8415843ecac8))
* **dialog:** 修复dialog title响应式失效的问题 ([#267](https://github.com/nutui-uniapp/nutui-uniapp/issues/267)) ([1a0c7cf](https://github.com/nutui-uniapp/nutui-uniapp/commit/1a0c7cf72c448e6e5ff6d7890dd7739e5bbd13b0))

### Features

* **toast:** 新增useToast控制方式 ([#260](https://github.com/nutui-uniapp/nutui-uniapp/issues/260)) ([c014e7a](https://github.com/nutui-uniapp/nutui-uniapp/commit/c014e7a8ed31b9ad4d6bdbf11942528abea1bb26))

### Refactors

* **drag**: 重构 drag组件，修复drag组件多次拖动时位置瞬移到起始点的问题 ([5989869](<https://github.com/nutui-uniapp/nutui-uniapp/commit/5989869>))

## [1.7.4](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.3...v1.7.4) (2024-03-20)

### Bug Fixes

* **picker:** 修复model-value值污染问题 ([ce2e865](https://github.com/nutui-uniapp/nutui-uniapp/commit/ce2e86546b4c2a03f2f5235899071b00dff98d7f))

### Features

* 新增clone、equal工具方法 ([ef1611c](https://github.com/nutui-uniapp/nutui-uniapp/commit/ef1611c44e7382f5a58fbc154de513c15f1a1e59))

## [1.7.3](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.2...v1.7.3) (2024-03-09)

### Bug Fixes

* **elevator:** 修复app端点击索引无效，并且滚动页面索引无法跟随切换问题 ([#237](https://github.com/nutui-uniapp/nutui-uniapp/issues/237)) ([e149974](https://github.com/nutui-uniapp/nutui-uniapp/commit/e1499747ae9997bda7a5679259c211935e4d1713))
* **picker:** 修复微信小程序暗黑模式picker背景颜色显示错误的问题 ([#236](https://github.com/nutui-uniapp/nutui-uniapp/issues/236)) ([fa425f7](https://github.com/nutui-uniapp/nutui-uniapp/commit/fa425f72584ff515b4b0a2f5810ca21f4f5760f6))
* **picker:** 修复ts类型错误 ([#241](https://github.com/nutui-uniapp/nutui-uniapp/issues/241)) ([1e83035](https://github.com/nutui-uniapp/nutui-uniapp/commit/1e83035dab748c311ae2d207950bf219da2bcb11))
* **sku:** 修复默认底部按钮不显示的问题 ([#238](https://github.com/nutui-uniapp/nutui-uniapp/issues/238)) ([6e2c296](https://github.com/nutui-uniapp/nutui-uniapp/commit/6e2c296ad8c2e77a84f504aa5ffe756002f98061))
* **sku:** 修复组件内容超出,出现横向滚动条的问题 ([#240](https://github.com/nutui-uniapp/nutui-uniapp/issues/240)) ([c0bf4ab](https://github.com/nutui-uniapp/nutui-uniapp/commit/c0bf4ab341a4adbb142da6d282146825af14601d))
* **uploader:** 修复禁用时能删除文件的问题 ([#234](https://github.com/nutui-uniapp/nutui-uniapp/issues/234)) ([834f9bc](https://github.com/nutui-uniapp/nutui-uniapp/commit/834f9bc7b00eaa0e9ebde33d9c56e1c9ed990d54))

### Features

* **input,textarea:** 新增输入框单独控制样式属性 ([#233](https://github.com/nutui-uniapp/nutui-uniapp/issues/233)) ([e9749b0](https://github.com/nutui-uniapp/nutui-uniapp/commit/e9749b0faa64d026c4c53e1faf349e1c42154a28))

## [1.7.2](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.1...v1.7.2) (2024-03-04)

### Bug Fixes

* **avatar-group:** 修复z-index无效 ([#215](https://github.com/nutui-uniapp/nutui-uniapp/issues/215)) ([1b64ffc](https://github.com/nutui-uniapp/nutui-uniapp/commit/1b64ffc8be7923ed742cf7e0a7225738657dd81c))
* **avatar:** 修复size、shape无效以及无法正确从group继承 ([13ce31a](https://github.com/nutui-uniapp/nutui-uniapp/commit/13ce31a8a80bd6895919d2313869c2dcf2491be7))
* **cascader:** 修复leaf等于false并且children为空时可以选择成功的问题 ([#212](https://github.com/nutui-uniapp/nutui-uniapp/issues/212)) ([a3f27f6](https://github.com/nutui-uniapp/nutui-uniapp/commit/a3f27f6cebf36cd549f4ddab4c155efba2a8533a))
* **input,textarea:** 修复input事件返回值错误 ([745a19c](https://github.com/nutui-uniapp/nutui-uniapp/commit/745a19c51359d827cc28307f942b6425e02e275f))
* **textarea:** 修复类型导出缺失 ([1fa9f29](https://github.com/nutui-uniapp/nutui-uniapp/commit/1fa9f2942256bbb975e2dbf276c7c17d2aa096cb))
* **textarea:** 修复autosize类型错误 ([7c2d56a](https://github.com/nutui-uniapp/nutui-uniapp/commit/7c2d56a3a4c962e5b2b6024e1ab68a75032af240))
* **uploader:** 修复beforeDelete默认值无效以及不支持promise ([54a9b0a](https://github.com/nutui-uniapp/nutui-uniapp/commit/54a9b0acde8590996729fbf2d750ec6271eb10a6))

### Features

* **textarea:** 新增input事件 ([2a8a898](https://github.com/nutui-uniapp/nutui-uniapp/commit/2a8a8984318c71bcd24ab1a06ca5dd134a8afe2c))
* **uploader:**  新增accept配置 ([#217](https://github.com/nutui-uniapp/nutui-uniapp/issues/217)) ([a6ba625](https://github.com/nutui-uniapp/nutui-uniapp/commit/a6ba625f0638fdcba1cdd9a34ac0c61dbdb5e095))

### Reverts

* **textarea:** 修复autosize类型错误 ([bc02ceb](https://github.com/nutui-uniapp/nutui-uniapp/commit/bc02ceb8a7882ea363b655cec06aba3268e01b45))

## [1.7.1](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.7.0...v1.7.1) (2024-02-29)

### Bug Fixes

* **form:** 修复prop类型为数组时required校验无效的问题 ([00453d6](https://github.com/nutui-uniapp/nutui-uniapp/commit/00453d68c21973215b57e5248050da4dc19647a2))
* **menu:** 偏移位置错误, app 端v-show 无效 ([#197](https://github.com/nutui-uniapp/nutui-uniapp/issues/197)) ([2fba3fe](https://github.com/nutui-uniapp/nutui-uniapp/commit/2fba3fe91b751d63b0aa007442d1ffb94516fd93))
* **popup,menu:** 修复 popup组件update:visible事件重复调用与menu 组件close 事件在小程序中无法触发 ([#205](https://github.com/nutui-uniapp/nutui-uniapp/issues/205)) ([0ce7d69](https://github.com/nutui-uniapp/nutui-uniapp/commit/0ce7d690b6a401428ab083eba81887e7e4767178)), closes [#196](https://github.com/nutui-uniapp/nutui-uniapp/issues/196)
* **textarea:** 修复ConfirmType导出类型名称重复以及默认值错误 ([748a849](https://github.com/nutui-uniapp/nutui-uniapp/commit/748a8498df99a543d28b37307f877ececa0fe1b4))
* **transition:** app端destroyOnClose属性无效 ([1238ef6](https://github.com/nutui-uniapp/nutui-uniapp/commit/1238ef6cd4dd7fe59250d47752e00349f56292a0))

### Features

* 新增辅助样式 ([ae3775b](https://github.com/nutui-uniapp/nutui-uniapp/commit/ae3775b501b78ed8af955aa6a3b57c444d49356c))

# [1.7.0](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.9...v1.7.0) (2024-02-22)

### Bug Fixes

* **input:** 修复readonly无效 ([f1547bd](https://github.com/nutui-uniapp/nutui-uniapp/commit/f1547bdb455771926c5384979ab5132d4d6df5ab))
* **tabs:** align属性类型错误 ([f9b0eb4](https://github.com/nutui-uniapp/nutui-uniapp/commit/f9b0eb453dc7ce7114c784bb2cc69b5a29eb5d12))

## [1.6.9](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.8...v1.6.9) (2024-02-22)

### Bug Fixes

* **navbar:** 修复在APP上顶部安全距离无效的问题 ([#186](https://github.com/nutui-uniapp/nutui-uniapp/issues/186)) ([e475e7e](https://github.com/nutui-uniapp/nutui-uniapp/commit/e475e7e449e2bddb50484efe0ee8ee03f1febc72))
* **navbar:** 修复占位元素重复计算状态栏高度的问题 ([#187](https://github.com/nutui-uniapp/nutui-uniapp/issues/187)) ([e35083c](https://github.com/nutui-uniapp/nutui-uniapp/commit/e35083cda311201492719b0deb64e3097dc2dec0))

### Features

* **textarea:** 新增placeholder-style、placeholder-class属性 ([ada249f](https://github.com/nutui-uniapp/nutui-uniapp/commit/ada249ff100f60c2217adb31ab59692a6299f924))

## [1.6.8](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.7...v1.6.8) (2024-02-20)

### Bug Fixes

* **ellipsis:** symbol属性默认值丢失 ([b685f40](https://github.com/nutui-uniapp/nutui-uniapp/commit/b685f40a7192d80e279f91c2784dc76cd0c5327f))
* **picker:** className option ([60caafb](https://github.com/nutui-uniapp/nutui-uniapp/commit/60caafb83ee9194cdae85333ae80d4b8864c1c87))
* randomid生成错误 ([2556b99](https://github.com/nutui-uniapp/nutui-uniapp/commit/2556b998452bc75597e5fe5d7b1d3ed870ad1cf3))

### Features

* **form:** 新增 disabled 属性,支持禁用 form 下全部数据录入组件 ([#184](https://github.com/nutui-uniapp/nutui-uniapp/issues/184)) ([ecd03a3](https://github.com/nutui-uniapp/nutui-uniapp/commit/ecd03a3f3d75aa8281d926d270fa5612d02e360e))
* **marquee:** 新增disabled属性 ([#183](https://github.com/nutui-uniapp/nutui-uniapp/issues/183)) ([d64eca2](https://github.com/nutui-uniapp/nutui-uniapp/commit/d64eca23c4124138ccc8a7dc36fe5439a5e8458c))

## [1.6.7](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.6...v1.6.7) (2024-02-06)

### Bug Fixes

* **input:** 移除InputType重复类型 ([15ac2cd](https://github.com/nutui-uniapp/nutui-uniapp/commit/15ac2cd1dd9955feec57df21e8c3b33126e1ab94))
* **inputnumber:** 组件输入内容不会触发change事件 ([9d97d4e](https://github.com/nutui-uniapp/nutui-uniapp/commit/9d97d4e6b90d1cd35815328f2b6b66be94b6a806))
* **navbar:** 修复zIndex无效问题 ([ecfbd16](https://github.com/nutui-uniapp/nutui-uniapp/commit/ecfbd168a7d392604739e6db6bf811e96c7b3dff))
* **noticebar:** remove blank element of left-icon ([160bc37](https://github.com/nutui-uniapp/nutui-uniapp/commit/160bc3763eb0a1b193c914b967814a0b2a728bed))
* **table:** data属性ts类型问题 ([91c434c](https://github.com/nutui-uniapp/nutui-uniapp/commit/91c434c669a9a2fed5762150c3aa641c4a61db0a))

### Features

* **button:** 新增hover-class相关属性 ([987185c](https://github.com/nutui-uniapp/nutui-uniapp/commit/987185cf8d93f474de5a0df4a34b908575ef2dc7))
* **input:** 新增input事件 ([494f10a](https://github.com/nutui-uniapp/nutui-uniapp/commit/494f10ada6143930e421f1a773599cb0fe1f8761))

## [1.6.6](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.5...v1.6.6) (2024-01-26)

### Bug Fixes

* **button:** disabled下 open-type 仍有效 ([af5f5ac](https://github.com/nutui-uniapp/nutui-uniapp/commit/af5f5ac34d9187ac2f0b955935e97d3f815df546)), closes [#173](https://github.com/nutui-uniapp/nutui-uniapp/issues/173)

## [1.6.5](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.4...v1.6.5) (2024-01-23)

### Bug Fixes

* **form:** 修复搭配 input 使用时的样式问题 ([2ce7c20](https://github.com/nutui-uniapp/nutui-uniapp/commit/2ce7c20523694cb8a04dd22bd7a4c533e9ebd297)), closes [#165](https://github.com/nutui-uniapp/nutui-uniapp/issues/165) [#167](https://github.com/nutui-uniapp/nutui-uniapp/issues/167)

### Features

* 添加web-types以提升WebStorm开发体验 ([18795e1](https://github.com/nutui-uniapp/nutui-uniapp/commit/18795e1ad86267cca09ff4abc28f0f9b61aaea7e))

## [1.6.4](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.3...v1.6.4) (2024-01-15)

### Bug Fixes

* **calendar:** 优化初次打开默认值定位问题 ([35931ae](https://github.com/nutui-uniapp/nutui-uniapp/commit/35931ae28c60cd9c0502e3a2e65d154b5fa6c793))
* **categorypane:** 商品分类面板组件默认插槽不生效 ([1d263e1](https://github.com/nutui-uniapp/nutui-uniapp/commit/1d263e1492e5f831a218d9f9cf57f90466b372a4))
* **date-picker:** 修复 hour-minute 类型下选项刷新问题 ([291e721](https://github.com/nutui-uniapp/nutui-uniapp/commit/291e72151a66fb68b0e3968252620ce11d8f0209))
* **date-picker:** 修复数据联动更新问题 ([e4d2d03](https://github.com/nutui-uniapp/nutui-uniapp/commit/e4d2d03ffb56da500d0dd2e1d573775a829512d8))
* **dialog:** 修复 cancel 按钮的样式问题 ([bb62248](https://github.com/nutui-uniapp/nutui-uniapp/commit/bb62248bedaacc3cbcb3c92f414bcb6dacfaf59e))
* **menuitem:** close open 事件无效 ([15b73c6](https://github.com/nutui-uniapp/nutui-uniapp/commit/15b73c6a1a2c28a3f688ea9ada38687ad905be8e)), closes [#163](https://github.com/nutui-uniapp/nutui-uniapp/issues/163)
* **picker:** 修复 Safari 下遮罩层级样式问题 ([1d0149e](https://github.com/nutui-uniapp/nutui-uniapp/commit/1d0149e7a5b56aac62ed12a00f91c3f11e57085c))
* **picker:** 优化 select、cursor 样式 ([a1ad4b0](https://github.com/nutui-uniapp/nutui-uniapp/commit/a1ad4b0ffd01ac92d99fa397b7ac271099af15b9))

### Features

* **card:** 商品卡片组件增加shopName插槽，用于店铺名称自定义 ([996726d](https://github.com/nutui-uniapp/nutui-uniapp/commit/996726ddc73d97994a394999a7484b858e9e6f00))

## [1.6.3](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.2...v1.6.3) (2024-01-08)

### Performance Improvements

* **input:** 使用computed代替函数调用 ([374e24c](https://github.com/nutui-uniapp/nutui-uniapp/commit/374e24c34c667a72ca754b84a9c73b7850a57771))

## [1.6.2](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.1...v1.6.2) (2024-01-08)

### Bug Fixes

* **calendar:** 日历组件在微信小程序弹窗展示时，无法滚动到默认日期 ([8f3b3aa](https://github.com/nutui-uniapp/nutui-uniapp/commit/8f3b3aa4d157db1fc842825598441ec78d2723ae))
* **calendar:** 日历组件在微信小程序中无法显示今天标记 ([15aadca](https://github.com/nutui-uniapp/nutui-uniapp/commit/15aadcae48b112eee323b2593e616ccb935e8c77))
* **calendar:** 优化初始滚动判断条件 ([5961f8e](https://github.com/nutui-uniapp/nutui-uniapp/commit/5961f8edee6ade9835329306a7543f3fcd29cece))
* **input:** modelValue为空时错误调用方法 ([782676b](https://github.com/nutui-uniapp/nutui-uniapp/commit/782676bfa69c9c82b1a3483f48a5264ee5e09d8a)), closes [#155](https://github.com/nutui-uniapp/nutui-uniapp/issues/155)

## [1.6.1](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.6.0...v1.6.1) (2024-01-04)

### Features

* **ecard:** 支持配置是否显示自定与步进 ([584f091](https://github.com/nutui-uniapp/nutui-uniapp/commit/584f091d35e78a2ec02e72bd8578ca091628d666))

# [1.6.0](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.5.10...v1.6.0) (2024-01-04)

### Bug Fixes

* **input:** form下 input 样式错误 ([4c0f900](https://github.com/nutui-uniapp/nutui-uniapp/commit/4c0f9009a7d2543933644b209d223fab4a10217f)), closes [#148](https://github.com/nutui-uniapp/nutui-uniapp/issues/148)
* **tabs:** 修复 placeholder 展示错误 ([754633e](https://github.com/nutui-uniapp/nutui-uniapp/commit/754633e18bef14c37c13068cda9bcb205f1164e7))
* **tabs:** 夜间模式样式错误 ([32c679a](https://github.com/nutui-uniapp/nutui-uniapp/commit/32c679a2e716a0f82ddc09d34a4b785ae21192ee))

### Features

* **swiper:** 支持修改未选中时的分页指示器的颜色 ([e9c4058](https://github.com/nutui-uniapp/nutui-uniapp/commit/e9c4058baf0f5bccbfd74c3f6e905ba359109eaa))
* **tabs:** 开启 title-scroll 时不再需要设置 name ([4085996](https://github.com/nutui-uniapp/nutui-uniapp/commit/4085996b2daf0981e72c97dda5eab1678d1dbda6))
* **tabs:** 支持配置标题对齐方式 ([d46c8ff](https://github.com/nutui-uniapp/nutui-uniapp/commit/d46c8fffd9840405a8327abc85edfc3fe5f66b5c))
* **watermark:** 支持多行文字水印 ([8b42b97](https://github.com/nutui-uniapp/nutui-uniapp/commit/8b42b97237f9cbc92e99fb12c807c4cdfee1e687))

## [1.5.10](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.5.9...v1.5.10) (2023-12-31)

### Bug Fixes

* **popup:** app端show属性无效以及destroy-on-close逻辑错误 ([522f620](https://github.com/nutui-uniapp/nutui-uniapp/commit/522f6200e48cdf67ccd1767eb2aa89c697f03a49))
* **popup:** destroy-on-close逻辑错误 ([6d9d12c](https://github.com/nutui-uniapp/nutui-uniapp/commit/6d9d12cbf5dd082806b14bb783ce690c1cafc76c))
* **sku:** 修复SkuStepper依赖循环,样式错误 ([2575b24](https://github.com/nutui-uniapp/nutui-uniapp/commit/2575b24fb2f92d0d0ee41edbb0174f9528b2ce61))
* textarea启用autosize时readonly样式不统一 ([d6c161b](https://github.com/nutui-uniapp/nutui-uniapp/commit/d6c161bce9e8af50dfa162faa9d4b3be8d31a82f))

## [1.5.9](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.5.8...v1.5.9) (2023-12-18)

### Bug Fixes

* **navbar:** 修复标题居中等样式问题 ([b5ddff1](https://github.com/nutui-uniapp/nutui-uniapp/commit/b5ddff18ebfbc00137dc88d8993d8d6928c2d3c3))
* **sku:** 修复小程序下选项内容的滚动问题 ([715a4db](https://github.com/nutui-uniapp/nutui-uniapp/commit/715a4db500fe303ccd5eafc8140b0adb328a3ebb))
* **tabs:** 修复嵌套使用时的样式错乱问题 ([a8c9822](https://github.com/nutui-uniapp/nutui-uniapp/commit/a8c98229836318b50aa4c7cae83aedf31949eae3))

### Features

* **radio:** 组件设置 button 形状时支持改变大小 ([ff808c0](https://github.com/nutui-uniapp/nutui-uniapp/commit/ff808c06ac6713b69e0383fb4b5b9f6a0544fa3b))

## [1.5.8](https://github.com/nutui-uniapp/nutui-uniapp/compare/v1.5.7...v1.5.8) (2023-12-14)

### Bug Fixes

* **menu:** 去除无效输出 ([3f36ff8](https://github.com/nutui-uniapp/nutui-uniapp/commit/3f36ff8535f662bf90fa09e0d9c97c1aa1775a12))
* **menu:** 修复menu闪屏动画错误以及位置偏移 ([48c85f5](https://github.com/nutui-uniapp/nutui-uniapp/commit/48c85f5246f1de10bcf3535e31ef202ee8e28d9f)), closes [#138](https://github.com/nutui-uniapp/nutui-uniapp/issues/138)
* **popup:** 修复destroy-on-close无效 ([0e64ee2](https://github.com/nutui-uniapp/nutui-uniapp/commit/0e64ee2c1f89eba08d9438c5e1378d0ba49f495c)), closes [#136](https://github.com/nutui-uniapp/nutui-uniapp/issues/136)

### Features

* **safearea:** 新增SafeArea组件 ([e346920](https://github.com/nutui-uniapp/nutui-uniapp/commit/e346920108081d0857143d28dbfbd495351c996e))

### Reverts

* Revert "chore: release v1.5.8" ([8c0f8e0](https://github.com/nutui-uniapp/nutui-uniapp/commit/8c0f8e0dfd034a84996b10bafa8c5e1afbbb4535))
* Revert "docs: update changelog" ([108a458](https://github.com/nutui-uniapp/nutui-uniapp/commit/108a458dea38728bba55d9b36946cc3720260e14))

## [1.5.7](https://github.com/yang1206/uniapp-nutui/compare/v1.5.6...v1.5.7) (2023-12-09)

### Bug Fixes

* **range:** 优化滑动事件处理逻辑 ([be20418](https://github.com/yang1206/uniapp-nutui/commit/be2041839d2c449e9cf22b0029d437eebb4c68fa))

### Features

* **calendar:** 新增 btn-slot属性控制是否使用btn 插槽 ([3b66919](https://github.com/yang1206/uniapp-nutui/commit/3b66919bfd86c0857ce1a8ea265ae5fa9e3f0b9f)), closes [#131](https://github.com/yang1206/uniapp-nutui/issues/131)
* **form:** 支持配置表单布局 ([882dce4](https://github.com/yang1206/uniapp-nutui/commit/882dce417ad6799cf18f31e43a6734f5cc7cfea7))

## [1.5.6](https://github.com/yang1206/uniapp-nutui/compare/v1.5.5...v1.5.6) (2023-11-29)

### Bug Fixes

* **avatar:** 修复maxCount属性无效 ([341f488](https://github.com/yang1206/uniapp-nutui/commit/341f48806545f1f7f84cd208d6790f73858d749e))
* **numberkeyboard:** 类名错误 ([6a15803](https://github.com/yang1206/uniapp-nutui/commit/6a15803a4e8875fadf9172b2d388a732f2fc3e71))
* **utils:** isPromise 判断错误 ([42820e2](https://github.com/yang1206/uniapp-nutui/commit/42820e2ad20c571ea00afc588254ae4dbe5df1b7))

## [1.5.5](https://github.com/yang1206/uniapp-nutui/compare/v1.5.4...v1.5.5) (2023-11-25)

### Bug Fixes

* **formitem:** 提高传入 required 的优先级 ([300ef79](https://github.com/yang1206/uniapp-nutui/commit/300ef797e05c2cacbe2e144bafd1e7402116fc83))
* **inputnumber:** 修复步进按钮禁用功能无效 ([75fc3cc](https://github.com/yang1206/uniapp-nutui/commit/75fc3cc78a7dd6154b5418db0306f4ce1dcfc25b))
* **swiper:** 修复 swiper-item 宽高错误问题 ([0840982](https://github.com/yang1206/uniapp-nutui/commit/084098288d3511f43db2f4db0b4c723ddc53c3a5))

## [1.5.4](https://github.com/yang1206/uniapp-nutui/compare/v1.5.3...v1.5.4) (2023-11-23)

### Bug Fixes

* **address:** 选择最后一级时 onChange 缺少 value 字段 ([04d9262](https://github.com/yang1206/uniapp-nutui/commit/04d92627b6b08e9f439208a24c627c8975f91906))
* **badge:** 修复微信小程序 props编译丢失 ([e95ff0d](https://github.com/yang1206/uniapp-nutui/commit/e95ff0df44abe6cc1a99db1b21b6696135d0c9d6))
* **elevator:** 修复滚动后无法点击问题 ([6956662](https://github.com/yang1206/uniapp-nutui/commit/695666260596b9b5e5925451de74bd23556b0af0))
* **picker:** 调整 columns 类型定义 ([42f1b9c](https://github.com/yang1206/uniapp-nutui/commit/42f1b9c3b7fc4f6d434c63791b20b84b09d0bcb0))

### Features

* **cascader:** 新增title插槽 ([80b2f29](https://github.com/yang1206/uniapp-nutui/commit/80b2f291d66920d990dc15a21752400b35fdd4e4)), closes [#119](https://github.com/yang1206/uniapp-nutui/issues/119)
* **form:** formItem的required的星号支持从rules中自动判断是否显示 ([1ddda92](https://github.com/yang1206/uniapp-nutui/commit/1ddda92b4a6c4e312a502be9d10d6db64da80e31))
* **input:** modelValue的类型支持number ([2e308e7](https://github.com/yang1206/uniapp-nutui/commit/2e308e741f7c888b5bb96d19b8d2fd02f627db5a))

## [1.5.3](https://github.com/yang1206/uniapp-nutui/compare/v1.5.2...v1.5.3) (2023-11-22)

### Bug Fixes

* 修复支付宝小程序编译错误 ([203f3bd](https://github.com/yang1206/uniapp-nutui/commit/203f3bdd0c164faad471a74ce9eb4bffc7fb29ea)), closes [#117](https://github.com/yang1206/uniapp-nutui/issues/117)

## [1.5.2](https://github.com/yang1206/uniapp-nutui/compare/v1.5.1...v1.5.2) (2023-11-20)

### Bug Fixes

* **menu:** 修复自定义选中颜色失效 ([b441e89](https://github.com/yang1206/uniapp-nutui/commit/b441e89113c25f62eb3a42f75c822eaee6d0a149))
* **notify:** 修复重复点击偶尔无法触发 ([d044ac9](https://github.com/yang1206/uniapp-nutui/commit/d044ac9592e27dc25ca7453e9579593a188e8337))
* **rate:** 修复无法自定义图标大小 ([1d38d71](https://github.com/yang1206/uniapp-nutui/commit/1d38d712fa92bd9181f6d4302df547bd090af896)), closes [#111](https://github.com/yang1206/uniapp-nutui/issues/111)
* **tabs:** 修复h5端滑动切换卡顿 ([a17e35e](https://github.com/yang1206/uniapp-nutui/commit/a17e35edf132488b0b1c8098f87e23d89e30120a))
* **toast:** 修复重复点击造成卡死 ([4847ae9](https://github.com/yang1206/uniapp-nutui/commit/4847ae964ecd50fd466b336ec92a0121fd589bc9))

### Features

* 全部组件均已支持自定义类名与style ([5a29a83](https://github.com/yang1206/uniapp-nutui/commit/5a29a837a6ba3b7b1ca04edcbf76027877839a8c))
* **noticebar:** 新增`field-name`属性,支持传入数组对象 ([3f95345](https://github.com/yang1206/uniapp-nutui/commit/3f95345f2d97d9ce9dbb2e2004e269b1cf986d05)), closes [#109](https://github.com/yang1206/uniapp-nutui/issues/109)

## [1.5.1](https://github.com/yang1206/uniapp-nutui/compare/v1.5.0...v1.5.1) (2023-11-17)

### Bug Fixes

* **calendar:** 过期时间未被禁用 ([5b767b8](https://github.com/yang1206/uniapp-nutui/commit/5b767b88be6c32b8c8edf1212eedec2c60929a57))
* **radio:** 修复`text-position`属性失效 ([1eadf1a](https://github.com/yang1206/uniapp-nutui/commit/1eadf1ac25087fc259d40c30723918e61b818c86))

### Features

* **(signature):** signature组件小程序端支持导出图片 ([2992d39](https://github.com/yang1206/uniapp-nutui/commit/2992d39522e18e5f6dd51f82f237171fdb789d2b))

# [1.5.0](https://github.com/yang1206/uniapp-nutui/compare/v1.4.1...v1.5.0) (2023-11-15)

### Bug Fixes

* **cascader:** 级联二级切换无法被监听到 ([c78f382](https://github.com/yang1206/uniapp-nutui/commit/c78f382c02f76241919037b35c1834a73aeb6337)), closes [#105](https://github.com/yang1206/uniapp-nutui/issues/105)
* textarea的autosize表现异常 ([d14813d](https://github.com/yang1206/uniapp-nutui/commit/d14813d6b32e2131a48abc7a8d6ec668c89023ce))

* fix(overlay)!: 小程序与 APP平台不再支持`lock-scroll`属性 ([cd3a740](https://github.com/yang1206/uniapp-nutui/commit/cd3a74066829123299915787feaf2d675a8a487c)), closes [#103](https://github.com/yang1206/uniapp-nutui/issues/103)

### Features

* 组件props增加注释说明 ([a585716](https://github.com/yang1206/uniapp-nutui/commit/a585716ca5dc71b9577a491fc15d696a69aed0fb)), closes [#100](https://github.com/yang1206/uniapp-nutui/issues/100)

### BREAKING CHANGES

* 小程序移除`lock-scroll`属性支持

所有依赖overlay的组件的`lock-scroll`属性同理也将不再支持小程序与 APP 平台,禁用滚动穿透方法可参考文档

## [1.4.1](https://github.com/yang1206/uniapp-nutui/compare/v1.4.0...v1.4.1) (2023-11-08)

### Bug Fixes

* **badge:** badge的top、right不支持rpx单位 ([964e4ea](https://github.com/yang1206/uniapp-nutui/commit/964e4ea6e472889c7f43bc70491d3e3ac613cf31))

# [1.4.0](https://github.com/yang1206/uniapp-nutui/compare/v1.3.5...v1.4.0) (2023-11-08)

### Bug Fixes

* **address:** backIcon会一直存在 ([3819937](https://github.com/yang1206/uniapp-nutui/commit/3819937ec0b59d6d869a986a24e1449fd7dd93f1))
* **card:** price颜色未覆盖 ([2665bd1](https://github.com/yang1206/uniapp-nutui/commit/2665bd137c5d27f57b614ebe70e25299e89ff481))
* **checkbox:** 修复样式对齐问题 ([155e25b](https://github.com/yang1206/uniapp-nutui/commit/155e25ba84676d1c5b816541da622f4c893db857))
* **comment:** label 样式无法正确省略 ([5e56649](https://github.com/yang1206/uniapp-nutui/commit/5e56649f4f87d9e3f914c3923a9d68a4d724ae26))
* **progress:** icon 颜色错误 ([18662d5](https://github.com/yang1206/uniapp-nutui/commit/18662d57046acfb6e5c57e7bef214dde1ce52c88))
* **uploader:** h5进度遮罩样式错误 ([e4ccf4a](https://github.com/yang1206/uniapp-nutui/commit/e4ccf4abdfeb74141a703cda8685e1576590ae8d))

* fix!: 短横线命名slot无法被正确替换 ([52587ed](https://github.com/yang1206/uniapp-nutui/commit/52587ed78feae3e35cd5f38e92cd6878f4c6c715)), closes [#96](https://github.com/yang1206/uniapp-nutui/issues/96)

### Features

* **calendar:** 增加自定义禁用函数disabled-date ([2b0363f](https://github.com/yang1206/uniapp-nutui/commit/2b0363fc58ca0087768a141b3f9dcfd4e4f15d44))
* **calendar:** 增加footerSlot属性判断是否使用 footer 插槽 ([6e53d43](https://github.com/yang1206/uniapp-nutui/commit/6e53d435d179d7865087d03e1ecfd323d58f0162))
* **image-preview:** 新增 long-press 事件 ([42893a5](https://github.com/yang1206/uniapp-nutui/commit/42893a50e1c5d59ec8611d0092f97c92f3797a6e))
* popup 关联组件增加 z-index 属性 ([fe52d5f](https://github.com/yang1206/uniapp-nutui/commit/fe52d5fa7b05fdfec711b9eff7750cd51c291cf3))

### BREAKING CHANGES

* 组件的slot名称由短横线替换为驼峰格式

受到影响的组件有: address , addresslist , calendar , card , comment , inputnumber , navbar , noticebar ,
pagination , progress , sku , trendarrow , uploader

## [1.3.5](https://github.com/yang1206/uniapp-nutui/compare/v1.3.4...v1.3.5) (2023-11-07)

## [1.3.4](https://github.com/yang1206/uniapp-nutui/compare/v1.3.3...v1.3.4) (2023-11-06)

### Bug Fixes

* **watermark:** props丢失响应性 ([21984f5](https://github.com/yang1206/uniapp-nutui/commit/21984f551c77027fa4913200a6d72976cb5e9035)), closes [#95](https://github.com/yang1206/uniapp-nutui/issues/95)

## [1.3.3](https://github.com/yang1206/uniapp-nutui/compare/v1.3.2...v1.3.3) (2023-11-05)

## [1.3.2](https://github.com/yang1206/uniapp-nutui/compare/v1.3.1...v1.3.2) (2023-11-03)

### Features

* **price:** 支持customClass与 customStyle ([43516f4](https://github.com/yang1206/uniapp-nutui/commit/43516f43f33540684ed98a4878b4fbd4925116dd))

## [1.3.1](https://github.com/yang1206/uniapp-nutui/compare/v1.3.0...v1.3.1) (2023-11-01)

### Bug Fixes

* **sku:** 小程序真机调试错误 ([1bb8380](https://github.com/yang1206/uniapp-nutui/commit/1bb8380f4c1cabb443938f31dd6e0d1aa84ea104))

# [1.3.0](https://github.com/yang1206/uniapp-nutui/compare/v1.2.4...v1.3.0) (2023-10-31)

### Bug Fixes

* **circle-progress:** 修复数值变化在 iOS 下的 border 闪烁问题 ([f3f3934](https://github.com/yang1206/uniapp-nutui/commit/f3f3934292a11362c7c4e47cf450a7581e92efab))
* **input:** 优化input属性问题 ([3fe20c7](https://github.com/yang1206/uniapp-nutui/commit/3fe20c76404a1dafc9fe2e66ffb0ea3419c1f07d))
* **inputnumber:** 修复点击icon后超过min-max范围问题 ([17d8f7e](https://github.com/yang1206/uniapp-nutui/commit/17d8f7e6cb29500934c1d800e59b970390cb7b72))
* **picker:** 去除columns有值才触发watch监听 ([6e39bc3](https://github.com/yang1206/uniapp-nutui/commit/6e39bc319d6892460a982e01e020435649554e47))
* **swiper:** 修复动态修改 height 后组件视图未更新问题 ([b9bac98](https://github.com/yang1206/uniapp-nutui/commit/b9bac98a30215a847b536bfa252f5901d21b523d))
* **swiper:** 修复页面中未设置 z-index 的 fixed 元素无法覆盖 swiper 问题 ([08e559b](https://github.com/yang1206/uniapp-nutui/commit/08e559bf2bc4101732067f5bce8231017aa9f788))

### Features

* **collapse:** 增加自定义插槽icon ([539ba35](https://github.com/yang1206/uniapp-nutui/commit/539ba35fd48506a21faa84af9b30b115f2870485))
* **comment:** 追评中若是有图片的话，增加响应事件 ([767cea6](https://github.com/yang1206/uniapp-nutui/commit/767cea6f7208a314e6fad0e98be73e4441aa223e))
* **dialog:** add ok-auto-close ([2957f5a](https://github.com/yang1206/uniapp-nutui/commit/2957f5a98c9f11513c92a511b26bf7afa8807d43))
* **navbar:** 适配小程序状态栏高度,优化代码 ([4ee0118](https://github.com/yang1206/uniapp-nutui/commit/4ee01186d6ac60ce211464dcb2e833b9eff7933f))

## [1.2.4](https://github.com/yang1206/uniapp-nutui/compare/v1.2.3...v1.2.4) (2023-10-27)

### Bug Fixes

* type error ([0b8ad0f](https://github.com/yang1206/uniapp-nutui/commit/0b8ad0f96d2d7b403023622ea0794e4b141466a7))
* type error ([8498e02](https://github.com/yang1206/uniapp-nutui/commit/8498e02011786a9638ee2ebbb9a237de7eb5e449))

### Features

* **input:** 新增 placeholder-style 和 placeholder-class 属性 ([1409880](https://github.com/yang1206/uniapp-nutui/commit/14098807bdb90026d179eb24c739b4f854eeaf72))
* 补充input、textarea部分属性 &nbsp;-&nbsp; by @xiaohe0601 [<samp>(b5bc4cf)</samp>](https://github.com/nutui-uniapp/nutui-uniapp/commit/b5bc4cf)

## [1.2.3](https://github.com/yang1206/uniapp-nutui/compare/v1.2.2...v1.2.3) (2023-10-23)

### Bug Fixes

* (searchbar) autofocus无效 ([f467a11](https://github.com/yang1206/uniapp-nutui/commit/f467a111337bafcc4963d5fa7a4238de797f46e0))

## [1.2.2](https://github.com/yang1206/uniapp-nutui/compare/v1.2.1...v1.2.2) (2023-10-23)

### Bug Fixes

* (input) 修复 input 事件缺失 ([a34e543](https://github.com/yang1206/uniapp-nutui/commit/a34e543a7ae37ff1d0fad1cee06e79be8f868ecf)), closes [#79](https://github.com/yang1206/uniapp-nutui/issues/79)
* 修复lockScroll无效 ([520d693](https://github.com/yang1206/uniapp-nutui/commit/520d6939639d76871255b1953ecbbf8045d2318d))

### Features

* (imagepreview) 支持双指缩放图片 ([c7a9a90](https://github.com/yang1206/uniapp-nutui/commit/c7a9a9073fdc017ce93ddc47825c2290b53e34e7))

## [1.2.1](https://github.com/yang1206/uniapp-nutui/compare/v1.2.0...v1.2.1) (2023-10-18)

### Bug Fixes

* (number-keyboard) type="rightColumn"时，某些版本安卓机无法正常显示 ([a5307ba](https://github.com/yang1206/uniapp-nutui/commit/a5307bae5cc65cb0695823646a0b767edde4f399)), closes [#78](https://github.com/yang1206/uniapp-nutui/issues/78)

# [1.2.0](https://github.com/yang1206/uniapp-nutui/compare/v1.1.10...v1.2.0) (2023-10-18)

### Bug Fixes

* (input) clear 事件回调参数错误 ([2d506ba](https://github.com/yang1206/uniapp-nutui/commit/2d506ba86430ed0b46ed223251e959e37ef598e3))
* (radio) 修复按钮类型激活背景边框样式 ([8736e91](https://github.com/yang1206/uniapp-nutui/commit/8736e9191643c741b20a24ba2fa7ad21640ecc6e))
* (radio) 修复radio-group的textPosition属性没有响应式 ([85b2fa4](https://github.com/yang1206/uniapp-nutui/commit/85b2fa4ef24beccc3ecdfc55667214351ddb822a))
* (tabs) 修复item设置disabled时仍可以滑动过去 ([3b7c77a](https://github.com/yang1206/uniapp-nutui/commit/3b7c77ab19fc56231444f5ee87305eb55356ba46))
* (textarea) 修复readonly 属性失效与无法渲染换行 ([b8d37d4](https://github.com/yang1206/uniapp-nutui/commit/b8d37d40029fe484cd67e482efea00b704d9549f))

### Features

* (searchbar) 增加cursor-spacing属性 ([42393ac](https://github.com/yang1206/uniapp-nutui/commit/42393acf21303d4b8553df8adf5dd9dbd2d0ac3d))
* (sticky) 重构sticky组件 ([bb9457b](https://github.com/yang1206/uniapp-nutui/commit/bb9457b2ee7d2b90cf1f8fcdcf9b870c84b280a0))
* 基础组件最外层元素 flex -> inline-flex ([e065f9f](https://github.com/yang1206/uniapp-nutui/commit/e065f9f034d0da2deed659c1a55cef93efde17b0))

## [1.1.10](https://github.com/yang1206/uniapp-nutui/compare/v1.1.9...v1.1.10) (2023-10-12)

## [1.1.9](https://github.com/yang1206/uniapp-nutui/compare/v1.1.8...v1.1.9) (2023-10-10)

### Bug Fixes

* (address-list) 小程序点击事件无法阻止冒泡 ([38616a9](https://github.com/yang1206/uniapp-nutui/commit/38616a967ea792c99cd5ef12a866132467eff88b))

## [1.1.8](https://github.com/yang1206/uniapp-nutui/compare/v1.1.7...v1.1.8) (2023-09-22)

### Bug Fixes

* type error ([85f9daf](https://github.com/yang1206/uniapp-nutui/commit/85f9daf3526233eeba6e3170554e4116886a95d5)), closes [#62](https://github.com/yang1206/uniapp-nutui/issues/62) [#62](https://github.com/yang1206/uniapp-nutui/issues/62)

## [1.1.7](https://github.com/yang1206/uniapp-nutui/compare/v1.1.6...v1.1.7) (2023-09-20)

### Features

* (cascader) 增加标题配置项 ([d1fde7b](https://github.com/yang1206/uniapp-nutui/commit/d1fde7b09c209778f114bccc7a130c4762eb6c04))

## [1.1.6](https://github.com/yang1206/uniapp-nutui/compare/v1.1.5...v1.1.6) (2023-09-20)

### Bug Fixes

* (searchbar) 修复抖音小程序searchbar输入抖动的问题 ([d634587](https://github.com/yang1206/uniapp-nutui/commit/d6345871aeb1a19244b87ca278d9dec4bd936e37))

### Features

* (calendar) 日历底部增加插槽 ([ff956dc](https://github.com/yang1206/uniapp-nutui/commit/ff956dc4bfe67cb57b6bd556efe814dc5f8080f2))
* (cell)  add desc slot ([eb0facf](https://github.com/yang1206/uniapp-nutui/commit/eb0facfe84e1ee7848053c198683d9f63ea73377))
* (searchbar) 增加safe-area-inset-bottom 属性 ([8fc2907](https://github.com/yang1206/uniapp-nutui/commit/8fc2907ec987bdc2952d7f94c72996a5ba3eb5f9))

## [1.1.5](https://github.com/yang1206/uniapp-nutui/compare/v1.1.4...v1.1.5) (2023-09-18)

### Features

* (button) 支持 open-type 等开放能力属性 ([eb72466](https://github.com/yang1206/uniapp-nutui/commit/eb724660ca3e163387863fc0260155004c832feb)), closes [#58](https://github.com/yang1206/uniapp-nutui/issues/58) [#58](https://github.com/yang1206/uniapp-nutui/issues/58)

## [1.1.4](https://github.com/yang1206/uniapp-nutui/compare/v1.1.3...v1.1.4) (2023-09-14)

### Bug Fixes

* (cascader) 动态加载标题无法正确显示 ([a3d7594](https://github.com/yang1206/uniapp-nutui/commit/a3d7594510bdf5088646b0dd3cfb8ed62eb70b2c))

## [1.1.3](https://github.com/yang1206/uniapp-nutui/compare/v1.1.2...v1.1.3) (2023-09-08)

## [1.1.2](https://github.com/yang1206/uniapp-nutui/compare/v1.1.1...v1.1.2) (2023-09-08)

### Bug Fixes

* 修复支付宝小程序编译失败 ([d814b4f](https://github.com/yang1206/uniapp-nutui/commit/d814b4ff073bc1f11bd971df8d035f0924ff16fe))

## [1.1.1](https://github.com/yang1206/uniapp-nutui/compare/v1.1.0...v1.1.1) (2023-09-07)

### Bug Fixes

* (input) 自动聚焦无效 ([8744788](https://github.com/yang1206/uniapp-nutui/commit/874478877e38272c51b437cf17d20c2f272d8876)), closes [#39](https://github.com/yang1206/uniapp-nutui/issues/39)

# [1.1.0](https://github.com/yang1206/uniapp-nutui/compare/v1.0.1...v1.1.0) (2023-09-07)

### Features

* :sparkles: 新增Input组件customStyle自定义属性 ([c42a5fe](https://github.com/yang1206/uniapp-nutui/commit/c42a5fe0fc6ecb4bf89ff9a7213529055c2c8670))

## [1.0.1](https://github.com/yang1206/uniapp-nutui/compare/v1.0.0...v1.0.1) (2023-09-05)

### Bug Fixes

* :bug: 修改inputnumber组件失去焦点以及change的时候展示错误 ([54d7e50](https://github.com/yang1206/uniapp-nutui/commit/54d7e5036af02f171c0e3dc2e12fb9db20f1bd80))
* (picker)修复在非h5环境下多余引入导致无法真机调试 ([c9c8236](https://github.com/yang1206/uniapp-nutui/commit/c9c8236376cf190d20708202deb2c4b81cb7b691))
* **input:** 修复type值number与digit两个校验逻辑反了 ([5c6c3a4](https://github.com/yang1206/uniapp-nutui/commit/5c6c3a4c1dcf24450f966988d93baf293fe4c720))

### Features

* :sparkles: 地址列表组件新增index索引回调 ([3f3bbc0](https://github.com/yang1206/uniapp-nutui/commit/3f3bbc00c74f6673322dc6cfa509f297dacc8299))

# [1.0.0](https://github.com/yang1206/uniapp-nutui/compare/v0.3.1...v1.0.0) (2023-08-30)

### Bug Fixes

* :bug: 解决因组件使用img标签导致微信小程序编译出错问题 ([856f317](https://github.com/yang1206/uniapp-nutui/commit/856f3177ea4a34a6473c51d864324b2b314d5927))

## [0.3.1](https://github.com/yang1206/uniapp-nutui/compare/v0.3.0...v0.3.1) (2023-08-29)

### Features

* (card) 不填写价格则不展示 ([5f3bf98](https://github.com/yang1206/uniapp-nutui/commit/5f3bf98257d58ec530a853c8217b0fa4c6117084))

# [0.3.0](https://github.com/yang1206/uniapp-nutui/compare/v0.2.5...v0.3.0) (2023-08-28)

### Bug Fixes

* (actionsheet) 修复 close-abled 失效问题 ([fabe18d](https://github.com/yang1206/uniapp-nutui/commit/fabe18dca78f30b4146d2fefebb053be1fa85882))
* (countdown) millisecond format ([086c2a9](https://github.com/yang1206/uniapp-nutui/commit/086c2a93736a5fb8b763447a41275522b3c15f7b))
* (picker) 小程序环境切换选项无响应 ([06ca0e8](https://github.com/yang1206/uniapp-nutui/commit/06ca0e86c990aa8caec56c1edbdc6217f576a664))
* (picker) 修复 field-names 在级联模式下的问题 ([a5fa8cf](https://github.com/yang1206/uniapp-nutui/commit/a5fa8cf18fabc526156ff7aec0207b79bc6fc811))

### Features

* (picker) support custom column field names ([808482d](https://github.com/yang1206/uniapp-nutui/commit/808482dbf9b50d7559bbef9c4977fbb6d7a1445e))

## [0.2.5](https://github.com/yang1206/uniapp-nutui/compare/v0.2.4...v0.2.5) (2023-08-24)

### Bug Fixes

* (form) 样式未正确覆盖 ([838db2a](https://github.com/yang1206/uniapp-nutui/commit/838db2ab3af66b79355392e3038cc4c9388168c5)), closes [#28](https://github.com/yang1206/uniapp-nutui/issues/28)
* (dialog) 修复通过ref调用对话框时，noCancelBtn属性无效的bug ([6f7d516](https://github.com/yang1206/uniapp-nutui/commit/6f7d516320044ca8d96104531725eb8556732367))
* (input) 修复左右插件默认文字无法显示 ([8b59931](https://github.com/yang1206/uniapp-nutui/commit/8b59931b4c1f6080ee320af9fa0a4072ec03c235))

## [0.2.4](https://github.com/yang1206/uniapp-nutui/compare/v0.2.3...v0.2.4) (2023-08-18)

### Bug Fixes

* (radio) 自定义图标 slot丢失 ([7ac6772](https://github.com/yang1206/uniapp-nutui/commit/7ac6772e0ea1775ff739803386cff1d2a8b17617)), closes [#15](https://github.com/yang1206/uniapp-nutui/issues/15)

## [0.2.3](https://github.com/yang1206/uniapp-nutui/compare/v0.2.2...v0.2.3) (2023-08-18)

### Bug Fixes

* (configProvider) 修复取值错误问题 ([3a5d5fb](https://github.com/yang1206/uniapp-nutui/commit/3a5d5fb36c33ec35394b74aa443c62ad753ec992))

## [0.2.2](https://github.com/yang1206/uniapp-nutui/compare/v0.2.1...v0.2.2) (2023-08-09)

### Bug Fixes

* (form) 调整 label 中 min-width 样式权重 ([c368e2c](https://github.com/yang1206/uniapp-nutui/commit/c368e2c37dae7425b400b20399b0c2fe53403f75))
* (input) 小程序部分type 属性失效 ([a88fa69](https://github.com/yang1206/uniapp-nutui/commit/a88fa69346dd0ce9b68c6d33b94f59915ab09ae5))
* (tabbar) 切换事件回调参数丢失 ([9979494](https://github.com/yang1206/uniapp-nutui/commit/9979494fbb4c35b73ced81baee8ba94ea44761dc)), closes [#10](https://github.com/yang1206/uniapp-nutui/issues/10) [#10](https://github.com/yang1206/uniapp-nutui/issues/10)

## [0.2.1](https://github.com/yang1206/uniapp-nutui/compare/v0.2.0...v0.2.1) (2023-08-05)

### Bug Fixes

* (cascader) 修复在 Popup 中的滑动问题 ([302cd53](https://github.com/yang1206/uniapp-nutui/commit/302cd531426f892425810989b73a8376d0231175))
* (input) 修复空白节点导致的样式对齐问题 ([11b1d87](https://github.com/yang1206/uniapp-nutui/commit/11b1d870030a3a9b4ba9037c2d14735186b65ab0))
* (uploader) name参数无效 ([b21acd0](https://github.com/yang1206/uniapp-nutui/commit/b21acd0c1b61fae6a6cdd6ecb1d8db7084820bbc)), closes [#9](https://github.com/yang1206/uniapp-nutui/issues/9)

# [0.2.0](https://github.com/yang1206/uniapp-nutui/compare/v0.1.8...v0.2.0) (2023-07-30)

### Bug Fixes

* (animate) 小程序触发动画失效 ([a152121](https://github.com/yang1206/uniapp-nutui/commit/a15212198653e7b8315aa4562663f88fbb91e02b))
* (calendar) 修复自定义起始日高亮列错误问题 ([dfeaebc](https://github.com/yang1206/uniapp-nutui/commit/dfeaebc7a79102765f7d0cca01f098716137fe71))
* (countdown) 方法调用错误 ([6aac458](https://github.com/yang1206/uniapp-nutui/commit/6aac458bc5b3599b8f40a6da59539a208e14239d))
* (form) 小程序验证失效 ([9067f4d](https://github.com/yang1206/uniapp-nutui/commit/9067f4dc167ecc13587bc7714810ae4fea0eb0d4))
* (price) 修复小程序下符号转义丢失问题 ([9194c4c](https://github.com/yang1206/uniapp-nutui/commit/9194c4c59dab0a64383d5b86eb78473c43e4c019))

## [0.1.8](https://github.com/yang1206/uniapp-nutui/compare/v0.1.7...v0.1.8) (2023-07-24)

### Bug Fixes

* (codeInput) 双向绑定失效 ([b9ef603](https://github.com/yang1206/uniapp-nutui/commit/b9ef6034a79b043991b63e032f2a24212d8bb46a))

## [0.1.7](https://github.com/yang1206/uniapp-nutui/compare/v0.1.6...v0.1.7) (2023-07-22)

### Features

* 同步修复 ([dad75c8](https://github.com/yang1206/uniapp-nutui/commit/dad75c84907a6f9464db94581223d73108af6aab))

## [0.1.6](https://github.com/yang1206/uniapp-nutui/compare/v0.1.5...v0.1.6) (2023-07-15)

### Bug Fixes

* 同步nutui的修复 ([94b3b27](https://github.com/yang1206/uniapp-nutui/commit/94b3b27b7cf097be660e0d254bb6001cca577a07))

## [0.1.5](https://github.com/yang1206/uniapp-nutui/compare/v0.1.4...v0.1.5) (2023-07-13)

### Features

* 新增 codeInput组件 ([9b9516b](https://github.com/yang1206/uniapp-nutui/commit/9b9516ba7ce4a147c731a04f25532dfdaef730b6))
* 新增loadingpage组件 ([4ae2c12](https://github.com/yang1206/uniapp-nutui/commit/4ae2c125240e933e5b95209411904d4854a89413))
* 移植nutbingo的部分抽奖组件 ([6e19b1a](https://github.com/yang1206/uniapp-nutui/commit/6e19b1a9c62dd878bf77a32a90fce17b35d83afb))

## [0.1.4](https://github.com/yang1206/uniapp-nutui/compare/v0.1.3...v0.1.4) (2023-07-09)

### Bug Fixes

* 修复elevator在小程序环境文字不显示 ([87fc4e9](https://github.com/yang1206/uniapp-nutui/commit/87fc4e91222e3052d1c0ee849d8b7715d8768177))

### Features

* 增加组件全局类型定义文件 ([c84da47](https://github.com/yang1206/uniapp-nutui/commit/c84da47d8ad9a414965f8bc9f8d033f5bbe90435))

## [0.1.3](https://github.com/yang1206/uniapp-nutui/compare/v0.1.2...v0.1.3) (2023-07-09)

### Bug Fixes

* 修复h5部分组件样式错误 ([cfb1e4b](https://github.com/yang1206/uniapp-nutui/commit/cfb1e4b4a88a8a6d3f674fb0bacf9c5283caabe9))

### Features

* 新增uni_modules安装方式 ([9df523b](https://github.com/yang1206/uniapp-nutui/commit/9df523bd65fcab1b3c57a1686381a0df278855a9))

## [0.1.2](https://github.com/yang1206/uniapp-nutui/compare/v0.1.1...v0.1.2) (2023-07-08)

### Bug Fixes

* 修复运行时环境判断错误 ([ce3b0c7](https://github.com/yang1206/uniapp-nutui/commit/ce3b0c70e18826defb87074117294326240f42ec))

## [0.1.1](https://github.com/yang1206/uniapp-nutui/compare/v0.1.0...v0.1.1) (2023-07-07)

### Bug Fixes

* 修复picker 在h5中适配错误 ([cdd9aa4](https://github.com/yang1206/uniapp-nutui/commit/cdd9aa4da991145776b10c4f76ae02dbc156110b))
* 修复uploader组件自定义上传错误 ([af87d68](https://github.com/yang1206/uniapp-nutui/commit/af87d6852dca14f7f212141bfbb80f247bcb8cbf))

# [0.1.0](https://github.com/yang1206/uniapp-nutui/compare/v0.0.6...v0.1.0) (2023-07-07)

### Bug Fixes

* 修复小程序暗黑模式失效 ([a445f04](https://github.com/yang1206/uniapp-nutui/commit/a445f042bd8ab1d0ecdc9f738a9eff704a299fe7))
* 修复支付宝小程序不支持编译错误 ([2c8e0dd](https://github.com/yang1206/uniapp-nutui/commit/2c8e0dda43ad9687211d8f939a6ad20230c4d486))
* 修复支付宝小程序中部分兼容问题 ([6fa5132](https://github.com/yang1206/uniapp-nutui/commit/6fa513211ffdf60bf9592be198befb2e5c690122))
* 修复h5组件之间引用样式丢失 ([d884e28](https://github.com/yang1206/uniapp-nutui/commit/d884e28d8210308bed1aeb4a488bc3f9f0963aed))

## [0.0.9](https://github.com/yang1206/uniapp-nutui/compare/v0.0.6...v0.0.9) (2023-07-06)

### Bug Fixes

* 修复小程序暗黑模式失效 ([a445f04](https://github.com/yang1206/uniapp-nutui/commit/a445f042bd8ab1d0ecdc9f738a9eff704a299fe7))
* 修复支付宝小程序不支持编译错误 ([2c8e0dd](https://github.com/yang1206/uniapp-nutui/commit/2c8e0dda43ad9687211d8f939a6ad20230c4d486))
* 修复支付宝小程序中部分兼容问题 ([6fa5132](https://github.com/yang1206/uniapp-nutui/commit/6fa513211ffdf60bf9592be198befb2e5c690122))
* 修复h5组件之间引用样式丢失 ([d884e28](https://github.com/yang1206/uniapp-nutui/commit/d884e28d8210308bed1aeb4a488bc3f9f0963aed))

## [0.0.8](https://github.com/yang1206/uniapp-nutui/compare/v0.0.7...v0.0.8) (2023-07-05)

### Bug Fixes

* 修复支付宝小程序编译错误 ([bdd6540](https://github.com/yang1206/uniapp-nutui/commit/bdd65408d77aff73509da7d18a2d04d11b105904))
* 修复h5组件之间引用样式丢失 ([b784635](https://github.com/yang1206/uniapp-nutui/commit/b7846354ffb7355a1328f804aa689b1e85487807))

## [0.0.7](https://github.com/yang1206/uniapp-nutui/compare/v0.0.6...v0.0.7) (2023-07-04)

### Bug Fixes

* 修复小程序暗黑模式失效 ([753f87a](https://github.com/yang1206/uniapp-nutui/commit/753f87ae5c7a9f69e789e18b346ac1b4393f581d))

## [0.0.6](https://github.com/yang1206/uniapp-nutui/compare/v0.0.5...v0.0.6) (2023-07-03)

### Bug Fixes

* sku 样式错乱 ([ebdd0df](https://github.com/yang1206/uniapp-nutui/commit/ebdd0dfeba50ba53a6126e8e3dc12b0f69c39f6c))

## [0.0.5](https://github.com/yang1206/uniapp-nutui/compare/v0.0.4...v0.0.5) (2023-07-03)

### Bug Fixes

* 修复addresslist 样式丢失 ([a36e7e2](https://github.com/yang1206/uniapp-nutui/commit/a36e7e248bc5071978574a016b1e6a967053f690))

## [0.0.4](https://github.com/yang1206/uniapp-nutui/compare/v0.0.3...v0.0.4) (2023-07-03)

### Bug Fixes

* 微信小程序打包生成无意义的index.js文件 ([9c9804d](https://github.com/yang1206/uniapp-nutui/commit/9c9804dea5646a74da163feb176058129d0e2e34))
* 修复steps 在小程序样式混乱 ([72bbb19](https://github.com/yang1206/uniapp-nutui/commit/72bbb19f34d93598fb40f50e3d54c3b5257825ff))

## [0.0.1](https://github.com/yang1206/uniapp-nutui/compare/89499ddbcc62fc62228a0f18ce076511287b5dd5...v0.0.1) (2023-07-02)

### Bug Fixes

* 解决一些已知问题 ([b00a7c4](https://github.com/yang1206/uniapp-nutui/commit/b00a7c416b1f8077968b6e599637b92814481926))

### Features

* 国际化 ([17166d9](https://github.com/yang1206/uniapp-nutui/commit/17166d916e3aa473d463083ba535713b32212f82))
* addresslist, barrage, card, category, comment, ecard, invoice, timeselect ([a7d1b61](https://github.com/yang1206/uniapp-nutui/commit/a7d1b610c55070c5b8dac02a06fe1b00c128021b))
* backtop, drag , swipe , switch ([5f8270d](https://github.com/yang1206/uniapp-nutui/commit/5f8270d6e9930199f1a5ac7bc4fe6cd06727ce11))
* calendar,cascader ([a1f2d76](https://github.com/yang1206/uniapp-nutui/commit/a1f2d76ba520c1833cdab154f3012f319484fceb))
* cell, overlay , transition ([2fe21ca](https://github.com/yang1206/uniapp-nutui/commit/2fe21cab85d9eb0a25effe2e12befee4cda4c3f5))
* checkbox, picker , datepicker ([55c72cc](https://github.com/yang1206/uniapp-nutui/commit/55c72cc1165a0940d7e9827644ac7caafa337a41))
* circleprogress, collapse, animate, countup ([4720c1b](https://github.com/yang1206/uniapp-nutui/commit/4720c1b4af45da56589d1d8e56410014df938944))
* countdown ([89499dd](https://github.com/yang1206/uniapp-nutui/commit/89499ddbcc62fc62228a0f18ce076511287b5dd5))
* dark mode ([d275211](https://github.com/yang1206/uniapp-nutui/commit/d275211c6d6c8948423396c8d63d65acccac711d))
* dialog ([80494b3](https://github.com/yang1206/uniapp-nutui/commit/80494b3fd4bf6c4bbabe1a933de1f5f8b683aaf5))
* elevator, fixednav, indicator ([0ce90ef](https://github.com/yang1206/uniapp-nutui/commit/0ce90efe571c826c73168e57f374ccf1674ae219))
* ellipsis, empty, imagepreview, list, swiper ([d20c07f](https://github.com/yang1206/uniapp-nutui/commit/d20c07f4c045dcc9e301bc79e1e913a77315c19e))
* infiniteloading, divider, grid, layout, sticky ([889d930](https://github.com/yang1206/uniapp-nutui/commit/889d930c81b21c7e766b7f6352814386476b7bbc))
* input,textarea,inputnumber,numberkeyboard,radio,radiogroup ([97a1c4c](https://github.com/yang1206/uniapp-nutui/commit/97a1c4c1407b3a664245be5b32c9660368e37008))
* menu ([3ddf33e](https://github.com/yang1206/uniapp-nutui/commit/3ddf33eab33f90c69bbdf336dda7a1c1951e1ba2))
* noticebar, popover, price, skeleton, steps ([3211db9](https://github.com/yang1206/uniapp-nutui/commit/3211db9431d51c2dbf68e960de6b6e807ee458f0))
* range, rate , searchbar, shortpassword, uploader, form, progress ([c8595fe](https://github.com/yang1206/uniapp-nutui/commit/c8595fe070dc631d6514e898f9a0fa90d692d8f4))
* sidenavbar, pagination, tabbar , badge, avatar ([312acf8](https://github.com/yang1206/uniapp-nutui/commit/312acf85c46a770a163fdfadb9da00c0515e9f70))
* table, tag, tour, trendarrow, watermark, address ([2cb9e78](https://github.com/yang1206/uniapp-nutui/commit/2cb9e78d047e6fee3fcb1a3c2c727865b238229f))
* tabs ([e31e9f5](https://github.com/yang1206/uniapp-nutui/commit/e31e9f546c2054c2f196212ca2e03d4bba40168d))
* toast ([281f225](https://github.com/yang1206/uniapp-nutui/commit/281f225ba296b463e124dce51f69689a0bdb3c23))
* transition 支持自定义动画 ([4fd9314](https://github.com/yang1206/uniapp-nutui/commit/4fd931469a5aa867a040cc625a5b6226b5cb5c77))
