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
						{{$t('index._TEXT98')}}
					</view>
				</view>
			</view>
		</view>
		<view style="height: 30rpx;">

		</view>
		<view  v-for="(item, index) in addressList" :key="index"
			style="width: 100%; height: 110rpx; background: url('../static/index/bg3.png') no-repeat; background-size: 100% 100%;">
			<view  class="flex-lr" style="width: 100%; height: 95rpx; padding: 24rpx;">
				<view @click="backWithData(item)" class="flex-l" style="flex: 1; overflow: hidden;">
					<image v-if="item.isDefault==1" src="/static/index/check.png" style="width: 40rpx; height: 40rpx; flex-shrink: 0;"></image>
					<view v-if="item.isDefault==0" style="width: 40rpx; height: 40rpx;"></view>
					<view style="width: 34rpx;"></view>
					<view style="height: 100%;">
						<view 
							style="font-size: 28rpx; font-weight: 400; color: #ffffff;">
							<text>{{ item.fieldRegion }} {{ item.fieldDetail }}</text>
						</view>
						<view style="height: 5rpx;">
							
						</view>
						<view class="flex-l" style="font-size: 24rpx; font-weight: 400; color: #FFFFFF99;">
							<view>
								{{item.fieldName}}
							</view>
							<view style="width: 10rpx;">
								
							</view>
							<view>
								{{item.fieldPhone}}
							</view>
						</view>
					</view>
				</view>
				<view class="flex-r">
					<image @click="activeSwich(item)" src="/static/index/delete.png" style="width: 40rpx; height: 40rpx; position: relative; z-index: 99;"></image>
					<view style="width: 10rpx;">
						
					</view>
					<image @click="skipUrl('/addAddress',item)" src="/static/index/edit.png" style="width: 40rpx; height: 40rpx; position: relative; z-index: 99;"></image>
				</view>
			</view>
		</view>
		<view class="flex-center" style="width: 100%;">
			<view @click="skipUrl('/addAddress')" class="flex-center"
				style="font-size: 28rpx; font-weight: 500; width: 80%; height: 96rpx; background-color: #C889FF; border-radius: 32rpx; position: absolute; bottom: 40rpx;  width: 90%; z-index: 1;">
				{{$t('index._TEXT99')}}
			</view>
		</view>
		<Model :visible.sync="activeModel"  :close="false">
			<view style="padding: 25rpx; width: 100%; height: 286rpx; background: url('../static/public/bg2.png') no-repeat;background-size: 100% auto;">
				<view class="flex-center" style="width: 574rpx; margin-top: 40rpx; font-size: 28rpx; font-weight: 500;">
					{{$t('index._TEXT100')}}
				</view>
				<view class="flex-center bind_button" @click="deleteAddress()" style="width: 574rpx;
				height: 60rpx;
				background: #C889FF;
				border-radius: 200rpx 200rpx 200rpx 200rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 24rpx;
				color: #ffffff;
				margin-top:80rpx ;
				">
					{{$t('index._TEXT101')}}
				</view>
				<view class="flex-center" style="width: 100%;">
					<view  style="background: url('/static/public/model_bg.png') no-repeat;
				background-size: 100% 100%; position: absolute; top: -25rpx;  width: 244rpx ; height: 85rpx;">
						<view class="flex-center" style="height: 70rpx; color: #FFFFFF; font-size: 30rpx; font-weight: 600;">
							{{$t('index._TEXT102')}}
						</view>
					</view>
				</view>
			</view>
		</Model>
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
				addressList: [],
				activeModel: false,
				selectedAddress:null,
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
				this.getAddressList();
			},
			activeSwich(value){
				this.activeModel= true;
				this.selectedAddress = value;
			},
			getAddressList() {
				return this.$Request.get('app/shop/address/list', {}).then((res) => {
					if (res.code == 200) {
						this.addressList = res.data;
					}
				});
			},

			deleteAddress(){
				this.activeModel  = false;
				this.$Request.post('app/shop/address/del',{
					id:this.selectedAddress.id,
				}).then((val) => {
					this.loading = false;
					if (val.code == 200) {
						this.$Common.showToast(this.$t('index._TEXT78'));
						
						setTimeout(() => {
							this.init()
						}, 1000)
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
	.pages {}

	@media screen and (min-width:826px) {
		.head-wrap {
			width: 720px;
			left: calc(50% - 360px);
			margin: 0 auto;
		}
	}
</style>