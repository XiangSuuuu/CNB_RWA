<template>
	<view class="pages">
		<view class="flex-center" style="width: 100%; position: relative; z-index: 1;">
			<view class="flex-center" style="width: 100%; height: 53rpx;">
				<view class="flex-center"
					style="height:60rpx; width: 164rpx; background: url('../static/trading_hall/selected.png') no-repeat; background-size: 100% 100%;">
					<view style="margin-top: -15rpx;">
							购买记录
					</view>
				</view>
			</view>
		</view>
		<view class="shop-wrap">
			<view class="shop-item" v-for="(item, index) in lists" :key="index">
				<view class="head-text flex-l">
					<image src="/static/trading_hall/icon0.png" mode="widthFix" class="head-icon"></image>
					{{gainUsername(item.addr)}}
				</view>
				<view class="flex-lr lists">
					<view style="color: #FFFFFF; font-weight: 400; font-family: 'Open Sans'; font-size: 24rpx;" class="flex-l">
						{{$t('index._TEXT148')}}
						<view class="num">{{Number((Number(item.price)/unitNum).toFixed(6))}}</view>
						USDT
					</view>
					<view class="flex-r" style=" color: #FFFFFF; font-weight: 400; font-family: 'Open Sans'; font-size: 24rpx;">
						<view>{{$t('index._TEXT152')}}</view>
						<view class="flex-r">
							<view class="title-num">{{(Number(item.amount)/unitNum).toFixed(0)}}</view>
							<image src="/static/trade/coin.png" mode="widthFix" class="coins"></image>
						</view>
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #655A8980;"></view>
				<view class="flex-lr lists">
					<view style="color: #FFFFFF; font-weight: 400; font-family: 'Open Sans'; font-size: 24rpx;">{{$t('index._TEXT149')}}：{{gainUsername(item.wallet)}}</view>
					<view class="flex-r">
						<view style="color: #FFFFFF; font-weight: 400; font-family: 'Open Sans'; font-size: 24rpx;">{{$t('index._TEXT150')}}：</view>
						<view class="flex-r">
							<view class="title-num">{{(Number(item.limit)/unitNum).toFixed(0)}}</view>
						</view>
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #655A8980;"></view>
				
			</view>
		</view>
		<!-- <None v-if="lists && lists.length == 0"></None> -->
	</view>
</template>

<script>
	import None from '@/components/none.vue';
	import ReturnPage from '@/components/returnPage.vue';
	import {mapGetters, mapMutations, mapState, mapActions} from 'vuex';
	export default {
		components: {
			None,
			ReturnPage
		},
		data() {
			return {
				loading: false,
				lists: [],
				unitNum: 10**18,
			}
		},
		watch: {
		},
		computed: {
			...mapState(['myAddress', 'myRelation', 'tokenData', 'signature', 'userData', 'totalContract']),
			isLogin () {
				if (this.$store.state.tokenData && this.$store.state.tokenData.token) {
					return true;
				} else {
					return false;
				}
			},
		},
		mounted(){
			this.init();
		},
		methods: {
			init() {
				try{
					this.$c2ctcc.getUserFinishOrder(this.myAddress).then((res) => {
						if (res) {
							this.lists = res;
							console.log(res)
						} 
					});
				}catch(e){
					setTimeout(() => {
						this.init();
					}, 1500)
					//TODO handle the exception
				}
			},
			
			gainUsername (address) {
				let name = '';
				if (!!address) {
					name = address.substr(0, 4) + '******' +address.substring(address.length-4)
				}
				return name;
			},
			
			formattedDate(timestamp) {
			  return new Date(timestamp).toLocaleString(); // 转换为本地时间字符串
			},
			
			//取消
			async cancelSellOrder (item) {
				console.log(Number(item[0]))
				this.$c2ctcc.cancelSell(Number(item[0])).then((val) => {
					console.log(val)
					if (val) {
						this.$Request.post('app/cancelSellOrder',{
							contractId: Number(item[0])
						}).then((val) => {
							if (val.code == 200) {
								this.$Common.showToast(this.$t('index._TEXT180'));
								setTimeout(() => {
									this.init();
								}, 8000)
							}
						});
					}
				});
			},
			// async cancelBuyOrder (item) {
			// 	console.log(Number(item[0]))
			// 	this.$buymarkettcc.cancelSell(Number(item[0])).then((val) => {
			// 		console.log(val)
			// 		if (val) {
			// 			this.$Request.post('app/purchaseUpdate',{
			// 				contractId: Number(item[0]),
			// 				type:3
			// 			}).then((val) => {
			// 				if (val.code == 200) {
			// 					this.$Common.showToast(this.$t('index._TEXT78'));
			// 					setTimeout(() => {
			// 						this.init();
			// 					}, 8000)
			// 				}
			// 			});
			// 		}
			// 	});
			// },
			skipUrl(name, params){
				this.$Router.push({
					path: name,
					query: params
				})
			},
		},
	}
</script>

<style lang="less">
	.pages {
		.highlight-text {
		  position: relative;
		  font-size: 24rpx;
		  font-weight: 400;
		  color: #333333;
		  font-family: 'Microsoft YaHei';
		  display: inline-block;
		}
		
		.highlight-text::after {
		  content: '';
		  position: absolute;
		  left: 0;
		  bottom: 0.1em; /* 距离文字底部的高度 */
		  width: 100%;
		  height: 0.4em;  /* 黄色条高度 */
		  background-color: #C07AFF; /* 黄色 */
		  z-index: -1; /* 在文字下方 */
		}
		
		.bind-content-wraps {
			width: 500rpx;
			border-radius: 64rpx;
			background: linear-gradient(45deg, #35FFAB, #0095E4);
			box-sizing: border-box;
			padding: 2rpx;
			position: relative;
			margin: 42rpx auto;
			.bind-content {
				width: 100%;
				height: 116rpx;
				background-color: #1E3D43;
				border-radius: 64rpx;
				box-sizing: border-box;
				color: #FFFFFF;
				font-size: 36rpx;
				font-weight: bold;
			}
		}
		.shop-wrap {
			width: 100%;
			.shop-item {
				width: 100%;
				padding: 36rpx 36rpx;
				box-sizing: border-box;
				margin: 15rpx 0;
				background: linear-gradient(0deg, #2c2136, #1c1c1c);
				// box-shadow: 0 0 8rpx 0 rgba(11, 253, 169, 0.3);
				// background-color: #F7F7F5;
				border-radius: 20rpx;
				.head-text {
					color: #FFFFFF;
					font-size: 28rpx;
					font-weight: 700;
					margin-bottom: 8rpx;
					font-family: 'Open Sans';
					.head-icon {
						width: 48rpx;
						height: 48rpx;
						margin-right: 12rpx;
					}
				}
				.lists {
					width: 100%;
					height: 98rpx;
					border-bottom: 2rpx solid rgba(101, 90, 137, 0.5);
					color: rgba(255, 255, 255, 0.8);
					font-size: 28rpx;
					.num{
						color: #C07AFF;
						font-size: 32rpx;
						font-weight: 700;
						margin-right: 10rpx;
						margin-left: 15rpx;
						font-family: 'Open Sans';
					}
					.coins {
						width: 46rpx;
						height: 46rpx;
					}
					.title-num {
						color: #C07AFF;
						font-size: 32rpx;
						font-weight: 700;
						// margin-right: 28rpx;
						font-family: 'Open Sans';
						// margin-right: 10rpx;
						margin-left: 15rpx;
					}
				}
			}
		}
	}
</style>
