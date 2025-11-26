export default {
	tokenData: '', //token等登陆后多个信息
	myAddress: '',
	totalContract: null,
	myRelation: false, //判断是否填写推荐地址
	countryCode: '', //区号
	areaCode: null, //区号存储
	priceType: {name: 'USD',type: 1,numText: 'usdt',unit: '$'}, //货币类型 1-USD 2-CNY 3-EUR 4-JPY
	userData: null, //用户信息存储
	routerUrl: '', //存储当前路由跳转名称
	rememberSign: {status: false, phoneEmail: '', password: ''}, //记住登录状态
	signature: false, //判断是否签名
}