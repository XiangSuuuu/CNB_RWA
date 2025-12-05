<template>
	<view class="pages">

		<view style="position: absolute; top: 0; left: 0; width: 100%; z-index: -1;">
			<image src="/static/index/bg.png" style="width: 780rpx; height: 1800rpx;"></image>
		</view>

		<view class="flex-center" style=", width: 100%; position: relative; z-index: 1;">
			<view class="flex-center" style="width: 100%; height: 53rpx;">
				<view class="flex-center"
					style="height:60rpx; width: 164rpx; background: url('../static/trading_hall/selected.png') no-repeat; background-size: 100% 100%;">
					<view style="margin-top: -15rpx;">
						{{$t('index._TEXT80')}}
					</view>
				</view>
			</view>
		</view>
		<view
			style="margin-top: 30rpx; width: 100%; height: 370rpx; background: url('../static/index/bg5.png') no-repeat; background-size: 100% 100%;">
			<view style="width: 100%; height: 355rpx; padding: 20rpx;">
				<view class="flex-lr" style="width: 100%; padding: 10rpx 30rpx;">
					<view class="flex-l" style="font-size: 28rpx; font-weight: 400;">
						{{$t('index._TEXT81')}}
					</view>
					<view style="width: 82rpx;"></view>
					<view class="flex-r" style="width: 65%;">
						<input style="width: 100%; color: #FFFFFF;"
							placeholder-style="font-size: 28rpx;color: #FFFFFF80;font-family: 'Open Sans';font-weight: 400;"
							type="text" v-model="name" :placeholder="$t('index._TEXT82')" />
					</view>
				</view>
				<view
					style="margin-left: 10rpx; width: 97.5%; height: 2rpx; margin-top: 15rpx; margin-bottom: 15rpx; background-color:#655A8980 ;">

				</view>
				<view class="flex-lr" style="width: 100%; padding: 10rpx 30rpx;">
					<view class="flex-l" style="font-size: 28rpx; font-weight: 400;">
						{{$t('index._TEXT83')}}
					</view>
					<view style="width: 82rpx;"></view>
					<view class="flex-r" style="width: 65%;">
						<input style="width: 100%; color: #FFFFFF;"
							placeholder-style="font-size: 28rpx;color: #FFFFFF80;font-family: 'Open Sans';font-weight: 400;"
							type="text" v-model="phoneNumber" :placeholder="$t('index._TEXT84')" />
					</view>
				</view>
				<view
					style="margin-left: 10rpx; width: 97.5%; height: 2rpx; margin-top: 15rpx; margin-bottom: 15rpx; background-color:#655A8980 ;">

				</view>
				<view class="flex-lr" style="width: 100%; padding: 10rpx 30rpx;">
					<view class="flex-l" style="font-size: 28rpx; font-weight: 400;">
						{{$t('index._TEXT85')}}
					</view>
					<view style="width: 82rpx;"></view>
					<view class="flex-r" style="width: 65%;">
						<input style="width: 100%; color: #FFFFFF;"
							placeholder-style="font-size: 28rpx;color: #FFFFFF80;font-family: 'Open Sans';font-weight: 400;"
							type="text" v-model="address" :placeholder="$t('index._TEXT86')" />
					</view>
				</view>
				<view
					style="margin-left: 10rpx; width: 97.5%; height: 2rpx; margin-top: 15rpx; margin-bottom: 15rpx; background-color:#655A8980 ;">

				</view>
				<view class="flex-lr" style="width: 100%; padding: 10rpx 30rpx;">
					<view class="flex-l" style="font-size: 28rpx; font-weight: 400;">
						{{$t('index._TEXT87')}}
					</view>
					<view style="width: 82rpx;"></view>
					<view class="flex-r" style="width: 65%;">
						<input style="width: 100%; color: #FFFFFF;"
							placeholder-style="font-size: 28rpx;color: #FFFFFF80;font-family: 'Open Sans';font-weight: 400;"
							type="text" v-model="detilAddress" :placeholder="$t('index._TEXT88')" />
					</view>
				</view>
				<!-- <view style="margin-left: 10rpx; width: 97.5%; height: 2rpx; margin-top: 15rpx; margin-bottom: 15rpx; background-color:#655A89 ;">
				
				</view> -->

			</view>
		</view>
		<view
			style="margin-top: 30rpx; width: 100%; height: 95rpx; background: url('../static/index/bg6.png') no-repeat; background-size: 100% 100%;">
			<view class="flex-lr" style="width: 100%; height: 80rpx; padding:0rpx 40rpx;">
				<view style="font-size: 28rpx; font-weight: 400;">
					{{$t('index._TEXT89')}}
				</view>
				<view class="flex-r">
					<switch color="#C889FF" :checked="isChecked" @change="switchChange"
						style="transform: scale(0.8);" />
				</view>
			</view>

		</view>


		<view class="flex-center" style="width: 100%;">
			<view @click="submit" class="flex-center"
				style="font-size: 28rpx; font-weight: 500; width: 80%; height: 96rpx; background-color: #C889FF; border-radius: 32rpx; position: absolute; bottom: 40rpx;  width: 90%; z-index: 1;">
				{{update?$t('index._TEXT90'):$t('index._TEXT91')}}
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
	import MyGrid from '@/components/grid-view.vue'
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
				isChecked: true,
				name: null,
				phoneNumber: null,
				address: null,
				detilAddress: null,
				update: false,
				addressId: null,
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
				const backData = uni.getStorageSync('addressData');
				console.log("backData" + backData)
				// 2. 判断是否有数据
				if (backData) {
					this.name = backData.fieldName;
					this.phoneNumber = backData.fieldPhone;
					this.address = backData.fieldRegion;
					this.detilAddress = backData.fieldDetail;
					this.addressId = backData.id;
					this.isChecked = backData.isDefault == 1 ? true : false;
					this.update = true;
					uni.removeStorageSync('addressData');
				}
			},
			truncateToFixed(num, fixed) {
				const factor = Math.pow(10, fixed);
				return Math.trunc(num * factor) / factor;
			},
			switchChange(e) {
				// e.detail.value 为 true 或 false
				this.isChecked = e.detail.value;
				console.log('当前状态：', this.isChecked);
			},
			// getDepositRecords() {
			// 	return this.$Request.get('app/getBuyNodeList', {
			// 	}).then((res) => {
			// 		if (res.code == 200) {
			// 			this.depositRecords = res.data;
			// 		}

			// 	});
			// },



			submit() {
				
				if (!this.name) return this.$Common.showToast($t('index._TEXT92'));
				if (!this.phoneNumber) return this.$Common.showToast($t('index._TEXT93'));
				const reg = /^1[3-9]\d{9}$/;
				if (!reg.test(this.phoneNumber)) {
					return this.$Common.showToast($t('index._TEXT94'));
				}
				if (!this.address) return this.$Common.showToast($t('index._TEXT95'));
				if (!this.detilAddress) return this.$Common.showToast($t('index._TEXT96'));

				if (this.update) {
					this.$Request.post('app/shop/address/update', {
						id: this.addressId,
						fieldName: this.name,
						fieldPhone: this.phoneNumber,
						fieldRegion: this.address,
						fieldDetail: this.detilAddress,
						isDefault: this.isChecked ? 1 : 0,
					}).then((val) => {
						this.loading = false;
						if (val.code == 200) {
							this.$Common.showToast(this.$t('index._TEXT97'));
							this.num = '';
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1000)
						}
					});
				} else {
					this.$Request.post('app/shop/address/add', {
						fieldName: this.name,
						fieldPhone: this.phoneNumber,
						fieldRegion: this.address,
						fieldDetail: this.detilAddress,
						isDefault: this.isChecked ? 1 : 0,
					}).then((val) => {
						this.loading = false;
						if (val.code == 200) {
							this.$Common.showToast(this.$t('index._TEXT97'));
							this.num = '';
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1000)
						}
					});
				}
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
					query: params,
				})
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