import {RouterMount,createRouter} from 'uni-simple-router';
import Vue from 'vue'
const vm = new Vue();

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	h5:{
	    vueRouterDev:true,  //完全使用vue-router开发 默认 false  
    },
	routes:[
		{
			path:'/',
			name:'',
			component:()=>import('@/pages/index/index.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/index',
			name:'index',
			component:()=>import('@/pages/index/index'),
			meta:{keepAlive: false},
		},
		{
			path:'/agreement',
			name:'agreement',
			component:()=>import('@/pages/agreement_order/agreement.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/subscription',
			name:'subscription',
			component:()=>import('@/pages/agreement_subscription/agreement_subscription.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/subscription_order',
			name:'subscription_order',
			component:()=>import('@/pages/agreement_subscription/agreement_subscription_order.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/power_summary',
			name:'power_summary',
			component:()=>import('@/pages/power_summary/power_summary.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/fee_summary',
			name:'fee_summary',
			component:()=>import('@/pages/fee_summary/fee_summary.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/commission',
			name:'commission',
			component:()=>import('@/pages/commission/commission.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/mine',
			name:'mine',
			component:()=>import('@/pages/mine/mine.vue'),
			meta:{keepAlive: false},
		},
		
	]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
})

export {
	router,
	RouterMount
}