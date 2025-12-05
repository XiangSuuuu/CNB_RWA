<template>
	<view class="pages">

		<view style="position: absolute; top: 0; left: 0; width: 100%; z-index: -1;">
			<image src="/static/index/bg.png" style="width: 780rpx; height: 1800rpx;"></image>
		</view>

		<view class="flex-center" style="width: 100%; position: relative; z-index: 1;">
			<view class="flex-center" style="width: 100%; height: 53rpx;">
				<view class="flex-center"
					style="height:60rpx; width: 164rpx; background: url('../static/trading_hall/selected.png') no-repeat; background-size: 100% 100%;">
					<view style="margin-top: -15rpx;">
						{{$t('index._TEXT115')}}
					</view>
				</view>
			</view>
		</view>
		<view style="height: 30rpx;">

		</view>
		<view class="order-sele-wrap flex-center">
			<view class="order-item flex-center" @click="switchTab(0)"
				:class="tabIx == 0 ? 'order-item-in gradient-box' : ''">
				{{$t('index._TEXT116')}}
			</view>
			<view class="order-item flex-center" @click="switchTab(1)"
				:class="tabIx == 1 ? 'order-item-in gradient-box' : ''">
				{{$t('index._TEXT117')}}
			</view>
			<view class="order-item flex-center" @click="switchTab(2)"
				:class="tabIx == 2 ? 'order-item-in gradient-box' : ''">
				{{$t('index._TEXT118')}}
			</view>
		</view>
		<view style="height: 30rpx;">

		</view>
		<view class="flex-lr" v-for="(item, index) in orderList" :key="index"
			style="padding: 20rpx; width: 100%; height: 172rpx; margin-bottom: 20rpx; border-radius: 14rpx; border: 2rpx solid #000000; background: linear-gradient(180deg, #2c2136 0%, #201f21ff 100%);;">
			<image src="https://miaobi-lite.bj.bcebos.com/miaobi/5mao/b%27LV8xNzMyNTY2MjI0LjA1ODU4Nw%3D%3D%27/0.png"
				style="width: 200rpx; height: 132rpx; border-radius:14rpx ;"></image>
			<view style="width: 65%; height: 100%; display: flex;flex-direction: column;justify-content: space-evenly;">
				<view class="flex-lr" style="width: 100%;">
					<view style="font-size: 24rpx; font-family: 600; color: #BE74FF;">
						{{item.goodsName}}
					</view>
					<view style="font-size: 24rpx; font-family: 400; color: #DFBBFF;">
						{{ stateMap[item.stateNum] }}
					</view>
				</view>
				<view class="flex-l" style="width: 100%;">
					<view style="font-size: 24rpx; font-family: 400; color: #FFFFFFCC;">
						{{$t('index._TEXT119')}}：{{item.orderPrice}}USDT*{{item.orderNum}}
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #655A8980;"></view>
				<view class="flex-r" style="width: 100%;">
					<view style="font-size: 24rpx; font-family: 400; color: #FFFFFFCC;">
						{{$t('index._TEXT120')}}：
					</view>
					<view style="font-size: 24rpx; font-family: 800; color: #FFFFFF;">
						{{item.orderAmount}}USDT
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const BigNumber = require('bignumber.js');
	import {
		mapGetters,
		mapMutations,
		mapState,
		mapActions
	} from 'vuex';
	import Model from '@/components/model.vue';
	import MyGrid from '@/components/grid-view.vue';
	import Decimal from 'decimal.js';
	export default {
		components: {
			Model,
			MyGrid,

		},
		onShow() {
			// 每次页面显示时，都重新获取数据
			console.log('页面显示了，刷新数据');
			this.init();
		},
		data() {
			return {
				loading: false,
				unitNum: 10 ** 18,
				approveNum: 0, //当前选择币种授权的余额
				is_approve: false, //是否授权
				tabIx: 0,
				orderList: [],
				stateMap: {
					"-1": $t('index._TEXT121'),
					"2": $t('index._TEXT122'),
					"4": $t('index._TEXT123')
				}

			}
		},
		watch: {
			userData: {
				handler(n, o) {
					if (n) {
						console.log(n)
						if (!n.invitationCode) {
							this.$Router.push({
								path: '/',
							})
						} else {
							if (uni.getStorageSync('accessToken')) {
								// this.getConfigs();
							}

						}
					}
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
			myAddress: {
				handler(n, o) {
					if (n) {
						this.gainUserData();
						// this.autoLogin();
					}
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
		},

		computed: {
			...mapState(['myAddress', 'myRelation', 'tokenData', 'signature', 'userData', 'totalContract']),
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(['gainUserData']),
			init() {
				this.switchTab(this.tabIx);
			},
			switchTab(index) {
				this.tabIx = index;
				switch (this.tabIx) {
					case 0:
						this.getOrderList(-1)
						break;
					case 1:
						this.getOrderList(2)
						break;
					case 2:
						this.getOrderList(4)
						break;
					default:
						break;
				}
			},
			getOrderList(stateNum) {
				return this.$Request.get('app/shop/order/list', {
					"stateNum": stateNum,
					"pageNum": 1,
					"pageSize": 200,
				}).then((res) => {
					if (res.code == 200) {
						this.orderList = res.data;
					}
				});
			},
			truncateToFixed(num, fixed) {
				const factor = Math.pow(10, fixed);
				return Math.trunc(num * factor) / factor;
			},
			toFixedSafe(x) {
				let str = x.toString();
				if (!/e/i.test(str)) return str;

				// 处理科学计数法
				let [base, exponent] = str.toLowerCase().split('e');
				let exp = parseInt(exponent, 10);

				let [intPart, fracPart = ''] = base.split('.');
				let number = intPart + fracPart;
				let decimalPos = intPart.length;

				if (exp > 0) {
					number = number.padEnd(decimalPos + exp, '0');
					return number;
				} else {
					number = number.padStart(decimalPos - exp, '0');
					let dotPos = number.length + exp;
					return number.slice(0, dotPos) + '.' + number.slice(dotPos);
				}
			},
			toFixed(x) {
				if (Math.abs(x) < 1.0) {
					var e = parseInt(x.toString().split('e-')[1]);
					if (e) {
						x *= Math.pow(10, e - 1);
						x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
					}
				} else {
					var e = parseInt(x.toString().split('+')[1]);
					if (e > 20) {
						e -= 20;
						x /= Math.pow(10, e);
						x += (new Array(e + 1)).join('0');
					}
				}
				return x;
			},
			async approveMarts(is = 0) {

				try {
					const tokenInstance = this.$usdttcc;
					const usdtNum = await tokenInstance.allowance(this.myAddress, this.$buytcc.address);
					if (is) {
						if (this.approveNum == parseInt(usdtNum) / this.unitNum) {
							this.is_approve = false;
						} else {
							this.approveNum = parseInt(usdtNum) / this.unitNum; //授权金额
							this.is_approve = parseInt(usdtNum) ? true : false; //是否授权
						}
					} else {
						this.approveNum = parseInt(usdtNum) / this.unitNum; //授权金额
						this.is_approve = parseInt(usdtNum) ? true : false; //是否授权
					}
					console.log(this.approveNum)
					console.log(this.is_approve)
				} catch (e) {
					console.log("e===" + e)
					//TODO handle the exception
				}
			},
			isCoin(is = 0, isSub = 0, value) {
				if (this.coinLoading) return;
				this.coinLoading = true

				const tokenInstance = this.$usdttcc;
				const nums = BigNumber(this.unitNum).multipliedBy(value);
				const price = this.toFixedSafe(nums);
				tokenInstance.approve(this.$buytcc.address, price).then((
					hash) => {
					this.coinLoading = false
					if (hash) {
						let num = 0
						this.$Loading.setPoint(this.$t('index._TEXT38') + '...', 300000)
						let time = setInterval(() => {
							if (this.is_approve) {
								clearInterval(time)
								this.$Loading.setPoint('', 0)
								this.approveMarts(0) //请求授权
								if (isSub) { //授权完成 继续请求升级
									this.deposit();
								}
							} else {
								if (num >= 20) {
									clearInterval(time);
									this.$Loading.setPoint('', 0)
								} else {
									this.approveMarts(is)
									num += 1
								}
							}
						}, 3000)
					}
				}, res => {
					this.coinLoading = false
					const err = JSON.parse(JSON.stringify(res))
					this.$Common.errPoint(err)
				})
			},
			selectAmount(amount) {
				this.selectedAmount = amount;
			},
			skipPageUrl(url) {
				window.open(url)
			},
			returnPage() {
				uni.navigateBack({
					delta: 1
				});
				// this.$Router.push({
				// 	path: '/',
				// })
			},
			skipUrl(name, params) {
				uni.setStorageSync('addressData', params);
				this.$Router.push({
					path: name
				});
			},
			backWithData(params) {
				// 2. 将数据存入本地缓存
				// 建议使用一个专门用于“返回传参”的 Key，例如 'PAGE_BACK_DATA'
				uni.setStorageSync('selectedAddress', params);

				// 3. 返回上一页
				// 如果你使用的是 uni-simple-router 也可以用 this.$Router.back()
				uni.navigateBack({
					delta: 1
				});
			},
		},
	}
</script>

<style lang="less">
	.pages {

		.order-sele-wrap {
			width: 100%;
			// margin-top: 20rpx;
			height: 80rpx;
			// background: #1B2B39;
			border-radius: 96rpx;
			display: flex;
			justify-content: space-between;

			.order-item {
				width: 40%;
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				color: #FFFFFF8C;
				font-size: 30rpx;
				font-weight: 400;
				position: relative;
				cursor: pointer;

				&::after {
					content: '';
					position: absolute;
					bottom: 30rpx;
					/* 调整横条位置 */
					left: 25%;
					width: 50%;
					height: 6rpx;
					background-color: transparent;
					border-radius: 4rpx;
					transition: all 0.3s ease;
				}
			}

			.order-item-in {
				font-weight: 600;
				color: #FFFFFF;
				font-size: 30rpx;


				&::after {
					background-color: #BE74FF; // 黄色条
				}
			}
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