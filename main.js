import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import request from './components/index/request.js'  //封装接口
import common from './components/index/common.js' //提示框等封装代码
import MiddleBg from '@/components/index/MiddleBg.js' //背景图片不变形
import i18n from './lang/index'  //语言包
import {router,RouterMount} from './router/index.js'  //路径换成自己的 //相当于vue-Router
import store from './store'  //引入vuex
import Loading from './components/loading/loading.js' //引入自定义loading动画

Vue.prototype._i18n = i18n;
// 引入uView-ui组件库（注意这两行要放在 import Vue 之后）
import uView from 'uview-ui';
Vue.use(uView);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

Vue.config.productionTip = false

// 引入全局分装接口
Vue.prototype.$Request = request; //接口
Vue.prototype.$Common = common; //封装代码 （提示框）

var protocolStr = document.location.protocol; 
const currentProtocol = window.location.protocol;
console.log("currentProtocol:"+currentProtocol)
let urlHead = 'http'; // 默认HTTP协议

// 判断是否为HTTPS协议
if (currentProtocol === 'https:') {
  urlHead = 'https';
}

// http接口 域名配置
if (window.location.host.indexOf('localhost') != -1) {
	Vue.prototype.$httpsUrl = urlHead + '://test-frp.zjtxy.top/test-api-vbo/'; //测试域名  VBOweb3.xin/prod-api-VBO-test
} else {
	Vue.prototype.$httpsUrl = urlHead + '://test-frp.zjtxy.top/test-api-vbo/'; //正式域名 vbo-api.qjnhje.com/prod-api-vbo
}
Vue.prototype.$httpSign = '%In9AXC0#Za8kd&U'; //签名

// 测试 推荐关系 0xc6eDD89D6570567514F78d789c01926a4f401c45

// 自定义loading动画
Vue.prototype.$Loading = Loading();

// 背景图片不变形方法  new this.$MiddleBg({id: 'bgimg',imgsrc: '../login-bg.png'}).bgRender()
Vue.prototype.$MiddleBg = MiddleBg;
Vue.prototype.$Unit = 'VBO';

//路由
Vue.use(router)

//把vuex定义成全局组件
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	i18n,
    ...App
})
RouterMount(app,router,'#app')
app.$mount()
