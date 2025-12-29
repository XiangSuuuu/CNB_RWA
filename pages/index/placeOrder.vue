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
						{{$t('index._TEXT106')}}
					</view>
				</view>
			</view>
		</view>
		<view style="height: 30rpx;">

		</view>
		<view
			style="width: 100%; height: 110rpx; background: url('../static/index/bg3.png') no-repeat; background-size: 100% 100%;">
			<view class="flex-lr" style="width: 100%; height: 95rpx; padding: 24rpx;" @click="onAddressClick">
				<view class="flex-l" style="flex: 1; overflow: hidden;">
					<image src="/static/index/icon0.png" style="width: 40rpx; height: 40rpx; flex-shrink: 0;"></image>
					<view style="width: 34rpx;"></view>

					<view v-if="currentAddress && currentAddress.id"
						style="font-size: 28rpx; font-weight: 400; color: #ffffff;">
						<text>{{ currentAddress.fieldRegion }} {{ currentAddress.fieldDetail }}</text>
					</view>

					<view v-else style="font-size: 28rpx; font-weight: 400; color: #999;">
						{{$t('index._TEXT107')}}
					</view>

				</view>
				<view class="flex-r">
					<image src="/static/index/icon1.png" style="width: 48rpx; height: 48rpx;"></image>
				</view>
			</view>
		</view>
		<view style="height: 15rpx;">

		</view>
		<view class="flex-center"
			style="width: 100%; height: 110rpx; background: url('../static/index/bg3.png') no-repeat; background-size: 100% 100%;">
			<view 
				style="font-size: 28rpx; font-weight: 400; color: #ffffff; margin-top: -20rpx;">
				{{ this.myAddress }}
			</view>
		</view>
		<view style="height: 15rpx;">
		
		</view>
		<view
			style="width: 100%; height: 235rpx;background: url('../static/index/bg4.png') no-repeat; background-size: 100% 100%;">
			<view class="flex-lr" style="width: 100%; height: 220rpx; padding: 30rpx;">
				<image :src="goods.goodsImg" style="width: 240rpx; height: 160rpx;"></image>
				<view
					style="display: flex; flex-direction: column; justify-content: space-between; width: 56%; height: 100%;">

					<view style="display: flex; justify-content: space-between;">
						<view style="font-size: 24rpx; font-weight: 600; color:#BE74FF ;">
							{{goods.goodsName}}
						</view>
						<view style="font-size: 24rpx; font-weight: 400; color:#FFFFFF ;">{{$t('index._TEXT108')}}</view>
					</view>

					<view style="display: flex; justify-content: space-between;">
						<view style="font-size: 24rpx; font-weight: 800; color:#DFBBFF ;">{{goods.goodsPrice}}</view>
						<view class="flex-lr" style="width: 200rpx; height: 40rpx;">
							<image src="/static/index/icon2.png" style="width: 40rpx; height: 40rpx;"
								@click.stop="decrease">
							</image>

							<view class="flex-center"
								style="width: 106rpx; height: 40rpx; background-color: #F6F5F71A; border-radius: 5rpx; border: 2rpx solid #FFFFFF4D;">
								{{ buyCount }}
							</view>

							<image src="/static/index/icon3.png" style="width: 40rpx; height: 40rpx;"
								@click.stop="increase">
							</image>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="flex-r" style="width: 100%;">
			<view style="font-size: 28rpx; font-weight: 400;">
				{{$t('index._TEXT109')}}：
			</view>
			<view style="font-size: 24rpx; font-weight: 800; color: #DFBBFF;">
				{{discount==1?$t('index._TEXT110'):discount*10}} {{discount==1?"":$t('index._TEXT111')}}
			</view>
		</view>
		<view class="flex-r" style="width: 100%;">
			<view style="font-size: 28rpx; font-weight: 400;">
				{{$t('index._TEXT112')}}：：
			</view>
			<view style="font-size: 24rpx; font-weight: 800; color: #DFBBFF;">
				{{collection}} USDT
			</view>
		</view>
		<view class="flex-center" style="width: 100%;">
			<view @click="submit()" class="flex-center"
				style="font-size: 28rpx; font-weight: 500; width: 80%; height: 96rpx; background-color: #C889FF; border-radius: 32rpx; position: absolute; bottom: 40rpx;  width: 90%; z-index: 1;">
				{{$t('index._TEXT113')}}：
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
		
		data() {
			return {
				loading: false,
				unitNum: 10 ** 18,
				approveNum: 0, //当前选择币种授权的余额
				is_approve: false, //是否授权
				goods: null,
				buyCount: 1,
				addressList: [],
				currentAddress: null,
				discount:1,
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

			collection() {
			  if (this.buyCount && this.goods.goodsPrice && this.discount) {
			    return new Decimal(this.goods.goodsPrice)
			      .mul(this.buyCount)
			      .mul(this.discount)   // 0.6 / 0.9
			      .toNumber();
			  }
			  return 0;
			}
		},
		mounted() {
			this.init()
			
		},
		methods: {
			...mapActions(['gainUserData']),
			init() {
				this.getUserInfo();
				const backData = uni.getStorageSync('selectedAddress');
				console.log("backData"+backData)
				// 2. 判断是否有数据
				if (backData) {
					console.log("backData"+backData)
					this.currentAddress = backData;
					uni.removeStorageSync('selectedAddress');
				}else{
					this.getAddressList();
				}
				const data = uni.getStorageSync('placeOrderData');
				if (data) {
					console.log('从缓存拿到的参数:', data);
					this.goods = data;

					// 【可选】取完数据后清除缓存，防止下次进入页面读到脏数据
					// uni.removeStorageSync('placeOrderData'); 
				}
			},
			getUserInfo() {
				this.$Request.get('app/user/getUserInfo', {}).then((res) => {
					if (res.code == 200) {
						this.discount = res.data.count3;
					}
				}, false, false);
			},
			submit() {
				console.log(this.$usdttcc)
				if (!this.currentAddress) return this.$Common.showToast($t('index._TEXT114'));
				const num = this.toFixedSafe(this.collection * this.unitNum);
				this.$usdttcc.transfer(
					this.$payAddress,
					num,
				).then((ret) => {
					if (ret) {
						console.log("ret"+ret);
						this.$Request.post('app/shop/order/add', {
							goodsId: this.goods.id,
							addressId: this.currentAddress.id,
							orderNum: this.buyCount,
							orderPrice: this.collection,
							orderAmount: this.goods.goodsPrice,
							hash: ret.hash,
							orderRemark: "",
							orderOther:this.myAddress
						}).then((val) => {
							this.loading = false;
							if (val.code == 200) {
								this.$Common.showToast(this.$t('index._TEXT180'));
								this.num = '';
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 1000)
							}
						});
					}
				}, res => {
					this.loading = false;
					const err = JSON.parse(JSON.stringify(res))
					console.log(err)
					this.$Common.errPoint(err)
				});
			},
			onAddressClick() {
				if (this.currentAddress && this.currentAddress.id) {
					// 【情况1】有默认地址 -> 跳转到“选择地址列表”页面
					this.$Router.push({
						path: '/addressList' // 请替换为你实际的地址列表页路径
					});
				} else {
					// 【情况2】没有默认地址 -> 跳转到“新增地址”页面
					this.$Router.push({
						path: '/addAddress' // 请替换为你实际的新增地址页路径
					});
				}
			},
			getAddressList() {
				return this.$Request.get('app/shop/address/list', {}).then((res) => {
					if (res.code == 200) {
						this.addressList = res.data;

						// 使用 find 直接找出 isDefault 为 1 的项
						const defaultAddr = this.addressList.find(item => item.isDefault == 1);

						// 如果找到了默认地址，就赋值；如果没找到(undefined)，可以做兜底逻辑
						if (defaultAddr) {
							this.currentAddress = defaultAddr;
						}
					}
				});
			},

			decrease() {
				if (this.buyCount > 1) {
					this.buyCount--;
				} else {
					uni.showToast({
						title: '最少购买1件',
						icon: 'none'
					});
				}
			},

			// 增加数量
			increase() {
				if (this.buyCount < this.goods.stockQty) {
					this.buyCount++;
				} else {
					uni.showToast({
						title: '库存不足',
						icon: 'none'
					});
				}
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
				if (this.activeModel) return this.$Common.showToast(this.$t('index._TEXT10'));
				this.$Router.push({
					path: name,
					query: params
				})
			},
		},
		beforeDestroy() {
			clearInterval(this.timer); // 在组件销毁前清除定时器，防止内存泄漏
		}
	}
</script>

<style lang="less">
	.pages {}

	@media screen and (min-width:826px) {
		.head-wrap {
			width: 720px;
			left: calc(50% - 360px);
			margin: 0 auto;
		}
	}
</style>