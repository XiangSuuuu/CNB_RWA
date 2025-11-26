export default {
	// 存储国家编号
		setAreaCode (state, data) {
			state.areaCode = data;
		},
		// 存储合约数据
		setTotalContract (state, data) {
			state.totalContract = data;
		},
		// 存储token (登陆信息)
		setTokenData (state, data) {
			state.tokenData = data
		},
		// 存储币种钱包地址
		setMyAddress (state, data) {
			if (data !== false) {
				state.myAddress = data //0xa0f0db8c60402baab81604b4833542a1507b20a3
			}
		},
		// 存储是否填写推荐人
		setRelation (state, data) {
			state.myRelation = data
		},
		// 货币设置  1-USD 2-CNY 3-EUR 4-JPY
		setPriceType (state, data) {
			state.priceType = data
		},
		// 用户信息存储
		setUserData (state, data) {
			state.userData = data
		},
		// 存储当前路由跳转名称
		setRouterUrl (state, data) {
			state.routerUrl = data
		},
		// 网站进入判断是否web3签名
		setSignature (state, data) {
			state.signature = data
		},
		// 记住登录状态
		setRememberSign (state, data) {
			state.rememberSign = data
		}
}