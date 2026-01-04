import {RouterMount,createRouter} from 'uni-simple-router';
import Vue from 'vue'
const vm = new Vue();

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	h5:{
	    vueRouterDev:true,  //完全使用vue-router开发 默认 false  
    },
	routes:[
		// {
		// 	path:'/',
		// 	name:'',
		// 	component:()=>import('@/pages/index/index.vue'),
		// 	meta:{keepAlive: false},
		// },
		{
			path:'/',
			name:'',
			component:()=>import('@/pages/index/index.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/placeOrder',
			name:'placeOrder',
			component:()=>import('@/pages/index/placeOrder.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/addAddress',
			name:'addAddress',
			component:()=>import('@/pages/index/addAddress.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/ecologicalRights',
			name:'ecologicalRights',
			component:()=>import('@/pages/ecological_rights/ecological_rights.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/mine',
			name:'mine',
			component:()=>import('@/pages/mine/mine.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/buyOrder',
			name:'buyOrder',
			component:()=>import('@/pages/trading_hall/buyOrder.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/tradingHall',
			name:'tradingHall',
			component:()=>import('@/pages/trading_hall/trading_hall.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/addressList',
			name:'addressList',
			component:()=>import('@/pages/index/addressList.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/storeOrder',
			name:'storeOrder',
			component:()=>import('@/pages/index/storeOrder.vue'),
			meta:{keepAlive: false},
		},
		{
			path:'/tradeOrder',
			name:'tradeOrder',
			component:()=>import('@/pages/trading_hall/tradeOrder.vue'),
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