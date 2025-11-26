import Vue from "vue";
const vm = new Vue();
export default {
	// 获取区号
	gainAreaCode({commit}){
		return new Promise((resolve, reject) => {
		  vm.$Request.post('login/countryList',{}).then((res) => {
				if (res.success && res.data) {
					commit('setAreaCode', res.data); //存储区号
				}
				resolve();
		  });
		})
	},
	// 设置初始区号
	setInitialCode ({commit, state}) {
		// console.log(JSON.stringify(state.areaCode) + 'state.areaCode')
		return new Promise((resolve, reject) => {
			state.areaCode.forEach((item) => {
				if (item.country == '美国') {
					resolve(item); //默认选择美国
				}
			})
		})
	},
	// 获取用户信息
	gainUserData ({commit}) {
		return new Promise((resolve, reject) => {
			if (uni.getStorageSync('accessToken')) {
				vm.$Request.get('app/user/getUserInfo',{}, false).then((res) => {
					if (res.code && res.code == 200) {
						commit('setUserData', res.data); //存储用户信息
					}
					resolve();
				});
			} else {
				resolve();
			}
		})
	},
}