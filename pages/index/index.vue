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
						{{$t('index._TEXT103')}}
					</view>
				</view>
				
			</view>
			<view @click="skipUrl('/storeOrder')" class="flex-center" style="position: absolute; right: 0; color: #BE74FF; font-size: 24rpx; font-family: 400;">
				{{$t('index._TEXT104')}} <image src="/static/index/arrow_right.png" style="width: 32rpx; height: 32rpx;"></image>
			</view>
			
		</view>

		<view style="position: relative; z-index: 1; margin-top: 30rpx;">

			<scroll-view
			  scroll-y="true"
			  style="width: 100%; height: 80vh; box-sizing: border-box; padding-bottom: 160rpx;"
			>
				<MyGrid :list="goodsList" :columns="2" gap="0rpx" @click="onGridClick">
					<template v-slot:default="{ item }">
						<view
							style="padding:20rpx 25rpx 0rpx 25rpx ; height: 390rpx; width: 340rpx; background: url('../static/index/bg1.png') no-repeat; background-size: 100% 100%; margin-bottom: 20rpx;">
							<image :src="item.goodsImg" style="width: 100%; height: 200rpx;"></image>
							<view class="flex-lr" style="width: 100%;">
								<view style="font-size: 24rpx; font-weight: 500; color: #BE74FF;">
									{{item.goodsName}}
								</view>
								<view style="font-size: 24rpx; font-weight: 800; color: #DFBBFF;">
									{{item.goodsPrice}} USDT
								</view>
							</view>
							
							<view class="flex-r" style="width: 100%;">
								
								<view style="padding: 0 10rpx; border-radius: 20rpx; background-color: #8229ff; font-size: 24rpx; font-weight: 800; color: #DFBBFF;">
									{{item.goodsAsset}} CNE
								</view>
							</view>
							<view @click="skipUrl('/placeOrder',item)" class="flex-center" style="margin-top: 8rpx; width: 100%; height: 70rpx; background: url('../static/index/btn.png') no-repeat; background-size: 100% 100%;">
								<view style="margin-top: -20rpx; font-size: 28rpx; font-weight: 600;">
									{{$t('index._TEXT105')}}
								</view>
							</view>
						</view>
					</template>
				</MyGrid>
				<view style="height: 50rpx;"></view>
			</scroll-view>
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
				goodsList:[],
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
								this.init()
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
					}
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
				if (uni.getStorageSync('accessToken')) {
					this.getGoodsList();
				}
			},
			getGoodsList() {
				return this.$Request.get('app/shop/goods/list', {}).then((res) => {
					if (res.code == 200) {
						this.goodsList = res.data;
					}
				});
			},
			truncateToFixed(num, fixed) {
				const factor = Math.pow(10, fixed);
				return Math.trunc(num * factor) / factor;
			},
			changeTab(index) {
				// 如果点击的是当前已经选中的，直接返回（可选）
				if (this.currentIndex === index) return;

				this.currentIndex = index;

				// 在这里处理你的业务逻辑，比如请求数据
				console.log('当前选中了:', index === 0 ? '左边' : '右边');
			},

			// getDepositRecords() {
			// 	return this.$Request.get('app/getBuyNodeList', {
			// 	}).then((res) => {
			// 		if (res.code == 200) {
			// 			this.depositRecords = res.data;
			// 		}

			// 	});
			// },

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
			    
			    // 【修改点 1】将 params 存入本地缓存
			    // 建议使用一个固定的 Key，或者为了防止冲突，可以结合页面 name 作为 Key
			    // 这里使用 'PAGE_JUMP_DATA' 作为示例 key
			    uni.setStorageSync('placeOrderData', params);
			
			    // 【修改点 2】跳转不再携带 query
			    this.$Router.push({
			        path: name
			        // query: params  <-- 这行删掉，数据走缓存了
			    });
			},
		},
		beforeDestroy() {
			clearInterval(this.timer); // 在组件销毁前清除定时器，防止内存泄漏
		}
	}
</script>

<style lang="less">
	.pages {

		.tab-btn {
			width: 164rpx;
			height: 65rpx;

			/* 关键点：在这里设置 size 和 repeat，不要在行内样式里被覆盖 */
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center;

			/* 可选：为了让切换更平滑，可以加个过渡 */
			transition: background-image 0.2s;
		}

		.page-container {
			padding: 30rpx;
		}

		.title {
			margin: 30rpx 0 20rpx;
			font-weight: bold;
		}

		/* --- 自定义样式 1 --- */
		.my-menu-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			padding: 20rpx 0;
			border-radius: 12rpx;
			/* 加个阴影好看点 */
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		}

		.menu-icon {
			width: 60rpx;
			height: 60rpx;
			margin-bottom: 10rpx;
		}

		.menu-text {
			font-size: 26rpx;
			color: #333;
		}

		/* --- 自定义样式 2 --- */
		.small-tag {
			background-color: #e8f4ff;
			color: #007aff;
			text-align: center;
			padding: 10rpx;
			border-radius: 8rpx;
			font-size: 24rpx;
		}

		.inp-wrap {
			width: 100%;
			min-height: 80rpx;
			background-color: #38353cff;
			font-size: 28rpx;
			font-weight: 400;
			margin-bottom: 0;
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