import md5Libs from "uview-ui/libs/function/md5";
import Vue from 'vue'
const vm = new Vue();

// import loading from '../loading/loading.js';
// const loadings = loading(); //如果不写这个的话，则下面两步操作的可能不是一个loading

//先把接口暴露出去
export default{
	//我们先定一个uni-app方法 以便于以下操作使用uni-app调取接口时便利
	request(options, loding){
		///我们使用Promise方法来实现调用接口时后面多个.then()的方法
		//只有Promise能实现如同$axios后面连续多个.then()的方法
	 	return new Promise((reslove,reject)=>{
			uni.request({
				...options,
				success:res=>{
					reslove(res.data)
					if (res.data.code != 200) {
						// console.log(JSON.stringify(res.data) + 'res.message')
						if (res.data.code == 401) {
							uni.setStorageSync('accessToken', '');
							uni.setStorageSync('loginData', '');
							vm.$Router.push({
								path: '/',
							})
							setTimeout(() => {
								location.reload();
							}, 1500)
						} else {
							vm.$Common.showToast(res.data.msg)
						}
						if (res.data.msg != '访问过于频繁，请稍候再试' && res.data.msg) {
							vm.$Common.showToast(res.data.msg)
						}
					}
				},
				complete: res=>{
					if (loding) {
						vm.$Loading.handleDestory();
						uni.hideLoading(); //隐藏loading加载框
					}
				}
			})
		})
	},
	//在方法中 第二个参数和第三个参数用ES6新语法来添加默认值
	//接口调取get方法
	get(url,data={}, loding=true){
		//我们把传过来的参数赋给options，这样我们在使用uni-app
		//this.request()方法时 传递一个参数就可以
		let options = {};
		let parameter = vm.$Common.publicParameter();// 接口请求公共参数
		data = Object.assign(parameter, data);
		options.url = vm.$httpsUrl + url;
		options.data = data;
		if (loding) {
			vm.$Loading.handlemount();
			// uni.showLoading({title: '加载中'});
		}
		options.method = 'get';
		options.header = {
			'accessToken': uni.getStorageSync('accessToken') || '',
			'Accept-Language': vm.$Common.landName(),
		};
		//调用上面自己定义的this.request()方法传递参数
		return this.request(options, loding)
	},
	//接口调取post方法
	post(url,data={}, loding=true){
		let options = {};
		let parameter = vm.$Common.publicParameter();// 接口请求公共参数
		data = Object.assign(parameter, data); //公共参数 外部参数合并
		options.url = vm.$httpsUrl + url;
		options.data = data;
		options.method = 'post';
		// options.header = {'content-type': 'application/x-www-form-urlencoded'};
		options.header = {
			'content-type': 'application/json;charset=UTF-8',
			'accessToken': uni.getStorageSync('accessToken') || '',
			'Accept-Language': vm.$Common.landName(),
		};
		
		if (loding) {
			vm.$Loading.handlemount();
			// uni.showLoading({title: '加载中'});
		}
		return this.request(options, loding)
	}
}