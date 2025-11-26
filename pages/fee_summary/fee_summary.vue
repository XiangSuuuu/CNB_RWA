<template>
	<view class="pages">
		<view class="head-wrap flex-center">
			<view class="title">
				国库
			</view>
			<image src="/static/public/arrow-left-white.png" @click="returnPage()" mode="widthFix" class="back_img">
			</image>
		</view>
		<view class="panel-border flex-center">

			<view class="panel">
				<view
					style="padding: 40rpx; width: 100%; height: 100%; background: url('../static/public/bg.png') no-repeat;background-size: 100% auto;">
					<view class=" flex-lr" style="margin-top: 40rpx;">
						<view
							style="padding: 30rpx;  width: 246rpx; height: 166rpx; background: url('../static/public/bg1.png') no-repeat;background-size: 100% auto;">
							<view class="flex-center" style="font-size: 24rpx; font-weight: 400; color:#FFFFFFCC ;">
								国库
							</view>
							<view style="height: 26rpx;"></view>
							<view class="flex-center" style="font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
								1,000,000,000
							</view>
						</view>
						<view
							style="padding: 30rpx; width: 246rpx; height: 166rpx; background: url('../static/public/bg1.png') no-repeat;background-size: 100% auto;">
							<view class="flex-center" style="font-size: 24rpx; font-weight: 400; color:#FFFFFFCC ;">
								卖税
							</view>
							<view style="height: 26rpx;"></view>
							<view class="flex-center" style="font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
								50,000
							</view>
						</view>
					</view>
					<view class=" flex-lr" style="margin-top: 40rpx;">
						<view
							style="padding: 30rpx; width: 246rpx; height: 166rpx; background: url('../static/public/bg1.png') no-repeat;background-size: 100% auto;">
							<view class="flex-center" style="font-size: 24rpx; font-weight: 400; color:#FFFFFFCC ;">
								提现手续费
							</view>
							<view style="height: 26rpx;"></view>
							<view class="flex-center" style="font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
								1,000
							</view>
						</view>
						<view
							style="padding: 30rpx; width: 246rpx; height: 166rpx; background: url('../static/public/bg1.png') no-repeat;background-size: 100% auto;">
							<view class="flex-center" style="font-size: 24rpx; font-weight: 400; color:#FFFFFFCC ;">
								买税
							</view>
							<view style="height: 26rpx;"></view>
							<view class="flex-center" style="font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
								1,000,000
							</view>
						</view>
					</view>
					<view class=" flex-lr" style="margin-top: 40rpx;">

						<view
							style="padding: 30rpx; width: 246rpx; height: 166rpx; background: url('../static/public/bg1.png') no-repeat;background-size: 100% auto;">
							<view class="flex-center" style="font-size: 24rpx; font-weight: 400; color:#FFFFFFCC ;">
								回购销毁
							</view>
							<view style="height: 26rpx;"></view>
							<view class="flex-center" style="font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
								10,000
							</view>
						</view>
					</view>
				</view>
			</view>
			<image src="/static/public/power.png" style="width: 88rpx; height: 88rpx; position: absolute; top: -22rpx;">
			</image>
		</view>
		<view class="flex-l" style="margin-top: 20rpx;">
			<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
			<view style="width: 8rpx;"></view>
			<view style="font-size: 24rpx; font-weight: 400; color: white;">
				关于国库：
			</view>
		</view>
		<view style="font-family: PingFang SC;
font-weight: 400;
font-style: Regular;
font-size: 12px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
color: #FFFFFFCC;
margin-top: 20rpx;
">
			国库资金100%用于二级市场回购VBO并进行销毁，数据开源链上可查询。
		</view>

		<view class="flex-l" style="margin-top: 30rpx;">
			<image src="/static/fee/Icon.png" style="width: 48rpx; height: 48rpx;"></image>
			<view style="width: 20rpx;"></view>
			<view style="font-family: PingFang SC;
font-weight: 400;
font-style: Regular;
font-size: 12px;
leading-trim: NONE;
line-height: 100%;
letter-spacing: 0%;
color: #FFFFFFCC;
">矿机资金100%进入国库。</view>
		</view>
		<view class="flex-l">
			<image src="/static/fee/Vector 102.png" style="margin-left: 24rpx; width: 2rpx; height: 35rpx;"></image>
		</view>
		<view class="flex-l">
			<image src="/static/fee/Icon-1.png" style="width: 48rpx; height: 48rpx;"></image>
			<view style="width: 20rpx;"></view>
			<view style="font-family: PingFang SC;
		font-weight: 400;
		font-style: Regular;
		font-size: 12px;
		leading-trim: NONE;
		line-height: 100%;
		letter-spacing: 0%;
		color: #FFFFFFCC;
		">理财收益提现的20%进入国库。</view>
		</view>
		<view class="flex-l">
			<image src="/static/fee/Vector 102.png" style="margin-left: 24rpx; width: 2rpx; height: 35rpx;"></image>
		</view>
		<view class="flex-l">
			<image src="/static/fee/Icon-2.png" style="width: 48rpx; height: 48rpx;"></image>
			<view style="width: 20rpx;"></view>
			<view style="font-family: PingFang SC;
				font-weight: 400;
				font-style: Regular;
				font-size: 12px;
				leading-trim: NONE;
				line-height: 100%;
				letter-spacing: 0%;
				color: #FFFFFFCC;
				">卖税3%的20%进入国库。</view>
		</view>
		<view class="flex-l">
			<image src="/static/fee/Vector 102.png" style="margin-left: 24rpx; width: 2rpx; height: 35rpx;"></image>
		</view>
		<view class="flex-l">
			<image src="/static/fee/Icon-3.png" style="width: 48rpx; height: 48rpx;"></image>
			<view style="width: 20rpx;"></view>
			<view style="font-family: PingFang SC;
						font-weight: 400;
						font-style: Regular;
						font-size: 12px;
						leading-trim: NONE;
						line-height: 100%;
						letter-spacing: 0%;
						color: #FFFFFFCC;
						">提现5% (VE币) 的20%进入国库。</view>
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
	import CollapseBox from "@/pages/agreement_order/components/CollapseBox.vue";
	import {
		uniGrid,
		uniGridItem
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			Model,
			CollapseBox
		},
		data() {
			return {
				loading: false,
				unitNum: 10 ** 18,
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
								this.getConfigs();
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
	.pages {
		.head-wrap {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			padding: 0 40rpx;
			height: 120rpx;
			// background: #171717;
			box-sizing: border-box;
			z-index: 100;

			.title {
				font-family: 'PingFang SC';
				font-size: 30rpx;
				font-weight: 500;
				color: white;
			}

			.back_img {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				left: 0;
				margin-left: 24rpx;
			}

		}

		/* 外层面板 */
		.panel {
			// margin-top: 180rpx;
			width: 100%;
			max-width: 680rpx;
			height: 842rpx;
			border-radius: 24rpx;
			padding: 32rpx;
			background: linear-gradient(135deg, #291f1b, #010102, transparent);
			// border: 2rpx solid rgba(160, 121, 53, 0.3);
			// box-shadow: 0 0 24rpx rgba(255, 200, 100, 0.15);
			box-sizing: border-box;
		}

		.panel-border {
			position: relative;
			margin-top: 180rpx;
			padding: 4rpx;
			/* 控制边框厚度 */
			border-radius: 28rpx;
			background: linear-gradient(135deg, #605a56, #292931, transparent);
			// box-shadow: 0 0 24rpx rgba(255, 200, 100, 0.2);
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