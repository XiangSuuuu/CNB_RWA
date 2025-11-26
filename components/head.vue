<template>
	<view v-if="urlName =='' || urlName == 'index'" class="head-wrap flex-lr">
		<view class="rows flex-l">
			<image src="/static/index/logo.png" class="logo-img"></image>
		</view>
		<view class="rows flex-r">
			<view class="flex-center"
				style="margin-right: 20rpx; width: 50rpx; height: 50rpx; background-color: #FFB92F33; border: #FFFFFF4D 2rpx solid; border-radius: 12rpx;">
				<image src="/static/public/lang.png" @click="landModel = !landModel" mode="widthFix" class="icons">
				</image>
			</view>
			<view @click="init()" class="add-wallet flex-center">{{myAddress ? username : $t('index._TEXT3')}}</view>
			<view class="flex-center"
				style=" width: 50rpx; height: 50rpx; background-color: #FFB92F33; border: #FFFFFF4D 2rpx solid; border-radius: 12rpx;">
				<image src="/static/public/menu.png" @click="gainCbModel()" mode="widthFix"
					style="width: 23rpx;height: 20rpx;cursor: pointer;"></image>
			</view>
			<!-- <image src="/static/public/side.png" @click="gainCbModel()" mode="widthFix" class="icons"></image> -->
		</view>

		<!-- 语言选择 -->
		<Model :visible.sync="landModel" :text="$t('index._TEXT8')">
			<view class="land-wraps">
				<view class="lands flex-lr" @click="change(item)" :class="langText == item.lang ? 'lands-in' : ''"
					v-for="(item, index) in langData" :key="index">
					<view class="flex-l">
						<image :src="'/static/land/'+item.img+'.png'" mode="widthFix" class="land-icon"></image>
						<view>{{item.name}}</view>
					</view>

					<image :src="langText == item.lang ? '/static/land/selectIn.png' : '/static/land/select.png'"
						mode="widthFix" class="select-icon"></image>
				</view>
			</view>
		</Model>
		<Model :visible.sync="activeModel"  :close="false">
			<view style="padding: 25rpx; width: 100%; height: 286rpx; background: url('../static/public/bg2.png') no-repeat;background-size: 100% auto;">
				<view style="width: 574rpx; margin-top: 40rpx;">
					<view class="inp-wrap flex-lr">
						<input style="color: #FFFFFF;" type="text" v-model="inviteCode" placeholder="请输入邀请码">
					</view>
				</view>
				<view class="flex-center bind_button" @click="setInvite()" style="width: 574rpx;
				height: 60rpx;
				background: #FFB92F;
				border-radius: 200rpx 200rpx 200rpx 200rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 24rpx;
				color: #000000;
				margin-top:40rpx ;
				">
					绑定
				</view>
				<view class="flex-center" style="width: 100%;">
					<view class="flex-center" style="background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%); position: absolute; top: -25rpx; color: #333333; font-size: 30rpx; font-weight: 600; width: 244rpx ; height: 76rpx; border-radius: 36rpx;">
						请先绑定上级
					</view>
				</view>
			</view>
		</Model>

		<!-- 侧边栏 -->
		<transition name="el-fade-in-linear">
			<view class="model-type flex-l" v-if="cbModel" @click="cbModel = !cbModel">
				<view class="side-wraps">
					<view class="flex-l" style="margin-left: 32rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 600;
						font-size: 36rpx;
						color: #FFFFFF;
						text-align: center;
						font-style: normal;
						text-transform: none;
						">
						菜单
					</view>
					<view class="flex-center" style="width: 100%; margin-bottom: 44rpx;">
						<view style="width: 100%; height: 4rpx; background-color: #FFB92F; margin: 16rpx 28rpx;">
						</view>
					</view>
					<view class="menu-row flex-l" :class="urlName == item.url ? 'menu-row-in' : ''"
						@click="skipUrl(item.url)" v-for="(item, index) in sideData" :key="index">
						<image :src="urlName == item.url?item.iconSelect:item.icon"
							style="width: 48rpx; height: 48rpx;margin-right: 48rpx;" mode="widthFix"></image>
						<view class="menu_title" :class="urlName == item.url ? 'menu_title_in' : ''">
							{{item.text}}
						</view>
						<!-- <image v-if="urlName == item.url" src="/static/menu/selected.png" class="selected_img"
							mode="widthFix"></image> -->
					</view>
					<!-- <view class="server-wraps">
						<image src="/static/public/service0.png" mode="heightFix" class="server-icon"></image>
						<image src="/static/public/service1.png" mode="heightFix" class="server-icon"></image>
					</view> -->
				</view>
			</view>
		</transition>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapActions
	} from 'vuex';
	import Model from '@/components/model.vue';
	let isLoding = true;
	export default {
		components: {
			Model,
		},
		props: {
			text: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				loading: false,
				landModel: false,
				activeModel: false,
				announcementModel: true,
				cbModel: false,
				logPws: false,
				setPws: false,
				urlName: '',
				sideData: [
					// {
					// 	text: this.$t('index._TEXT5'),
					// 	url:'index'
					// },
					{
						text: "首页",
						url: 'index',
						icon: "/static/menu/icon0.png",
						iconSelect: "/static/menu/icon0_select.png"
					},
					{
						text: "协议申购",
						url: 'subscription',
						icon: "/static/menu/icon1.png",
						iconSelect: "/static/menu/icon1_select.png"
					},
					{
						text: "协议订单",
						url: 'agreement',
						icon: "/static/menu/icon2.png",
						iconSelect: "/static/menu/icon2_select.png"
					},
					
					{
						text: "算力汇总",
						url: 'power_summary',
						icon: "/static/menu/icon3.png",
						iconSelect: "/static/menu/icon3_select.png"
					},
					{
						text: "国库",
						url: 'fee_summary',
						icon: "/static/menu/icon4.png",
						iconSelect: "/static/menu/icon4_select.png"
					},
					{
						text: "我的佣金",
						url: 'commission',
						icon: "/static/menu/icon5.png",
						iconSelect: "/static/menu/icon5_select.png"
					},
					{
						text: "我的",
						url: 'mine',
						icon: "/static/menu/icon6.png",
						iconSelect: "/static/menu/icon6_select.png"
					},
				
				],
				langData: [{
						name: 'English',
						img: 'EN',
						lang: 'EN',
					},
					{
						name: '中文',
						img: 'CN',
						lang: 'CN',
					},
					{
						name: '中文繁體',
						img: 'HK',
						lang: 'HK',
					},
				],
				headText: '',
				inviteCode: '',
				password: '',
				password1: '',
			};
		},
		created() {
			if (this.$Common.getPar('invite_code')) { //邀请地址
				this.inviteCode = this.$Common.getPar('invite_code');
			}
			setTimeout(() => {
				this.init();
			}, 1500)
			this.routerInit();
		},
		watch: {
			// 是否链接地址
			myAddress: {
				handler(n, o) {
					this.setPws = false;
					this.logPws = false;
					this.password = '';
					// this.relations();
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
			$route: {
				handler(newVal) {
					// this.routerInit();
					console.log(newVal)
					this.urlName = newVal.name;
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
			signature: {
				handler(n, o) {
					if (n) {
						this.init();
					}
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
			userData: {
				handler(n, o) {
					if (n) {
						// console.log(n)
						if (!n.invitationCode) {
							this.activeModel = true;
						} else {
							this.activeModel = false;
							// if (n.payPassword == 0) { //未设置支付密码
							// 	this.setPws = true;
							// } else {
							// 	this.setPws = false;
							// }
						}
					}
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
		},
		computed: {
			...mapState(['myAddress', 'myRelation', 'tokenData', 'signature', 'userData']),
			langText() {
				return localStorage.getItem('locale') || 'EN';
			},
			langName() {
				if (this.langData && this.langText) {
					let name = 'English';
					this.langData.forEach((item) => {
						if (item.lang == this.langText) {
							name = item.name
						}
					})
					return name;
				} else {
					return '';
				}
			},
			username() {
				if (this.myAddress) {
					const address = this.myAddress;
					let name = '';
					if (!!address) {
						name = address.substr(0, 4) + '******' + address.substring(address.length - 4)
					}
					return name;
				} else {
					return '';
				}
			},
			isLogin() {
				if (this.$store.state.tokenData && this.$store.state.tokenData.token) {
					return true;
				} else {
					return false;
				}
			},
		},
		methods: {
			...mapActions(['gainUserData']),
			...mapMutations(['setMyAddress', 'setRelation', 'setTokenData', 'setUserData']),
			routerInit() {
				// if (this.$router.history && this.$router.history.current) {
				// 	const data = this.$router.history.current.name;
				// }
			},

			gainCbModel() {
				if (this.activeModel) return this.$Common.showToast(this.$t('index._TEXT10'));
				this.cbModel = !this.cbModel;
			},

			init() {
				if (!isLoding) return;
				isLoding = false;
				setTimeout(() => {
					isLoding = true;
				}, 1500)
				// console.log(window.web3Ethers)
				if (window.web3 && window.web3.eth) {
					this.$Common.metaMaskAccount().then(async (address) => {
						if (address) {
							// 判断链ID
							if (window.web3Ethers && window.web3Ethers._network) {
								if (window.web3Ethers._network) {
									// console.log(window.web3Ethers)
									let network = window.web3Ethers._network.chainId
									// if (Number(network) != 56) {
									// 	this.siginStatus = true;
									// 	this.connectWeb3()
									// 	return;
									// }
									if (address === 1) {
										setTimeout(() => {
											this.init()
										}, 100)
									} else {
										if (!this.signature) {
											this.$Common.webSign();
										} else {
											this.setMyAddress(address);
											this.gainIsLogin(); //登录
										}
										// this.setMyAddress(address);
										// this.gainIsLogin(); //登录

										// this.relations(); //请求接口判断是否有推荐地址
									}
								}
							} else {
								setTimeout(() => {
									if (window.web3Ethers._network) {
										let network = window.web3Ethers._network.chainId
										// if (Number(network) != 56) {
										// 	this.siginStatus = true;
										// 	this.connectWeb3()
										// 	return;
										// }
									}
									if (address === 1) {
										setTimeout(() => {
											this.init()
										}, 100)
									} else {
										if (!this.signature) {
											this.$Common.webSign();
										} else {
											this.setMyAddress(address);
											this.gainIsLogin(); //登录
										}
										// this.setMyAddress(address);
										// this.gainIsLogin(); //登录
									}
								}, 1000)
							}
						}
					})
				}
			},

			async connectWeb3() {
				try {
					window.ethereum &&
						window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [{
								chainId: '0x38',
								chainName: 'BNB Smart Chain',
								nativeCurrency: {
									name: 'BNB',
									symbol: 'BNB',
									decimals: 18,
								},
								rpcUrls: ['https://bsc-dataseed.binance.org/'],
								blockExplorerUrls: ['https://bscscan.com/'],
							}, ],
						})
						.then(() => {
							window.history.go(0); //刷新当前页面
							// console.log('网络切换成功')
						})
						.catch((e) => {
							console.log('catch e ')
							console.log(e)
							this.$Common.showToast('Please switch to the main network and try BNB Smart Chain!');
							// setTimeout(() => {
							// 	window.history.go(0); //刷新当前页面
							// }, 1500)
							// console.log('网络切换失败')
						})
				} catch (e) {
					window.ethereum &&
						window.ethereum.request({
							method: 'wallet_switchEthereumChain',
							params: [{
								chainId: '0x38',
								chainName: 'BNB Smart Chain',
								nativeCurrency: {
									name: 'BNB',
									symbol: 'BNB',
									decimals: 18,
								},
								rpcUrls: ['https://bsc-dataseed.binance.org/'],
								blockExplorerUrls: ['https://bscscan.com/'],
							}, ],
						})
						.then(() => {
							window.history.go(0); //刷新当前页面
							// console.log('网络切换成功')
						})
						.catch((e) => {
							console.log('catch e ')
							console.log(e)
							this.$Common.showToast('Please switch to the main network and try BNB Smart Chain!');
							// setTimeout(() => {
							// 	window.history.go(0); //刷新当前页面
							// }, 1500)
							// console.log('网络切换失败')
						})
				}
			},

			//登录
			gainIsLogin() {
				if (!this.myAddress) return;
				if (!uni.getStorageSync('accessToken')) {
					this.$Request.post('app/login', {
						addressAES: this.$Common.addrEncrypt(this.myAddress)
					}, false).then((res) => {
						if (res.code == 200) {
							uni.setStorageSync('accessToken', res.token);
							this.gainUserData();
						}
					});
				} else {
					this.gainUserData();
				}
			},

			// 判断是否有推荐地址
			relations() {
				if (!this.myAddress) return;
				if (this.inviteCode) {
					this.$Request.post('im/user/app/checkUserProfitInviteCode', {}, false).then((res) => {
						if (res.code == 200 && res.data == false) {
							this.activeModel = true;
							// this.setInvite()
						} else {
							this.gainUserData();
						}
					});
				} else {
					this.gainUserData();
				}
			},

			setInvite() {
				if (!this.inviteCode) return this.$Common.showToast(this.$t('index._TEXT11'));
				this.$Request.post('app/user/setInviteCode', {
					inviteCode: this.$Common.addrEncrypt(this.inviteCode)
				}, false).then((res) => {
					if (res.code == 200) {
						this.activeModel = false
						this.gainUserData();
					}
				});
			},

			// 判断是否设置过密码
			isBinds() {
				this.$Request.post('login/isBind', {}).then((res) => {
					if (res.success) {
						if (res.data == 0) { //未设置密码
							this.setPws = true;
						} else { //登录
							if (!this.isLogin) {
								this.logPws = true;
							}
							// this.autoLogin();
						}
					}
				});
			},

			// 设置支付密码
			autoRegister() {
				if (!this.password) return this.$Common.showToast(this.$t('index._TEXT14'));
				if (this.password != this.password1) return this.$Common.showToast(this.$t('index._TEXT17'));
				if (this.loading) return;
				this.loading = true;
				this.$Request.post('im/user/app/update/payPassword', {
					payPassword: this.$Common.md5Num(this.password),
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.$Common.showToast(this.$t('index._TEXT18'));
						this.setPws = false;
						this.gainUserData(); //请求接口判断是否有推荐地址
					}
				});
			},

			// 直接登录
			autoLogin() {
				// if (!this.myAddress || this.tokenData) return;
				// this.$Request.post('login/autoLogin',{
				// 	password: this.password,
				// }).then((res) => {
				// 	this.loading = false;
				// 	if (res.success) {
				// 		this.setTokenData(res.data); //token等登陆后多个信息
				// 		this.setUserData(''); //清空上个号数据
				// 		this.logPws = false;
				// 		this.relations(); //请求接口判断是否有推荐地址
				// 	}
				// });
			},

			// 语言切换
			change(item) {
				// if (localStorage.getItem('locale') == 'zh-cn') {
				// 	localStorage.setItem('locale', 'en-us');
				// } else {
				// 	localStorage.setItem('locale','zh-cn');
				// }
				localStorage.setItem('locale', item.lang);
				// this.$Request.post('app/user/setLanguage',{
				// 	language: this.$Common.landName(),
				// }).then((res) => {
				// 	if (res.code == 200) {}
				// });
				setTimeout(() => {
					window.history.go(0); //刷新当前页面
				}, 100)
			},

			returnPage() {
				uni.navigateBack({
					delta: 1
				});
				// this.$Router.push({
				// 	path: '/',
				// })
			},
			skipPageUrl(url) {
				window.open(url)
			},
			skipUrl(name, params) {
				// if (!this.signature) return;
				this.$Router.push({
					path: name || '/',
					query: params
				})
			},
		},
	}
</script>

<style lang="less">
	.inp-wrap {
	  width: 100%;
	  min-height: 80rpx;
	  background: #FFB92F33;
	  border-radius: 20rpx;
	  padding: 0 32rpx;
	  box-sizing: border-box;
	  margin-bottom: 32rpx;
	  border:#FFB92F solid 2rpx ;
	  color: #FFFFFF99;
	  font-size: 28rpx;
	  font-weight: 400;
	  
	}
	.side-wraps {
		width: 400rpx;
		height: 100vh;
		background: #171717;
		padding: 48rpx 0;
		box-sizing: border-box;
		position: relative;

		.server-wraps {
			position: absolute;
			width: 100%;
			text-align: center;
			bottom: 86rpx;
			left: 0;

			.server-icon {
				width: 188rpx;
				height: 48rpx;
				display: block;
				margin: 0 auto;
				margin-top: 32rpx;
				cursor: pointer;
			}
		}

		.menu {
			width: 280rpx;
			height: 114rpx;
			border: 2rpx solid #0BFDA9;
			background: rgba(11, 253, 169, 0.1);
			color: #0BFDA9;
			font-size: 32rpx;
			margin: 0 auto;
			margin-bottom: 34rpx;
		}

		.menu-row {
			width: 100%;
			height: 106rpx;
			padding-left: 48rpx;
			color: #FFFFFFCC;
			font-size: 28rpx;
			font-weight: 500;
			cursor: pointer;
			border-left: 8rpx solid #111C2E;
			box-sizing: border-box;
		}

		.menu-row-in {
			background: linear-gradient(45deg, #FFB92F1F 0%, #FFB92F1F 100%);
			border-left: 8rpx solid #FFB92F;
			color: #FFB92F;
		}
	}

	.head-wrap {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 0 40rpx;
		height: 120rpx;
		background: transparent;
		box-sizing: border-box;
		z-index: 100;

		.rows {
			color: #fff;
			font-size: 28rpx;

			.logo-img {
				width: 92rpx;
				// min-width: 142rpx;
				height: 92rpx;
			}

			.icons {
				width: 35rpx;
				height: 27rpx;
				// margin-left: 32rpx;
				cursor: pointer;
			}

			.add-wallet {
				padding: 0 24rpx;
				margin-right: 20rpx;
				height: 50rpx;
				background-color: #FFB92F33;
				border: #FFFFFF4D 2rpx solid;
				border-radius: 12rpx;
				cursor: pointer;
				font-weight: 600;
				font-size: 24rpx;
				font-family: 'PingFang SC';
				color: #FFB92F;
			}
		}
	}

	.land-wraps {
		width: 100%;
		box-sizing: border-box;

		.lands {
			width: 100%;
			height: 74rpx;
			box-sizing: border-box;
			margin-bottom: 18rpx;
			color: #666666;
			font-size: 30rpx;
			padding: 0 26rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			background-color: #F7F7F5;

			// border: 2rpx solid #04F8F8;
			.land-icon {
				width: 60rpx;
				height: 60rpx;
				margin-right: 16rpx;
				margin-bottom: -10rpx;
			}

			.select-icon {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.lands-in {
			border: 2rpx solid #F8C934;
			background: #F8C93433;
			color: #333333;
		}
	}

	@media screen and (min-width:826px) {
		.head-wrap {
			width: 720px;
			left: calc(50% - 360px);
			margin: 0 auto;
		}
	}
</style>
<style scoped>
	/* input {
		text-align: center;
	}
	>>> .uni-input-input {
		text-align: center;
		font-size: 28rpx;
	}
	.uni-input-placeholder {
		text-align: center;
		color: #C4C8D9;
		font-size: 28rpx;
	} */
</style>