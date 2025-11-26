# AiLoadNET (pc h5端)

#### 介绍
uni-app

#### 软件架构
软件架构说明


#### 安装教程
1. npm install
2. 直接在HBuilderX 中 运行  运行到浏览器   Chrome

#### 组件
1.uview-ui   https://www.uviewui.com/components/collapse.html

#### 使用说明
1.components  (组件库)
2.css (样式) (less)  预编译(插件市场安装less)  (自动编译为css文件  工具 - 外部命令插件配置 - compile-less - package.json - external -> commands -> onDidSaveExecution: true)
3.pages (页面)
4.static (静态资源)
5.main.less  (公共样式)

#### components
vModel.vue   自定义组件 v-model 实现原理
verificationNum.vue  登录数字相加验证框组件
pagersPage.vue   分页器
none.vue   暂无记录组件
navigation.vue  侧边导航栏
model.vue  自定义弹出框
Mixin.js  mixing组件公共代码
asyncComponent.vue  动态异步组件
echarts.vue   k线图
head.vue   头部侧边栏组件 自适应
returnPage.vue   页面右上角返回
pickerTimer.vue   时间选择器
loading   自定义loading加载动画  和请提示

-----------index
common.js    自定义公共方法
eventBus.js  new一个vue实列  用于自定义事件监听
request.js  接口封装

#### uni-simple-router (vue-router)
router index.js  存放routes page
全局路由前置守卫
全局路由后置守卫

#### vuex
store index.js //存储