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
